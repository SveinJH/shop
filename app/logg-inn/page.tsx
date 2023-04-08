import { Login } from "@/components/login";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        redirect("/hjem");
    }

    return (
        <div className="flex flex-col text-center justify-center h-screen">
            <Login />
        </div>
    );
}
