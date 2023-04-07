"use client";

import { createTransaction } from "@/app/transaction/route";
import { db } from "@/utils/db";
import { useState } from "react";

type SaleButtonProps = {
    name: string;
    price: number;
    userId: string;
    drinkId: string;
};

export const SaleButton: React.FC<SaleButtonProps> = ({
    name,
    price,
    userId,
    drinkId,
}) => {
    const [successful, setSuccessful] = useState(false);

    const handleSale = async () => {
        const isOk = await fetch("/transaction", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId,
                drinkId,
            }),
        });
        if (isOk.status === 200) {
            setSuccessful(true);
            setTimeout(() => setSuccessful(false), 3000);
        }
    };

    return (
        <div>
            <button onClick={handleSale}>
                <div>
                    <h3>{name}</h3>
                    <h4>{price}</h4>
                    {}
                </div>
            </button>
            {successful && <h3>Godkjent kjøp!</h3>}
        </div>
    );
};
