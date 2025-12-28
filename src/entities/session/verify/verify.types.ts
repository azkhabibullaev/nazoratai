export type VerifyState = {
	tgToken?: string;
	accessToken?: string;
	needsReauth: boolean;

	setTgToken: (token?: string) => void;
	setAccessToken: (token?: string) => void;
	setNeedsReauth: (v: boolean) => void;
	hydrateFromStorage: () => void;
	clear: () => void;
};
