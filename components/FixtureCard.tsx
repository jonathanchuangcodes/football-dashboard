'use client'
import React, { useEffect, useState } from "react"
import Fixture from "@/interfaces/Fixture"
import Image from "next/image"
import TeamStatistics from "./TeamStatistics"
import { updateFixture } from "@/action"
import { fixtureInProgress } from "@/utils/fixtures"

export default function FixtureCard({ fixture: fixtureData }: { fixture: Fixture }) {
    let date = new Date(fixtureData.fixture?.date);
    let [fixture, setFixture] = useState<Fixture>(fixtureData);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (fixtureInProgress(fixture.fixture.status.short)) {
            timer = setTimeout(async () => {
                let updatedFixture = await updateFixture(fixture.fixture.id);
                setFixture(updatedFixture);
            }, 1000 * 60)
        }
        return () => {
            clearTimeout(timer)
        }
    })

    return (
        <div key={fixture.fixture.id} className="text-black animate-in flex-1 flex flex-row gap-4 opacity-0 p-6 border-border border-4 rounded-lg w-full">
            <div className="flex-1 flex flex-col text-center justify-between">
                <div>
                    <h4>{fixture.league?.name}</h4>
                    <h5>{fixture.league?.round}</h5>
                </div>

                <div className="flex flex-row justify-between items-center mt-8">
                    <div className="flex flex-col gap-4 justify-center pr-8">
                        <div className="h-16 w-16  flex justify-center items-center">
                            <Image alt={fixture.teams?.home.name} src={fixture.teams?.home.logo} width={64} height={64} />
                        </div>
                        <p aria-label="home team score">{fixture.goals.home === null ? "-" : fixture.goals.home}</p>
                    </div>
                    <p>V.S.</p>
                    <div className="flex flex-col gap-4 justify-center pl-8">
                        <div className="h-16 w-16 flex justify-center items-center">
                            <div>
                                <Image alt={fixture.teams?.away.name} src={fixture.teams?.away.logo} width={64} height={64} />
                            </div>
                        </div>
                        <p aria-label="away team score">{fixture.goals.away === null ? "-" : fixture.goals.away}</p>
                    </div>
                </div>
                <div>
                    {fixture.fixture.status.elapsed ? <h6>{`${fixture.fixture.status.elapsed}'`}</h6> : <h6>{date.toLocaleDateString('en-US', {
                        weekday: 'long',
                    })}</h6>}
                    <h6>{date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}</h6>
                    <h6>{fixture.fixture.status.long}</h6>
                </div>
            </div>
            <div className="flex-1 flex flex-row text-center justify-center items-center w-full scroll-smooth overflow-x-clip overflow-y-auto max-h-80">
                {fixture.fixture.status.short !== "NS" && fixture.statistics ? <TeamStatistics statistics={fixture.statistics} /> : `${date.toLocaleDateString('en-US', {
                    weekday: 'long',
                })}, ${date.toLocaleTimeString('en-US',)}`
                }
            </div>
            <div className="flex-1 items-center justify-center flex flex-row text-center">
                Highlights here
            </div>
        </div>
    )
}