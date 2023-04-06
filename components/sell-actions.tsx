"use client";

import { ArrowPathIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

type SellActionsProps = {
    userId: string;
    drinkId: string;
};

export const SellActions: React.FC<SellActionsProps> = ({
    userId,
    drinkId,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleSale = async () => {
        setIsLoading(true);
        setError("");
        const isOk = await fetch("/transaction", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId,
                drinkId,
            }),
        });
        if (isOk) {
            setSuccessful(true);
            setTimeout(() => router.push("/hjem"), 2000);
        } else {
            setError("Noe gikk galt. Prøv på nytt");
        }
    };

    return (
        <div>
            <button
                className={`bg-green-500 px-6 h-12 disabled:bg-gray-500 ${
                    isLoading && "bg-gray-500"
                }`}
                onClick={handleSale}
                disabled={isLoading}
            >
                <CheckIcon className="h-12" />
            </button>
            <button
                className="bg-red-500 px-6 h-12 ml-8"
                onClick={() => router.push("/hjem")}
            >
                <XMarkIcon className="h-12" />
            </button>
            {error && <div className="text-2xl mt-2">{error}</div>}
            {!error && successful && (
                <>
                    <h3 className="text-2xl mt-2">Kjøp vellykket!</h3>
                    <h3 className="text-sm mt-2">Sender deg videre...</h3>
                </>
            )}
        </div>
    );
};
