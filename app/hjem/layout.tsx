import { QRButton } from "@/components/qr-button";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomeLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    console.log("session", session);

    if (!session || !session.user) {
        redirect("/");
    }

    const { coupons, role, name } = session.user;

    return (
        <section>
            <nav className="m-4">
                <h1 className="text-3xl">Innflyttingsfiesta</h1>
            </nav>
            <section className="m-4 my-8 border border-gray-200 p-4 rounded-lg shadow bg-gray-900">
                <div className="flex justify-between">
                    <div>
                        {name && <h3 className="text-xl">{name}</h3>}
                        <h3 className="text-sm font-bold">{getRole(role)}</h3>
                    </div>
                    <QRButton id={session.user.id} />
                </div>
                <div className="flex justify-between items-center mt-4">
                    <h4 className="text-lg">Mine kuponger</h4>
                    <p className="text-2xl">{coupons}</p>
                </div>
            </section>
            {children}
        </section>
    );
}

export function getRole(role: string) {
    switch (role) {
        case "admin":
            return "Administrator";
        case "user":
            return "Fyllik";
        case "bartender":
            return "Bartender";
        default:
            return "Tysste";
    }
}
