import { ListItem } from "@/components/list-item";

const competitions = [
    { name: "Navn", prize: "Premie" },
    { name: "Beerpong", prize: 2 },
    { name: "Cage", prize: 3 },
    { name: "Jenga", prize: 2 },
    { name: "Uno", prize: 2 },
];

export default async function CompetitionsPage() {
    return (
        <div className="mx-4 text-center">
            <h2 className="text-xl mb-4">Konkurranser</h2>
            {competitions.map((e, i) => (
                <ListItem key={e.name} index={i}>
                    <h3 className={`${i === 0 && "font-bold"}`}>{e.name}</h3>
                    <h4 className={`${i === 0 && "font-bold"}`}>{e.prize}</h4>
                </ListItem>
            ))}
        </div>
    );
}
