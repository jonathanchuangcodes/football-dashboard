

import "../styles/index.css"
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { getCompetitionFixtureList, getAllLiveFixtureList, getFixtureStatistics, getTeamFixtureList } from "@/utils/get-data"
import FixtureList from "@/components/FixtureList"
import TeamStatistic from "@/interfaces/TeamStatistic"
import Fixture from "@/interfaces/Fixture"
import _ from "lodash"

export const preload = ({ fixture }: { fixture: Fixture }) => {
  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  if (fixture.fixture.status.short !== "NS") {

    void getFixtureStatistics(fixture.fixture.id)
  }
}


export default async function Index() {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  let metadata = user?.user_metadata
  let teamIdList = metadata?.teams.join(("-"));
  let competitionIdList = metadata?.competitions.join(("-"));

  let liveCompetitionFixtureList = await getAllLiveFixtureList(competitionIdList)
  let liveTeamFixtureList = await getAllLiveFixtureList(teamIdList)

  let liveFixtureList = [...liveCompetitionFixtureList, ...liveTeamFixtureList]

  liveFixtureList = await Promise.all(_.uniqBy(liveFixtureList, "fixture.id").map(async (fixture) => {
    let statistics: TeamStatistic[] = await getFixtureStatistics(fixture.fixture.id);
    fixture.statistics = statistics;
    return fixture;
  }))

  let competitionFixtureList = competitionIdList && await Promise.all(await competitionIdList?.split("-").map((id: string) => {
    return getCompetitionFixtureList(Number(id));
  }))

  competitionFixtureList = _.flattenDeep(competitionFixtureList)

  let teamFixtureList = teamIdList && await Promise.all(await teamIdList.split("-").map((id: string) => {
    return getTeamFixtureList(Number(id));
  }))
  teamFixtureList = _.flattenDeep(teamFixtureList)

  let allFixtureList = [...liveFixtureList, ...competitionFixtureList, ...teamFixtureList]
  allFixtureList = _.uniqBy(allFixtureList, "fixture.id").sort((a: Fixture, b: Fixture) => {
    return new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime();
  })
  return (
    <>
      <FixtureList fixtures={allFixtureList} />
    </>
  )
}
