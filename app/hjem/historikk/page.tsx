import { HistoryContent } from "@/components/history-content";
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

async function getTransfers() {
    const transactions = await db.transfer.findMany({
        select: {
            id: true,
            createdAt: true,
            fromUser: {
                select: {
                    name: true,
                },
            },
            toUser: {
                select: {
                    name: true,
                },
            },
            amount: true,
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
    const transfers = await getTransfers();

    return <HistoryContent transactions={transactions} transfers={transfers} />;
}
