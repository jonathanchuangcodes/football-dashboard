import React from "react";
import { getTeamFixtureList } from "@/utils/get-data";
import FixtureList from "@/components/FixtureList";

export default async function TeamMatches({ params }: { params: { id: string } }) {
    let matches = await getTeamFixtureList(Number(params.id));
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