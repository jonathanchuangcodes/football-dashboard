import Fixture from "@/interfaces/Fixture"
import TeamStatistic from "@/interfaces/TeamStatistic"
import Image from "next/image"
import { getFixtureStatistics } from "@/utils/get-data"

export const preload = ({ fixture }: { fixture: Fixture }) => {
    // void evaluates the given expression and returns undefined
    // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
    if (fixture.fixture.status.short !== "NS") {

        void getFixtureStatistics(fixture.fixture.id)
    }
}


export default async function FixtureCard({ fixture }: { fixture: Fixture }) {

    let statistics: TeamStatistic[] = await getFixtureStatistics(fixture.fixture.id);


    return (
        <div className="animate-in flex-1 flex flex-row gap-20 opacity-0 max-w-4xl p-6 border-border border-4 rounded-lg w-full">
            <div className="flex flex-col text-center w-1/3">
                <h4>{fixture.league.name}</h4>
                <h5>{fixture.league.round}</h5>
                <div className="flex flex-row justify-between">
                    <Image alt={fixture.teams.home.name} src={fixture.teams.home.logo} width={50} height={50} />
                    <p>V.S.</p>
                    <Image alt={fixture.teams.away.name} src={fixture.teams.away.logo} width={50} height={50} />
                </div>
                <div className="flex flex-row justify-between mt-4">
                    <div aria-label="home team score">{fixture.goals.home === null ? "-" : fixture.goals.home}</div>
                    <div aria-label="away team score">{fixture.goals.away === null ? "-" : fixture.goals.away}</div>
                </div>
            </div>
            <div className="flex flex-row text-center w-1/3">
                {statistics.length > 0 && statistics.map((statistic) => {
                    return (
                        <div key={statistic.team.name} className="flex flex-col text-center w-1/2">
                            <div>{statistic.team.name}</div>
                            {statistic.statistics.map((stat) => {
                                return (
                                    <div key={stat.type}>
                                        <div >{stat.type}</div>
                                        <div >{stat.value}</div>
                                    </div>)
                            })}
                        </div>)
                })
                }
            </div>
            <div className="items-center justify-center flex flex-row text-center w-1/3">
                Highlights here
            </div>
        </div>
    )
}