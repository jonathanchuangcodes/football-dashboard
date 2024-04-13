import Fixture from "@/interfaces/Fixture"
import TeamStatistic from "@/interfaces/TeamStatistic"
import Image from "next/image"
import { getFixtureStatistics } from "@/utils/get-data"
import TeamStatistics from "./TeamStatistics"

export const preload = ({ fixture }: { fixture: Fixture }) => {
    // void evaluates the given expression and returns undefined
    // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
    if (fixture.fixture.status.short !== "NS") {

        void getFixtureStatistics(fixture.fixture.id)
    }
}


export default async function FixtureCard({ fixture }: { fixture: Fixture }) {

    let statistics: TeamStatistic[] = await getFixtureStatistics(fixture.fixture.id);
    // console.log(fixture);


    return (
        <div key={fixture.fixture.id} className="text-black animate-in flex-1 flex flex-row gap-8 opacity-0 p-6 border-border border-4 rounded-lg w-full">
            <div className="flex flex-col text-center justify-between w-1/3">
                <div>
                    <h4>{fixture.league.name}</h4>
                    <h5>{fixture.league.round}</h5>
                </div>

                <div className="flex flex-row justify-between items-center mt-8">
                    <div className="flex flex-col gap-4 justify-center pr-8">
                        <div className="h-16 w-16  flex justify-center items-center">
                            <Image alt={fixture.teams.home.name} src={fixture.teams.home.logo} width={64} height={64} />
                        </div>
                        <p aria-label="home team score">{fixture.goals.home === null ? "-" : fixture.goals.home}</p>
                    </div>
                    <p>V.S.</p>
                    <div className="flex flex-col gap-4 justify-center pl-8">
                        <div className="h-16 w-16 flex justify-center items-center">
                            <div>
                                <Image alt={fixture.teams.away.name} src={fixture.teams.away.logo} width={64} height={64} />
                            </div>
                        </div>
                        <p aria-label="away team score">{fixture.goals.away === null ? "-" : fixture.goals.away}</p>
                    </div>
                </div>
                <div>
                <h6>{`${fixture.fixture.status.elapsed}'`}</h6>
                    <h6>{fixture.fixture.status.long}</h6>
                </div>
            </div>
            <div className="flex flex-row text-center w-full scroll-smooth overflow-x-clip overflow-y-auto max-h-80">
                <TeamStatistics statistics={statistics} />
            </div>
            <div className="items-center justify-center flex flex-row text-center w-1/3">
                Highlights here
            </div>
        </div>
    )
}