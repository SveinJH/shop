"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
    const handleLogin = () => {
        signIn("vipps");
    };

    return (
        <div>
            <h1>Logg inn her</h1>
            <button onClick={handleLogin}>Logg inn med Vipps</button>
        </div>
    );
}
