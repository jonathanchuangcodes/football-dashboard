import { get } from "@/api/football";

export default async function CompetitionPage({ params }: { params: { id: string } }) {
    let response = await get("/leagues", { id: params.id });
    let data = await response.json();
    console.log(data);

    return (
        <div>
            <pre className="text-black">{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}