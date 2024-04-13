import React from "react";
import FixtureCard from "@/components/FixtureCard";
import { getFixtureList, getFixtureListById } from "@/utils/get-data"
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export default async function Fixtures() {
    let ids = await getFixtureList();
    let fixtureIdList = ids.map(({ fixture }) => {
        return fixture.id
    })
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    let allFixtures: any[] = [];
    for (let i = 0; i < ids.length; i += 20) {
        let fixtureIdList = ids.map(({ fixture }) => {
            return fixture.id
        }).slice(i, i + 20).join("-")
        let fixtures = await getFixtureListById(fixtureIdList);
        allFixtures = [...allFixtures, ...fixtures]
    };
    const { data: { user } } = await supabase.auth.getUser()
    let metadata = user?.user_metadata
    console.log(metadata);
    
    return (
        <div className="flex flex-col justify-between gap-4 overflow-y-scroll">
            {allFixtures && allFixtures.slice(0, 4).map((fixture) => {
                return <FixtureCard key={fixture.id} fixture={fixture} />
            })}
        </div>
    )
}