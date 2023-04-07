"use client";

import dayjs from "dayjs";
import { useState } from "react";
import { ListItem } from "./list-item";

type HistoryContentProps = {
    transfers:
        | {
              id: string;
              createdAt: Date;
              amount: number;
              fromUser: {
                  name: string | null;
              };
              toUser: {
                  name: string | null;
              };
          }[]
        | null;
    transactions:
        | {
              id: string;
              drink: {
                  name: string;
              };
              user: {
                  name: string | null;
              };
              createdAt: Date;
          }[]
        | null;
};

export const HistoryContent: React.FC<HistoryContentProps> = ({
    transactions,
    transfers,
}) => {
    const [view, setView] = useState<"transactions" | "transfers">(
        "transactions"
    );

    return (
        <div className="mx-4">
            <div className="flex justify-around mb-4">
                <button
                    onClick={() => setView("transactions")}
                    className={`bg-yellow-700 py-1 px-3 ${
                        view === "transactions" && "bg-gray-100 text-gray-400"
                    }`}
                >
                    Transaksjoner
                </button>
                <button
                    onClick={() => setView("transfers")}
                    className={`bg-yellow-700 py-1 px-3 ${
                        view === "transactions" && "bg-gray-900"
                    }`}
                >
                    Overføringer
                </button>
            </div>
            {view === "transactions" ? (
                <>
                    <div className="text-center mb-2">
                        {transactions?.length === 0
                            ? "Ingen transaksjoner enda"
                            : "Transaksjoner"}
                    </div>
                    {transactions?.map((t, i) => {
                        return (
                            <ListItem key={t.id} index={i}>
                                <p className="text-sm">
                                    {t.user.name} kjøpte {t.drink.name}
                                </p>
                                <p className="text-sm">
                                    {dayjs(t.createdAt).format("HH:mm")}
                                </p>
                            </ListItem>
                        );
                    })}
                </>
            ) : (
                <>
                    <div className="text-center mb-2">
                        {transfers?.length === 0
                            ? "Ingen overføringer enda"
                            : "Overføringer"}
                    </div>
                    {transfers?.map((t, i) => {
                        return (
                            <ListItem key={t.id} index={i}>
                                <p className="text-sm">
                                    {t.fromUser.name} sendte {t.toUser.name}{" "}
                                    {t.amount} bonger
                                </p>
                                <p className="text-sm">
                                    {dayjs(t.createdAt).format("HH:mm")}
                                </p>
                            </ListItem>
                        );
                    })}
                </>
            )}
        </div>
    );
};
