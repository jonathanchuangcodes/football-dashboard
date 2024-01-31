import { cache } from 'react'
import 'server-only'
import Team from "@/interfaces/Team";
import Competition from "@/interfaces/Competition";
import Fixture from "@/interfaces/Fixture";
import TeamStatistic from "@/interfaces/TeamStatistic";
import { get } from "@/api/football";
const leagueIds = ["2", "3", "4", "7", "39", "40", "41", "42", "44", "45", "46", "61", "62", "135", "136", "137", "78", "79", "81", "88", "94", "98", "140", "142", "143", "144", "179", "589", "673"];

const testLeagueIds = ["2", "3", "4", "7", "39"]
let SEASON = "2023"

export const updateCompetitions = cache(async (): Promise<Competition[]> => {
    let competitions = await testLeagueIds.map(async (id: string) => {
        let response = await get("/leagues", { id: parseInt(id), current: true })
        let data = await response.json();
        console.log(data);

        let competition: Competition = {
            league: data.response[0]?.league, country: data.response[0]?.country
        }
        return competition;
    });

    return Promise.all(competitions);
})

export async function updateTeams(): Promise<Team[]> {
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
}

export const getFixtureList = cache(async (): Promise<Fixture[]> => {
    let response = await get("/fixtures", { live: testLeagueIds.join("-") })
    let liveData = await response.json();
    let liveFixtures = liveData.response;
    let completeFixtureList = await Promise.all(testLeagueIds.map(async (league) => {
        let lastFive = await get("/fixtures", { league: parseInt(league), season: SEASON, last: 5 })
        let nextFive = await get("/fixtures", { league: parseInt(league), season: SEASON, next: 5 })
        let lastFiveData = await lastFive.json();
        let nextFiveData = await nextFive.json();
        lastFive = lastFiveData.response;
        nextFive = nextFiveData.response;
        return [lastFive, nextFive];
    }));
    return [...liveFixtures, ...completeFixtureList.flat(2)]
})

export const getFixtureListById = cache(async (idList: string): Promise<Fixture[]> => {
    let response = await get("/fixtures", { ids: idList })
    let data = await response.json();
    let fixtures = data.response;   
    return fixtures
})

export const getFixtureStatistics = cache(async (id: number): Promise<TeamStatistic[]> => {
    let response = await get("/fixtures/statistics", { fixture: id })
    let data = await response.json();
    let statistics = data.response;
    return statistics
})