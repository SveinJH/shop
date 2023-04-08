import { SaleButton } from "@/components/sale-button";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/utils/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getDrinks() {
    return await db.drink.findMany({
        select: {
            id: true,
            name: true,
            price: true,
        },
    });
}

async function getUser(id: string) {
    return await db.user.findUnique({ where: { id } });
}

export default async function SalesPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/logg-inn");
    }

    const role = session.user.role;

    if (role !== "bartender" && role !== "admin") {
        redirect("/hjem");
    }

    const userId = searchParams["id"];

    if (!userId || typeof userId !== "string") {
        redirect("/hjem");
    }

    const [drinks, user] = await Promise.all([getDrinks(), getUser(userId)]);

    if (!user) {
        return <div>Fant ikke bruker.</div>;
    }

    return (
        <div>
            <h3>Salg til {user.name}</h3>
            <h2>Tilgjengelig drikke</h2>
            <div>
                {drinks.map(drink => {
                    return (
                        <SaleButton
                            key={drink.id}
                            name={drink.name}
                            price={drink.price}
                            userId={user.id}
                            drinkId={drink.id}
                        />
                    );
                })}
            </div>
        </div>
    );
}
