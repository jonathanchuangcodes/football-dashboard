'use server'

import Team from "@/interfaces/Team";
import Competition from "@/interfaces/Competition";
import Fixture from "@/interfaces/Fixture";
import { get } from "@/api/football";
const leagueIds = ["2", "3", "4", "7", "39", "40", "41", "42", "44", "45", "46", "61", "62", "135", "136", "137", "78", "79", "81", "88", "94", "98", "140", "142", "143", "144", "179", "589", "673"];

export async function updateCompetitions(): Promise<Competition[]> {
    let competitions = await leagueIds.map(async (id: string) => { 
        let response = await get("/leagues", { id: parseInt(id), current: true })
        let data = await response.json();
        console.log(data);
        
        let competition: Competition = {
            league: data.response[0]?.league, country: data.response[0]?.country
        }
        return competition;
    });

    return Promise.all(competitions);
}

export async function updateTeams(): Promise<Team[]> {
    let teams = await leagueIds.map(async (id: string) => {
        let response = await get("/teams", { league: parseInt(id), season: "2023" })
        let data = await response.json();
        let leagueTeams = data.response.map(({ team, venue }: Team) => {
            let parsedTeam: Team = {
                team, venue
            }


            return parsedTeam;
        })

        return leagueTeams
    });

    return Promise.all(teams);
}

export async function updateFixtures(): Promise<Fixture[]> {
    let response = await get("/fixtures", { live: leagueIds.join("-") })
    let data = await response.json();
    return data.response;
}
