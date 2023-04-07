import { OverviewContent } from "@/components/overview-content";
import { db } from "@/utils/db";

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
