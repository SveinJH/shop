"use client";

import { useState } from "react";
import QRCode from "react-qr-code";

type QRButtonProps = {
    id: string;
};

export const QRButton: React.FC<QRButtonProps> = ({ id }) => {
    const [showQR, setShowQR] = useState(false);

    const value = `http://nikkel.hoie.dev/bartender/salg?id=${id}`;

    return (
        <div>
            <button
                className="bg-yellow-700 px-4 py-2 rounded-sm font-medium"
                onClick={() => setShowQR(!showQR)}
            >
                Min QR
            </button>
            <div>
                {showQR && (
                    <div
                        className="w-screen h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-900 flex justify-center items-center flex-col"
                        onClick={() => setShowQR(false)}
                    >
                        <QRCode value={value} />
                        <button
                            onClick={() => setShowQR(false)}
                            className="text-2xl mt-8 py-2 px-6 bg-gray-900"
                        >
                            Lukk
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
