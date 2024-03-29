import { get } from "@/api/football";

export default async function TeamsPage({ params }: { params: { id: string } }) {
    let response = await get("/teams", { id: params.id });
    let data = await response.json();
    console.log(data);

    return (
        <div>
            <pre className="text-black">{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}