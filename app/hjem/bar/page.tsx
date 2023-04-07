import { BarContent } from "@/components/bar-content";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/utils/db";
import { getServerSession } from "next-auth";

async function getDrinks() {
    const drinks = await db.drink.findMany({
        orderBy: {
            name: "asc",
        },
    });

    if (!drinks) return null;

    return drinks;
}

export default async function BarPage() {
    const session = await getServerSession(authOptions);
    const drinks = await getDrinks();

    if (!drinks) return <div>Fant ingen tilgjengelige drinker</div>;

    return (
        <div>
            <BarContent drinks={drinks} userId={session?.user.id} />
        </div>
    );
}
