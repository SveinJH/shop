import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    console.log("session", session);

    if (!session || !session.user) {
        redirect("/logg-inn");
    }

    const { coupons, role, name } = session.user;

    return (
        <section>
            <nav className="m-4 flex items-center justify-between">
                <h1 className="text-3xl">Innflyttingsfiesta</h1>
                <Link href="/hjem" className="bg-yellow-700 px-4 py-1">
                    Hjem
                </Link>
            </nav>
            <section className="m-4 my-6 border border-gray-200 p-4 rounded-lg shadow bg-gray-900">
                <div className="flex justify-between">
                    <div>
                        {name && <h3 className="text-xl">{name}</h3>}
                        {name && (
                            <h3 className="text-sm font-bold">
                                {getRole(role, name)}
                            </h3>
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <h4 className="text-lg">Mine bonger</h4>
                    <p className="text-2xl">{coupons}</p>
                </div>
            </section>
            {children}
        </section>
    );
}

export function getRole(role: string, name: string) {
    switch (role) {
        case "admin":
            return "Administrator";
        case "user":
            const synonyms = [
                "Alkoholiker",
                "Drunkard",
                "Drukkenbolt",
                "Brannert",
                "Fyllepen",
                "Drikker",
                "Drikkfeldig",
                "Fyllebøtte",
                "Suppegjøk",
                "Spritfantom",
                "Rusmisbruker",
                "Svirebror",
                "Sjangler",
                "Beruset person",
                "Sluske",
                "Trønderfyllik",
                "Humlefylt",
                "Fyllenerd",
            ];
            const synonymIndex = name.length % synonyms.length;
            return synonyms[synonymIndex];
        case "bartender":
            return "Bartender";
        default:
            return "Tysste";
    }
}
