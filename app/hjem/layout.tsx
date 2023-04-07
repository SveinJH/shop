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
                        {name && (
                            <h3 className="text-sm font-bold">
                                {getRole(role, name)}
                            </h3>
                        )}
                    </div>
                    {/* <QRButton id={session.user.id} /> */}
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
