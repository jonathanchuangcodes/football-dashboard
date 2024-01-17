import football from "@/api/football";

export default async function CompetitionPage({ params }: { params: { slug: string, id: 39 } }) {
    console.log(params.id);
    let data = await football.get("/leagues", { params: { id: params.id } }).then(({ data }) => {
        return data.response;
    });
    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}