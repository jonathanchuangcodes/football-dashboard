

import { updateCompetitions, updateTeams, getFixtureList, getFixtureListById } from "@/utils/get-data"
import "../styles/index.css"
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import Fixtures from "@/components/Fixtures"

export default function Index() {
  // let competitions = await updateCompetitions();
  // let teams = await updateTeams();

  return (
    <>
      <Fixtures />
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
