"use client";

import { Drink } from "@prisma/client";
import { useState } from "react";
import QRCode from "react-qr-code";

type BarContentProps = {
    drinks: Drink[] | null;
    userId?: string;
};

const baseUrl = "http://nikkel.hoie.dev/bartender/salg";

export const BarContent: React.FC<BarContentProps> = ({ drinks, userId }) => {
    const [drink, setDrink] = useState<Drink | null>(null);
    const qrValue = drink ? `${baseUrl}/${drink.id}?id=${userId}` : null;

    const handleClick = (drink: Drink) => {
        if (userId) {
            setDrink(drink);
        }
    };

    return (
        <>
            <div className="grid grid-cols-2 text-center gap-4 mx-4">
                {drinks?.map(drink => {
                    return (
                        <button
                            key={drink.id}
                            className="border border-gray-700 py-2 bg-gray-800"
                            // SHOW QR
                            onClick={() => handleClick(drink)}
                        >
                            <h3 className="text-lg mb-1">{drink.name}</h3>
                            <h4 className="text-gray-300">
                                {drink.price} kuponger
                            </h4>
                        </button>
                    );
                })}
            </div>
            {!!drink && qrValue && (
                <div
                    className="w-screen h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-900 flex justify-center items-center flex-col"
                    onClick={() => setDrink(null)}
                >
                    <h2 className="text-3xl mb-2">{drink.name}</h2>
                    <h2 className="text-xl mb-8 font-bold">
                        {drink.price} kuponger
                    </h2>
                    <QRCode value={qrValue} />
                    <button
                        onClick={() => setDrink(null)}
                        className="text-2xl mt-8 py-2 px-6 bg-gray-900"
                    >
                        Lukk
                    </button>
                </div>
            )}
        </>
    );
};
