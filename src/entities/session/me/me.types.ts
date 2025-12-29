export type MeResponse = {
	chatId: number;
	telegramId: number;
	phone: string;
	fullName: string;
	language: "UZ" | "RU" | "EN";
};

export type MeState = {
	me?: MeResponse;
	setMe: (res?: MeResponse) => void;
};
