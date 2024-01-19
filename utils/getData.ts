import axios from "axios";
import Team from "@/interfaces/Team";
import Competition from "@/interfaces/Competition";
import football from "@/api/football";
const leagueIds = ["61", "135", "39", "78", "88", "94"];

export default async function getData() {
    let allData;
    let competitions: Competition[] = [];
    let teams: Team[] = [];
    leagueIds.forEach(async (id) => {
        let { data }: any = await football.get("/leagues", { params: { id, season: "2023" } })
        let competition: Competition = { league: data.response[0].league, country: data.response[0].country }
        console.log(competition);
        competitions.push(competition);
    });
    console.log(competitions);

    leagueIds.forEach(async (id) => {
        let { data }: any = await football.get("/teams", { params: { league: id } })

        data.response.forEach((team: Team) => {
            console.log(team);
            teams.push(team);
        })
    })


    allData = { competitions, teams }
    return allData;
}