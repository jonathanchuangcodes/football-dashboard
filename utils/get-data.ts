'use server'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import Team from "@/interfaces/Team";
import Competition from "@/interfaces/Competition";
import Fixture from "@/interfaces/Fixture";
import TeamStatistic from "@/interfaces/TeamStatistic";
import { get } from "@/api/football";
import _ from "lodash"


const leagueIds = ["2", "3", "4", "7", "39", "40", "41", "42", "44", "45", "46", "61", "62", "135", "136", "137", "78", "79", "81", "88", "94", "98", "140", "142", "143", "144", "179", "589", "673"];
const testLeagueIds = ["39", "2"]
let SEASON = "2023"


export const getUserFavoriteList = cache(async () => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()
    let metadata = user?.user_metadata
    let teamIdList = metadata?.teams.join(("-"));
    let competitionIdList = metadata?.competitions.join(("-"));
    return { competitionIdList, teamIdList }
})

export const getCompetitions = cache(async (): Promise<Competition[]> => {
    let competitions = await testLeagueIds.map(async (id: string) => {
        let response = await get("/leagues", { id: parseInt(id), current: true })
        let data = await response.json();

        let competition: Competition = {
            league: data.response[0]?.league, country: data.response[0]?.country
        }
        return competition;
    });

    return Promise.all(competitions);
})

export const getTeams = cache(async (): Promise<Team[]> => {
    let teams = await testLeagueIds.map(async (id: string) => {
        let response = await get("/teams", { league: parseInt(id), season: SEASON })
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
});

export const getAllFixtureList = async (): Promise<Fixture[]> => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()
    let metadata = user?.user_metadata
    let teamIdList = metadata?.teams.join(("-"));
    let competitionIdList = metadata?.competitions.join(("-")) || testLeagueIds.join("-");

    let competitionFixtureList = await Promise.all(await competitionIdList.split("-").map((id: string) => {
        return getCompetitionFixtureList(Number(id));
    }))
    competitionFixtureList = _.flattenDeep(competitionFixtureList)

    let teamFixtureList = teamIdList && await Promise.all(await teamIdList.split("-").map((id: string) => {
        return getTeamFixtureList(Number(id));
    }))
    teamFixtureList = _.flattenDeep(teamFixtureList)

    // let liveFixtureList: Fixture[] = []

    // if (!teamIdList) {
    //     liveFixtureList = await getAllLiveFixtureList();
    // } else {
    //     let liveCompetitionFixtureList = await getAllLiveFixtureList(competitionIdList)
    //     let liveTeamFixtureList = await getAllLiveFixtureList(teamIdList)

    //     liveFixtureList = [...liveCompetitionFixtureList, ...liveTeamFixtureList]
    // }
    

    let allFixtureList = [...competitionFixtureList, ...teamFixtureList]

    allFixtureList = await Promise.all(allFixtureList.map(async (fixture) => {
        if (fixture.fixture.timestamp - Date.now() < 0) {
            let statistics: TeamStatistic[] = await getFixtureStatistics(fixture.fixture.id);
            fixture.statistics = statistics;
        }
        return fixture;
    }));
    return allFixtureList;
};

export const getAllLiveFixtureList = cache(async (idList?: string): Promise<Fixture[]> => {
    let response = await get("/fixtures", { live: idList || "all" }, 60, ["live"])
    let data = await response.json();
    let fixtures = data.response;
    return fixtures
});

export const getCompetitionFixtureList = async (id: number): Promise<Fixture[]> => {
    let nextFiveResponse = await get("/fixtures", { league: id, next: 5 }, 3600 * 24, ["fixtures"])
    let lastTenResponse = await get("/fixtures", { league: id, last: 10 }, 3600 * 24, ["fixtures"])
    let nextFive = await nextFiveResponse.json();
    let lastTen = await lastTenResponse.json();
    let fixtures = [...nextFive.response, ...lastTen.response]
    return fixtures
};

export const getTeamFixtureList = async (id: number): Promise<Fixture[]> => {
    let nextFiveResponse = await get("/fixtures", { team: id, next: 5 }, 3600 * 24, ["fixtures"])
    let lastTenResponse = await get("/fixtures", { team: id, last: 10 }, 3600 * 24, ["fixtures"])
    let nextFive = await nextFiveResponse.json();
    let lastTen = await lastTenResponse.json();
    let fixtures = [...nextFive.response, ...lastTen.response]
    return fixtures
};

export const getFixtureListById = cache(async (idList: string): Promise<Fixture[]> => {
    let response = await get("/fixtures", { ids: idList }, 3600 * 24, ["fixtures"])
    let data = await response.json();
    let fixtures = data.response;
    return fixtures
})

export const getFixtureById = cache(async (id: number): Promise<Fixture> => {
    let response = await get("/fixtures", { id }, 60)
    let data = await response.json();
    let fixture = data.response;
    return fixture[0]
})

export const getFixtureStatistics = cache(async (id: number): Promise<TeamStatistic[]> => {
    let response = await get("/fixtures/statistics", { fixture: id }, 3600 * 24)
    let data = await response.json();
    let statistics = data.response;
    return statistics
})