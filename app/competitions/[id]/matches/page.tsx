import React from "react";
import { getCompetitionFixtureList } from "@/utils/get-data";
import FixtureList from "@/components/FixtureList";

export default async function CompetitionMatches({ params }: { params: { id: string } }) {
    let matches = await getCompetitionFixtureList(Number(params.id));
    return (
        <>
            <FixtureList fixtures={matches} />
            <div className=" text-black w-10% flex flex-col justify-between">
                <p>
                    Today
                </p>
                <p>
                    Tomorrow
                </p>
            </div>
        </>
    );
}