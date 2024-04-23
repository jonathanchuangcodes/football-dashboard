import React from "react";
import { getCompetitionFixtureList } from "@/utils/get-data";
import FixtureList from "@/components/FixtureList";
import FixtureTimeline from "@/components/FixtureTimeline";

export default async function CompetitionMatches({ params }: { params: { id: string } }) {
    let matches = await getCompetitionFixtureList(Number(params.id));
    return (
        <FixtureTimeline fixtureList={matches} />
    );
}