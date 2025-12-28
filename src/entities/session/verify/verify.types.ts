export type VerifyState = {
	accessToken?: string;
	tgToken?: string;

	setTgToken: (token?: string) => void;
	setAccessToken: (token?: string) => void;
	hydrateFromStorage: () => void;
	clear: () => void;
};
