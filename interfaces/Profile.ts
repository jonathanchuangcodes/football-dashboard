import Team from "./Team";
import Competition from "./Competition";

export default interface Profile {
    teams: number[];
    competitions: number[];
    email: string;
    addTeam: (team: number) => void,
    addCompetition: (competition: number) => void,
    setTeams: (team: number[]) => void,
    setCompetitions: (competition: number[]) => void,
}