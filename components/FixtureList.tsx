import React from "react";
import FixtureCard from "@/components/FixtureCard";
import Fixture from "@/interfaces/Fixture";

export default function FixtureList({ className, fixtures }: { className?: string, fixtures: Fixture[] }) {

    return (
        <div className={`${className} flex flex-1 flex-col align-middle gap-4 overflow-y-scroll`}>
            {fixtures.sort((a: Fixture, b: Fixture) => {
                return new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime();
            }).map((fixture: Fixture) => {
                return <FixtureCard key={fixture.fixture.id} fixture={fixture} />
            })}
        </div>
    )
}