

import "../styles/index.css"
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { getCompetitionFixtureList, getAllLiveFixtureList, getTeamFixtureList } from "@/utils/get-data"
import _ from "lodash"
import FixtureTimeline from "@/components/FixtureTimeline"
import { getFixtureStatistics } from "@/utils/get-data"
import Fixture from "@/interfaces/Fixture"
import TeamStatistic from "@/interfaces/TeamStatistic"

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

  let competitionFixtureList = await Promise.all(await competitionIdList.split("-").map((id: string) => {
    return getCompetitionFixtureList(Number(id));
  }))
  competitionFixtureList = _.flattenDeep(competitionFixtureList)

  let teamFixtureList = await Promise.all(await teamIdList.split("-").map((id: string) => {
    return getTeamFixtureList(Number(id));
  }))
  teamFixtureList = _.flattenDeep(teamFixtureList)

  let allFixtureList = [...liveFixtureList, ...competitionFixtureList, ...teamFixtureList]

  allFixtureList = await Promise.all(allFixtureList.map(async (fixture) => {
    if (fixture.fixture.timestamp - Date.now() < 0) {
      let statistics: TeamStatistic[] = await getFixtureStatistics(fixture.fixture.id);
      fixture.statistics = statistics;
    }
    return fixture;
  }));

  return (
      <FixtureTimeline fixtureList={allFixtureList} />
  )
}
