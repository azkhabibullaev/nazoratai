import { createFileRoute } from "@tanstack/react-router";
import { CreditCardsCarousel } from "@/components/credit-cards";
import { Reports } from "@/components/reports/reports";

export const Route = createFileRoute("/_layout/")({
	component: RouteComponent,
});

export type CreditCardDTO = {
	id: string;
	holderName: string;
	numberMasked: string;
	expiry: string;
	cardType: "UZCARD" | "HUMO";
};

const cards: CreditCardDTO[] = [
	{
		id: "cc_0",
		holderName: "Jack Lewis",
		numberMasked: "1234********1121",
		expiry: "06/31",
		cardType: "UZCARD",
	},
	{
		id: "cc_1",
		holderName: "Jack Lewis",
		numberMasked: "1234********1121",
		expiry: "06/28",
		cardType: "HUMO",
	},
	{
		id: "cc_2",
		holderName: "Jack Lewis",
		numberMasked: "9911********6677",
		expiry: "11/27",
		cardType: "UZCARD",
	},
	{
		id: "cc_3",
		holderName: "Jack Lewis",
		numberMasked: "4000********3333",
		expiry: "01/29",
		cardType: "HUMO",
	},
	{
		id: "cc_4",
		holderName: "Jack Lewis",
		numberMasked: "5555********8888",
		expiry: "09/26",
		cardType: "UZCARD",
	},
];

function RouteComponent() {
	return (
		<div>
			<div className="mb-2">
				<CreditCardsCarousel cards={cards} />
			</div>
			<Reports />
		</div>
	);
}
