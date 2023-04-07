import { db } from "@/utils/db";
import { NextResponse } from "next/server";

type TransferCouponsRequest = {
    fromUserId?: string;
    toUserId?: string;
    amount?: number;
};

export async function POST(request: Request) {
    const { fromUserId, toUserId, amount }: TransferCouponsRequest =
        await request.json();

    if (!fromUserId || !toUserId || !amount) {
        return new Response("Feil", { status: 400 });
    }

    const isOk = await createTransfer(fromUserId, toUserId, amount);

    if (isOk) {
        return new Response("Suksess");
    }
    return new Response("Feil", { status: 400 });
}

export async function createTransfer(
    fromUserId: string,
    toUserId: string,
    amount: number
) {
    // Check and remove coupons
    const fromUser = await db.user.findUnique({ where: { id: fromUserId } });

    if (fromUser && fromUser.coupons >= amount) {
        const updateFromUser = db.user.update({
            where: { id: fromUserId },
            data: { coupons: { decrement: amount } },
        });
        const updateToUser = db.user.update({
            where: { id: toUserId },
            data: { coupons: { increment: amount } },
        });
        const createTransferEntry = db.transfer.create({
            data: {
                fromUserId,
                toUserId,
                amount,
            },
        });

        await db.$transaction([
            updateFromUser,
            updateToUser,
            createTransferEntry,
        ]);

        return true;
    }

    // Create transaction
}
