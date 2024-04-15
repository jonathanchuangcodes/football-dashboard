import React from "react";
import FixtureCard from "@/components/FixtureCard";
import Fixture from "@/interfaces/Fixture";

export default async function FixtureList({ fixtures }: { fixtures: Fixture[] }) {

    return (
        <div className="flex flex-1 flex-col align-middle gap-4 overflow-y-scroll">
            {fixtures.length ? fixtures.sort((a: Fixture, b: Fixture) => {
                return new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime();
            }).map((fixture: Fixture) => {
                return <FixtureCard key={fixture.fixture.id} fixture={fixture} />
            }) : <p className="text-black flex-1 text-center h-8">No fixtures found</p>}
        </div>
    )
}