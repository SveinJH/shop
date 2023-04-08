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

    const happyHourDrinks = drinks?.filter(drink => drink.happyHour) ?? [];

    const updatedDrinks = drinks?.filter(
        drink =>
            drink.name !== "Isbjørn Seltzer" &&
            drink.name !== "Blue Lagoon" &&
            drink.name !== "Mojito"
    );

    return (
        <>
            {happyHourDrinks.length > 0 && (
                <div className="text-center mb-4 bg-green-600">
                    <h3>Nå er det Happy Hour på</h3>
                    <div>
                        {happyHourDrinks.map(d => {
                            return (
                                <p className="text-sm" key={d.id}>
                                    {d.name}
                                </p>
                            );
                        })}
                    </div>
                </div>
            )}
            <div className="grid grid-cols-2 text-center gap-4 mx-4">
                {updatedDrinks?.map(drink => {
                    return (
                        <button
                            key={drink.id}
                            className="border border-gray-700 py-2 bg-gray-800"
                            onClick={() => handleClick(drink)}
                        >
                            <h3 className="text-lg mb-1">{drink.name}</h3>
                            <h4 className="text-gray-300">
                                <span
                                    className={`${
                                        drink.happyHour && "line-through"
                                    }`}
                                >
                                    {drink.price}
                                </span>
                                {drink.happyHour && ` ${drink.price - 1}`}{" "}
                                bonger
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
                        {drink.happyHour ? drink.price - 1 : drink.price} bonger
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
