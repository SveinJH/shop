import { ListItem } from "@/components/list-item";
import { db } from "@/utils/db";
import dayjs from "dayjs";

async function getTransactions() {
    const transactions = await db.transaction.findMany({
        select: {
            id: true,
            createdAt: true,
            drink: {
                select: {
                    name: true,
                },
            },
            user: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    if (!transactions) {
        return null;
    }

    return transactions;
}

export default async function HistoryPage() {
    const transactions = await getTransactions();

    return (
        <div className="mx-4">
            {transactions?.map((t, i) => {
                return (
                    <ListItem key={t.id} index={i}>
                        <p className="text-sm">
                            {t.user.name} kjøpte {t.drink.name}
                        </p>
                        <p className="text-sm">
                            {dayjs(t.createdAt).format("HH:mm")}
                        </p>
                    </ListItem>
                );
            })}
        </div>
    );
}
