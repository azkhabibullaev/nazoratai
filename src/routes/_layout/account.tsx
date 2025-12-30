import {
	ArrowRight01Icon,
	BlockGameIcon,
	CheckmarkBadge01Icon,
	CustomerService01Icon,
	Delete02Icon,
	DocumentAttachmentIcon,
	Download02Icon,
	EditUser02Icon,
	Globe02Icon,
	GoogleDocIcon,
	KnightShieldIcon,
	Notification01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute } from "@tanstack/react-router";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemGroup,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from "@/shared/components/ui/item";

export const Route = createFileRoute("/_layout/account")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="pt-4">
			<Card className="pt-4 pb-2 mb-4">
				<CardHeader>
					<div className="flex flex-col items-center justify-center">
						<Avatar size="xlg">
							<AvatarImage
								alt="Avatar"
								src="https://github.com/shadcn.png"
							/>
							<AvatarFallback>USR</AvatarFallback>
						</Avatar>
						<div className="text-center">
							<div className="font-medium text-xl">Azamat</div>
							<div className="text-sm">
								Срок действия вашей подписки Hisobchi AI
								истекает 30 декабря 2025 года
							</div>
						</div>
					</div>
				</CardHeader>
				<CardContent className="px-0">
					<ItemGroup className="gap-0">
						<ItemSeparator />
						<Item className="py-1">
							<ItemMedia>
								<HugeiconsIcon
									icon={CheckmarkBadge01Icon}
									className="size-5"
								/>
							</ItemMedia>
							<ItemContent>
								<ItemTitle>
									Obuna holati:{" "}
									<span className="text-muted-foreground">
										10 kun qoldi
									</span>
								</ItemTitle>
							</ItemContent>
							<ItemActions>
								<HugeiconsIcon
									icon={ArrowRight01Icon}
									className="size-4"
								/>
							</ItemActions>
						</Item>
						<ItemSeparator />
						<Item className="py-1">
							<ItemMedia>
								<HugeiconsIcon
									icon={EditUser02Icon}
									className="size-5"
								/>
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Profilni tahrirlash</ItemTitle>
							</ItemContent>
							<ItemActions>
								<HugeiconsIcon
									icon={ArrowRight01Icon}
									className="size-4"
								/>
							</ItemActions>
						</Item>
					</ItemGroup>
				</CardContent>
			</Card>

			<Card className="py-2 mb-4">
				<CardContent className="px-0">
					<ItemGroup className="gap-0">
						<Item className="py-1">
							<ItemMedia>
								<HugeiconsIcon
									icon={BlockGameIcon}
									className="size-5"
								/>
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Kategoriyalar</ItemTitle>
							</ItemContent>
							<ItemActions>
								<HugeiconsIcon
									icon={ArrowRight01Icon}
									className="size-4"
								/>
							</ItemActions>
						</Item>
						<ItemSeparator />
						<Item className="py-1">
							<ItemMedia>
								<HugeiconsIcon
									icon={Notification01Icon}
									className="size-5"
								/>
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Bildirishnomalar</ItemTitle>
							</ItemContent>
							<ItemActions>
								<HugeiconsIcon
									icon={ArrowRight01Icon}
									className="size-4"
								/>
							</ItemActions>
						</Item>
					</ItemGroup>
				</CardContent>
			</Card>

			<Card className="py-2 mb-4">
				<CardContent className="px-0">
					<Item className="py-1">
						<ItemMedia>
							<HugeiconsIcon
								icon={Download02Icon}
								className="size-5"
							/>
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Hisobotni yuklab olish</ItemTitle>
						</ItemContent>
						<ItemActions>
							<HugeiconsIcon
								icon={ArrowRight01Icon}
								className="size-4"
							/>
						</ItemActions>
					</Item>
					<ItemSeparator />
					<Item className="py-1">
						<ItemMedia>
							<HugeiconsIcon
								icon={Delete02Icon}
								className="size-5"
							/>
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Ma'lumotlarni tozalash</ItemTitle>
						</ItemContent>
						<ItemActions>
							<HugeiconsIcon
								icon={ArrowRight01Icon}
								className="size-4"
							/>
						</ItemActions>
					</Item>
				</CardContent>
			</Card>

			<Card className="py-2 mb-4">
				<CardContent className="px-0">
					<Item className="py-1">
						<ItemMedia>
							<HugeiconsIcon
								icon={DocumentAttachmentIcon}
								className="size-5"
							/>
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Foydalanish yo'riqnomasi</ItemTitle>
						</ItemContent>
						<ItemActions>
							<HugeiconsIcon
								icon={ArrowRight01Icon}
								className="size-4"
							/>
						</ItemActions>
					</Item>
					<ItemSeparator />
					<Item className="py-1">
						<ItemMedia>
							<HugeiconsIcon
								icon={Globe02Icon}
								className="size-5"
							/>
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Tilni o'zgartirish</ItemTitle>
						</ItemContent>
						<ItemActions>
							<HugeiconsIcon
								icon={ArrowRight01Icon}
								className="size-4"
							/>
						</ItemActions>
					</Item>
				</CardContent>
			</Card>

			<Card className="py-2">
				<CardContent className="px-0">
					<Item className="py-1">
						<ItemMedia>
							<HugeiconsIcon
								icon={CustomerService01Icon}
								className="size-5"
							/>
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Qo'llab-quvatlash</ItemTitle>
						</ItemContent>
						<ItemActions>
							<HugeiconsIcon
								icon={ArrowRight01Icon}
								className="size-4"
							/>
						</ItemActions>
					</Item>
					<ItemSeparator />
					<Item className="py-1">
						<ItemMedia>
							<HugeiconsIcon
								icon={GoogleDocIcon}
								className="size-5"
							/>
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Bizning shartlar</ItemTitle>
						</ItemContent>
						<ItemActions>
							<HugeiconsIcon
								icon={ArrowRight01Icon}
								className="size-4"
							/>
						</ItemActions>
					</Item>
					<ItemSeparator />
					<Item className="py-1">
						<ItemMedia>
							<HugeiconsIcon
								icon={KnightShieldIcon}
								className="size-5"
							/>
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Maxfiylik siyosati</ItemTitle>
						</ItemContent>
						<ItemActions>
							<HugeiconsIcon
								icon={ArrowRight01Icon}
								className="size-4"
							/>
						</ItemActions>
					</Item>
				</CardContent>
			</Card>
		</div>
	);
}
