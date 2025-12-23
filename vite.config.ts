import path from "node:path";
import { readFileSync } from "node:fs";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

const TARGET = "https://api.webhook.nazorat-ai.uz";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        basicSsl(),
        tanstackRouter({
            target: "react",
            autoCodeSplitting: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: true,
        https: {
            cert: readFileSync(path.resolve("tma.internal.pem")),
            key: readFileSync(path.resolve("tma.internal-key.pem")),
        },
        proxy: {
            "/api": {
                target: TARGET,
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
