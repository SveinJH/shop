import { ListItem } from "@/components/list-item";
import { OverviewContent } from "@/components/overview-content";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/utils/db";
import { getServerSession } from "next-auth";

async function getUsers() {
    const users = await db.user.findMany({
        select: {
            id: true,
            name: true,
            coupons: true,
        },
    });

    return users;
}

export default async function OverviewPage() {
    const users = await getUsers();

    return (
        <div className="mx-4">
            <OverviewContent users={users} />
        </div>
    );
}
