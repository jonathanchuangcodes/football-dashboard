

import { updateCompetitions, updateTeams, getFixtureList, getFixtureListById } from "@/utils/get-data"
import "../styles/index.css"
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import Fixtures from "@/components/Fixtures"

export default function Index() {
  // let competitions = await updateCompetitions();
  // let teams = await updateTeams();
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const isSignedIn = supabase.auth.getUser() !== null

  const handleOnClick = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()
    let metadata = user?.user_metadata
    const { error } = await supabase.auth.updateUser({
      data: { ...metadata, teams: [], competitions: [2, 39] }
    })

    if (error) {
      console.log(error)
    }
    return
  }

  return (
    <>

      {isSignedIn && <form action={handleOnClick}>
        <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">Create Profile</button>
      </form>}
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
