import {
    setDebug,
    themeParams,
    initData,
    viewport,
    init as initSDK,
    mockTelegramEnv,
    type ThemeParams,
    retrieveLaunchParams,
    emitEvent,
    miniApp,
    backButton,
} from "@tma.js/sdk-react";

/**
 * Initializes the application and configures its dependencies.
 */
export async function init(options: { debug: boolean; eruda: boolean; mockForMacOS: boolean }): Promise<void> {
    // Set @telegram-apps/sdk-react debug mode and initialize it.
    setDebug(options.debug);
    initSDK();

    // Add Eruda if needed.
    if (options.eruda) {
        import("eruda").then(({ default: eruda }) => {
            eruda.init();
            eruda.position({ x: window.innerWidth - 50, y: 0 });
        });
    }

    // Telegram for macOS has a ton of bugs, including cases, when the client doesn't
    // even response to the "web_app_request_theme" method. It also generates an incorrect
    // event for the "web_app_request_safe_area" method.
    if (options.mockForMacOS) {
        let firstThemeSent = false;
        mockTelegramEnv({
            onEvent(event, next) {
                if (event.name === "web_app_request_theme") {
                    const tp = themeParams.state() as unknown as ThemeParams;
                    if (!firstThemeSent) {
                        firstThemeSent = true;
                        const launchTp = retrieveLaunchParams().tgWebAppThemeParams;
                        if (launchTp) {
                            // Convert snake_case launch params to camelCase ThemeParams
                            const converted: Record<string, unknown> = {};
                            for (const k of Object.keys(launchTp)) {
                                const v = (launchTp as Record<string, unknown>)[k];
                                const camel = k.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
                                converted[camel] = v;
                            }
                            Object.assign(tp as unknown as Record<string, unknown>, converted);
                        }
                    }
                    // Normalize ThemeParams to the snake_case shape expected by the bridge events
                    const tpRecord: Record<string, `#${string}` | undefined> = {};
                    const raw = tp as unknown as Record<string, unknown>;
                    for (const k of Object.keys(raw)) {
                        const v = raw[k];
                        const snake = k.replace(/([A-Z])/g, "_$1").toLowerCase();
                        tpRecord[snake] = typeof v === "string" ? (v as `#${string}`) : undefined;
                    }
                    return emitEvent("theme_changed", { theme_params: tpRecord });
                }

                if (event.name === "web_app_request_safe_area") {
                    return emitEvent("safe_area_changed", { left: 0, top: 0, right: 0, bottom: 0 });
                }

                next();
            },
        });
    }

    // Mount all components used in the project.
    backButton.mount.ifAvailable();
    initData.restore();

    if (miniApp.mount.isAvailable()) {
        themeParams.mount();
        miniApp.mount();
        themeParams.bindCssVars();
    }

    if (viewport.mount.isAvailable()) {
        viewport.mount().then(() => {
            viewport.bindCssVars();
        });
    }
}
