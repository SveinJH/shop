"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export const Login = () => {
    const handleLogin = () => {
        signIn("vipps");
    };

    return (
        <>
            <h2 className="text-2xl">Bli med i</h2>
            <h1 className="text-3xl mt-2 mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-200">
                Innflyttingsfiesta
            </h1>
            <button onClick={handleLogin} className="flex justify-center">
                <Image
                    src="/vippslogin.svg"
                    height={40}
                    width={230}
                    alt="vipps login button"
                    priority
                />
            </button>
        </>
    );
};
