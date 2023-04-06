import Link from "next/link";
import {
    BuildingStorefrontIcon,
    CalendarIcon,
    ClockIcon,
    ListBulletIcon,
    PaperAirplaneIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/solid";

type NavigationItem = {
    href: string;
    Icon?: unknown;
    text: string;
};

const navigationItems: NavigationItem[] = [
    {
        text: "Oversikt",
        href: "/hjem/oversikt",
        Icon: <ListBulletIcon className="h-16" />,
    },
    {
        text: "Bar",
        href: "/hjem/bar",
        Icon: <BuildingStorefrontIcon className="h-16" />,
    },
    {
        text: "Hendelser",
        href: "/hjem/hendelser",
        Icon: <CalendarIcon className="h-16" />,
    },
    {
        text: "Historikk",
        href: "/hjem/historikk",
        Icon: <ClockIcon className="h-16" />,
    },
    {
        text: "Send",
        href: "/hjem/send",
        Icon: <PaperAirplaneIcon className="h-16" />,
    },
];

export default async function HomePage() {
    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                {navigationItems.map(navItem => {
                    return (
                        <Link
                            key={navItem.text}
                            href={navItem.href}
                            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center"
                        >
                            <div className="flex flex-col justify-center">
                                <>
                                    {navItem.Icon && navItem.Icon}
                                    <h5 className="mt-2 text-xl">
                                        {navItem.text}
                                    </h5>
                                </>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
