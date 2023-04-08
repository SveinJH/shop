import { ListItem } from "@/components/list-item";
import { SellActions } from "@/components/sell-actions";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/utils/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getUser(id: string) {
    const user = await db.user.findUnique({
        where: { id },
    });

    if (!user) return null;

    return user;
}

async function getDrink(id: string) {
    const drink = await db.drink.findUnique({
        where: { id },
    });

    if (!drink) return null;

    return drink;
}

export default async function DrinkSalesPage({
    params,
    searchParams,
}: {
    params: { drinkId: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/logg-inn");
    }

    const role = session?.user.role;

    if (role !== "bartender" && role !== "admin") {
        redirect("/hjem");
    }

    const userId = searchParams["id"];

    if (!userId || typeof userId !== "string") {
        redirect("/hjem");
    }

    const user = await getUser(userId);
    const drink = await getDrink(params.drinkId);

    if (!user || !drink) return <div>Noe gikk galt.</div>;

    return (
        <div className="m-4 text-center">
            <h2>
                Bekreft salg av {drink.name} for{" "}
                {drink.happyHour ? drink.price - 1 : drink.price} bonger
            </h2>
            <h4>til</h4>
            <h3 className="text-2xl">{user.name}</h3>
            <p className="text-sm my-4">
                {user.name} har {user.coupons} bonger
            </p>
            <SellActions userId={user.id} drinkId={drink.id} />
        </div>
    );
}
