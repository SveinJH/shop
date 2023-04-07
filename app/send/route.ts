import { db } from "@/utils/db";
import { NextResponse } from "next/server";

type SendCouponsRequest = {
    userId?: string;
    amount?: number;
};

export async function POST(request: Request) {
    const { userId, amount }: SendCouponsRequest = await request.json();

    if (!userId || !amount) {
        return new Response("Feil", { status: 400 });
    }

    const isOk = await sendCoupons(userId, amount);

    if (isOk) {
        return new Response("Suksess");
    }
    return new Response("Feil", { status: 400 });
}

export async function sendCoupons(userId: string, amount: number) {
    const updateUser = await db.user.update({
        where: { id: userId },
        data: { coupons: { increment: amount } },
    });

    return !!updateUser;
}
