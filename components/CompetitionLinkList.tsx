import React from "react";
import NavButton from "@/components/NavButton";
import { get } from "@/api/football";
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import Competition from "@/interfaces/Competition";

export default async function CompetitionLinkList() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()
    let metadata = user?.user_metadata

    const competitionInfoList = metadata?.competitions?.length && await Promise.all(metadata?.competitions?.map(async (team: any) => {
        let response = await get("/leagues", { id: team });
        let data = await response.json();
        return data.response[0];
    }));

    return (
        <div className={`${metadata?.competitions?.length ? "flex" : "hidden"} justify-center flex-col align-middle gap-2`}>
            {competitionInfoList?.map((competition: Competition) => (
                <NavButton key={competition?.league.id} title={competition?.league.name} value={"/competitions/" + competition?.league.id + "/matches/"} src={competition?.league.logo} />
            ))}
        </div>)
}