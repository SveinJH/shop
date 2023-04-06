import { db } from "@/utils/db";

async function getDrinks() {
    const drinks = await db.drink.findMany({
        orderBy: {
            name: "asc",
        },
    });

    if (!drinks) return null;

    return drinks;
}

export default async function BarPage() {
    const drinks = await getDrinks();

    if (!drinks) return <div>Fant ingen tilgjengelige drinker</div>;

    return (
        <div className="grid grid-cols-2 text-center gap-4 mx-4">
            {drinks.map(drink => {
                return (
                    <button
                        key={drink.id}
                        className="border border-gray-700 py-2 bg-gray-800"
                        // SHOW QR
                        // onClick={}
                    >
                        <h3 className="text-lg mb-1">{drink.name}</h3>
                        <h4 className="text-gray-300">
                            {drink.price} kuponger
                        </h4>
                    </button>
                );
            })}
        </div>
    );
}
