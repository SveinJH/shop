"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type SendCouponsButtonProps = {
    myUserId: string;
    userId: string;
};

export const SendCouponsButton: React.FC<SendCouponsButtonProps> = ({
    myUserId,
    userId,
}) => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState("");
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");

    const handleTransfer = async () => {
        if (value) {
            try {
                setError("");
                const amount = parseInt(value);
                const isOk = await fetch("/transfer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        toUserId: userId,
                        fromUserId: myUserId,
                        amount,
                    }),
                });
                if (isOk.status === 200) {
                    setValue("");
                    setShowModal(false);
                    startTransition(() => {
                        router.refresh();
                    });
                } else {
                    setError("Mislykket. Sjekk at du har nok kuponger å sende");
                }
            } catch {}
        }
    };

    return (
        <div className="mt-2">
            <button
                className="bg-yellow-700 p-1 px-8"
                onClick={() => setShowModal(true)}
            >
                Send bonger
            </button>
            {showModal && (
                <div className="w-screen h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-900 flex justify-center items-center flex-col">
                    <input
                        className="text-gray-900 text-center py-2 text-2xl"
                        type="string"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <div>
                        <button
                            onClick={handleTransfer}
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
                    {error && <div className="mt-4 text-xl">{error}</div>}
                </div>
            )}
        </div>
    );
};
