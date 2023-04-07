"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type GiveCouponsButtonProps = {
    userId: string;
    name: string | null;
};

export const GiveCouponsButton: React.FC<GiveCouponsButtonProps> = ({
    userId,
    name,
}) => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSend = async () => {
        if (value) {
            try {
                const amount = parseInt(value);
                const isOk = await fetch("/send", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId,
                        amount,
                    }),
                });
                if (isOk) {
                    setShowModal(false);
                    startTransition(() => {
                        router.refresh();
                    });
                }
            } catch {}
        }
    };

    return (
        <div>
            <button
                className="bg-yellow-700 mt-2"
                onClick={() => setShowModal(!showModal)}
            >
                <PlusIcon className="h-8" />
            </button>
            {showModal && (
                <div className="w-screen h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-900 flex justify-center items-center flex-col">
                    <h2 className="text-xl mb-4">
                        Send{name && ` til ${name}`}
                    </h2>
                    <input
                        className="text-gray-900 text-center py-2 text-2xl"
                        type="string"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <div>
                        <button
                            onClick={handleSend}
                            className="text-2xl mt-8 py-2 px-6 bg-green-700 mr-4"
                        >
                            Send
                        </button>
                        <button
                            onClick={() => setShowModal(false)}
                            className="text-2xl mt-8 py-2 px-6 bg-gray-900"
                        >
                            Lukk
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
