import { createFileRoute } from "@tanstack/react-router";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from "@/shared/components/ui/item";

export const Route = createFileRoute("/_layout/history")({
	component: RouteComponent,
});

const data = [
	{
		id: 1,
		data: "20-20-2025",
		amount: "-287 188.00 so'm",
		history: [
			{
				id: "0",
				logo: "UKLON",
				name: "Uklon",
				category: "Taxi",
				amount: "-50000",
				time: "18:00",
				type: "expense",
			},
			{
				id: "0",
				logo: "UKLON2",
				name: "Uklon2",
				category: "Taxi",
				amount: "-52000",
				time: "22:00",
				type: "expense",
			},
			{
				id: "0",
				logo: "UKLON2",
				name: "Uklon2",
				category: "Taxi",
				amount: "-52000",
				time: "22:00",
				type: "expense",
			},
			{
				id: "0",
				logo: "UKLON2",
				name: "Uklon2",
				category: "Taxi",
				amount: "-52000",
				time: "22:00",
				type: "expense",
			},
			{
				id: "0",
				logo: "UKLON2",
				name: "Uklon2",
				category: "Taxi",
				amount: "-52000",
				time: "22:00",
				type: "expense",
			},
		],
	},
	{
		id: 2,
		data: "20-20-2025",
		amount: "-587 188.00 so'm",
		history: [
			{
				id: "1",
				logo: "YNDX",
				name: "Yandex",
				category: "Taxi",
				amount: "-15000",
				time: "19:02",
				type: "expense",
			},
			{
				id: "1",
				logo: "YNDX",
				name: "Yandex",
				category: "Taxi",
				amount: "-15000",
				time: "19:02",
				type: "expense",
			},
			{
				id: "1",
				logo: "YNDX",
				name: "Yandex",
				category: "Taxi",
				amount: "-15000",
				time: "19:02",
				type: "expense",
			},
			{
				id: "1",
				logo: "YNDX",
				name: "Yandex",
				category: "Taxi",
				amount: "-15000",
				time: "19:02",
				type: "expense",
			},
		],
	},
	{
		id: 2,
		data: "20-20-2025",
		amount: "-587 188.00 so'm",
		history: [
			{
				id: "1",
				logo: "YNDX",
				name: "Yandex",
				category: "Taxi",
				amount: "-15000",
				time: "19:02",
				type: "expense",
			},
			{
				id: "1",
				logo: "YNDX",
				name: "Yandex",
				category: "Taxi",
				amount: "-15000",
				time: "19:02",
				type: "expense",
			},
			{
				id: "1",
				logo: "YNDX",
				name: "Yandex",
				category: "Taxi",
				amount: "-15000",
				time: "19:02",
				type: "expense",
			},
			{
				id: "1",
				logo: "YNDX",
				name: "Yandex",
				category: "Taxi",
				amount: "-15000",
				time: "19:02",
				type: "expense",
			},
		],
	},
];

function RouteComponent() {
	return (
		<div className="-mx-4">
			<div className="text-center mb-4">Kirim-chiqim</div>
			<div>
				{data.map((item) => (
					<div className="" key={item.id}>
						<div className="flex items-center justify-between text-sm py-1 px-4 bg-gray-300 dark:bg-gray-700 rounded-2xl">
							<div className="">{item.data}</div>
							<div className="">{item.amount}</div>
						</div>
						{item.history.map((h) => (
							<ItemGroup className="gap-0" key={h.id}>
								<Item className="py-2">
									<ItemMedia>
										<Avatar size="lg">
											<AvatarImage
												alt="Avatar"
												src="https://github.com/shadcn.pngg"
											/>
											<AvatarFallback>X</AvatarFallback>
										</Avatar>
									</ItemMedia>
									<ItemContent>
										<ItemTitle>{h.name}</ItemTitle>
										<ItemDescription>
											{h.category}
										</ItemDescription>
									</ItemContent>
									<ItemActions>
										<div className="flex flex-col items-end">
											<span>{h.amount}</span>
											<span>{h.time}</span>
										</div>
									</ItemActions>
								</Item>
								<ItemSeparator />
							</ItemGroup>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
