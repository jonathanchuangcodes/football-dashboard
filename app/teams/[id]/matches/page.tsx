import React from "react";
import { getTeamFixtureList } from "@/utils/get-data";
import FixtureTimeline from "@/components/FixtureTimeline";

export default async function TeamMatches({ params }: { params: { id: string } }) {
    let matches = await getTeamFixtureList(Number(params.id));
    return (
        <FixtureTimeline fixtureList={matches} />

    );
}