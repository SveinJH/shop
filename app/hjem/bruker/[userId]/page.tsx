import { GiveCouponsButton } from "@/components/give-coupons-button";
import { ListItem } from "@/components/list-item";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/utils/db";
import { getServerSession } from "next-auth";
import { getRole } from "../../layout";

async function getUser(id: string) {
    const user = await db.user.findUnique({
        where: { id },
        select: {
            name: true,
            coupons: true,
            role: true,
            transactions: {
                select: {
                    id: true,
                    drink: {
                        select: { name: true },
                    },
                },
            },
        },
    });

    if (!user) return null;

    return user;
}

export default async function UserPage({
    params,
}: {
    params: { userId: string };
}) {
    const session = await getServerSession(authOptions);
    const user = await getUser(params.userId);

    if (!user)
        return <div>Fant ikke bruker med id &quot;{params.userId}&quot;.</div>;

    const transactions = groupTransactions(user.transactions);

    return (
        <div className="m-4 text-center">
            <h2 className="text-2xl">{user.name}</h2>
            {user.name && (
                <h3 className="text-sm font-bold mb-2">
                    {getRole(user.role, user.name)}
                </h3>
            )}
            <h3 className="text-xl">
                {user.coupons} kuponger{" "}
                {session?.user.role === "admin" && (
                    <GiveCouponsButton
                        userId={params.userId}
                        name={user.name}
                    />
                )}
            </h3>
            <h4 className="text-center text-lg mt-6">Drikkeoversikt</h4>
            <div>
                {transactions.map((t, i) => (
                    <ListItem key={t.name} index={i}>
                        <div>{t.name}</div>
                        <div>{t.count}</div>
                    </ListItem>
                ))}
            </div>
        </div>
    );
}

type CountedDrinks = {
    name: string;
    count: number;
}[];

function groupTransactions(
    transactions: {
        id: string;
        drink: {
            name: string;
        };
    }[]
) {
    return transactions.reduce<CountedDrinks>((acc, transaction) => {
        const name = transaction.drink.name;
        const existingDrink = acc.find(item => item.name === name);

        if (existingDrink) {
            existingDrink.count += 1;
        } else {
            acc.push({ name, count: 1 });
        }

        return acc;
    }, []);
}
