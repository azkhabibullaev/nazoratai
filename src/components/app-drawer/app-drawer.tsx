import {
	ArrowRight01Icon,
	DocumentAttachmentIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/shared/components/ui/drawer";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/shared/components/ui/item";
import { useDrawerStore } from "@/shared/stores/global";

export function AppDrawer() {
	const isOpen = useDrawerStore((s) => s.isOpen);
	const close = useDrawerStore((s) => s.close);

	return (
		<Drawer open={isOpen} onClose={close}>
			<DrawerContent className="lg:max-w-3xl lg:mx-auto">
				<DrawerHeader>
					<DrawerTitle>Yangi ma'lumot qo'shish</DrawerTitle>
					<DrawerDescription>
						Bu yerda yangi karta va kirim chiqim qo'shish mumkin.
					</DrawerDescription>
				</DrawerHeader>
				<div className="flex w-full flex-col gap-4 lg:max-w-3xl lg:mx-auto">
					<Item variant="outline">
						<ItemMedia variant="icon">
							<HugeiconsIcon icon={DocumentAttachmentIcon} />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Yangi karta qo'shish</ItemTitle>
							<ItemDescription>
								Bank kartasini qo'shing va balansni boshqaring.
							</ItemDescription>
						</ItemContent>
						<ItemActions>
							<HugeiconsIcon icon={ArrowRight01Icon} />
						</ItemActions>
					</Item>
					<Item variant="outline">
						<ItemMedia variant="icon">
							<HugeiconsIcon icon={DocumentAttachmentIcon} />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Tranzaksiya qo'shish</ItemTitle>
							<ItemDescription>
								Xarajat, Daromad, Transfer.
							</ItemDescription>
						</ItemContent>
						<ItemActions>
							<HugeiconsIcon icon={ArrowRight01Icon} />
						</ItemActions>
					</Item>
					<Item variant="outline">
						<ItemMedia variant="icon">
							<HugeiconsIcon icon={DocumentAttachmentIcon} />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Qarz qo'shish</ItemTitle>
							<ItemDescription>
								Berilgan yoki olingan qarzni qayd eting va
								muddatini kuzating.
							</ItemDescription>
						</ItemContent>
						<ItemActions>
							<HugeiconsIcon icon={ArrowRight01Icon} />
						</ItemActions>
					</Item>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
