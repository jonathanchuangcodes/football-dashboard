import React from "react";
import NavButton from "@/components/NavButton";
import { get } from "@/api/football";
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import Team from "@/interfaces/Team";

export default async function TeamLinkList() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()
    let metadata = user?.user_metadata

    const teamsInfo = metadata?.teams?.length && await Promise.all(metadata?.teams?.map(async (team: any) => {
        let response = await get("/teams", { id: team });
        let data = await response.json();
        return data.response[0];
    }));

    return (
        <div className={`${metadata?.teams?.length ? "block" : "hidden"}`}>
            {teamsInfo?.map((team: Team) => (
                <NavButton key={team.team.id} title={team.team.name} value={"/teams/" + team.team.id + "/matches"} src={team.team.logo} />
            ))}
        </div>)
}