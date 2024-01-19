import Team from "./Team";
import Competition from "./Competition";

export default interface Profile {
    teams: Team[];
    competitions: Competition[];
    email: string;
}