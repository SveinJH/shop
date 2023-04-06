"use client";

import { useRouter } from "next/navigation";
import { ListItem } from "./list-item";

type OverviewContentProps = {
    users: {
        id: string;
        name: string | null;
        coupons: number;
    }[];
};

export const OverviewContent: React.FC<OverviewContentProps> = ({ users }) => {
    const router = useRouter();

    const handleClick = (id: string) => {
        router.push(`/hjem/bruker/${id}`);
    };

    return (
        <>
            {users.map((user, i) => {
                return (
                    <ListItem
                        key={user.id}
                        index={i}
                        onClick={() => handleClick(user.id)}
                    >
                        <h3 className="text-sm">{user.name}</h3>
                        <h4 className="text-sm">
                            <span className="font-bold">{user.coupons}</span>{" "}
                            kuponger
                        </h4>
                    </ListItem>
                );
            })}
        </>
    );
};
