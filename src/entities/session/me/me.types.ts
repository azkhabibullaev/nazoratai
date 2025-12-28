export type MeData = {
	chatId: number;
	telegramId: number;
	phone: string;
	fullName: string;
	language: "UZ" | "RU" | "EN";
};

export type MeResponse = {
	data: MeData;
};

export type MeState = {
	me?: MeData;
	setMe: (res?: MeResponse) => void;
};
