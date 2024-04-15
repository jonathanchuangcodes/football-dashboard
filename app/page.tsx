

import "../styles/index.css"
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { getCompetitionFixtureList, getAllLiveFixtureList, getTeamFixtureList } from "@/utils/get-data"
import FixtureList from "@/components/FixtureList"
import _ from "lodash"
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

  return (
    <>
      <FixtureList fixtures={allFixtureList} />
      <div className=" text-black w-10% flex flex-col justify-between">
        <p>
          Today
        </p>
        <p>
          Tomorrow
        </p>
      </div>
    </>
  )
}
