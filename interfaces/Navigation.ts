import Team from "./Team";
import Competition from "./Competition";

export default interface Navigation {
    teams: Team[];
    competitions: Competition[];
    setTeams: (team: Team) => void;
    setCompetitions: (competition: Competition) => void;
}