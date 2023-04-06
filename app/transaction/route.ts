import { db } from "@/utils/db";
import { NextResponse } from "next/server";

type CreateTransactionRequest = {
    userId?: string;
    drinkId?: string;
};

export async function POST(request: Request) {
    const { userId, drinkId }: CreateTransactionRequest = await request.json();

    if (!userId || !drinkId) {
        return new Response("Feil", { status: 400 });
    }

    const isOk = await createTransaction(userId, drinkId);

    if (isOk) {
        return new Response("Suksess");
    }
    return new Response("Feil", { status: 400 });
}

export async function createTransaction(userId: string, drinkId: string) {
    // Check and remove coupons
    const userPromise = db.user.findUnique({ where: { id: userId } });
    const drinkPromise = db.drink.findUnique({ where: { id: drinkId } });

    const [user, drink] = await Promise.all([userPromise, drinkPromise]);

    if (user && drink && user.coupons >= drink.price) {
        const updateUser = db.user.update({
            where: { id: userId },
            data: { coupons: { decrement: drink.price } },
        });
        const createTransaction = db.transaction.create({
            data: {
                drinkId,
                userId,
            },
        });

        await db.$transaction([updateUser, createTransaction]);

        return true;
    }

    // Create transaction
}
