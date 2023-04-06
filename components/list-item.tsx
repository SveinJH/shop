"use client";

type ListItemProps = {
    index: number;
    children: React.ReactNode;
    onClick?: () => void;
};

export const ListItem: React.FC<ListItemProps> = ({
    children,
    index,
    onClick,
}) => {
    return (
        <div
            className={`flex justify-between gap-4 py-2 px-2 ${
                index % 2 === 0 && "bg-gray-700"
            }`}
            onClick={onClick && onClick}
        >
            {children}
        </div>
    );
};
