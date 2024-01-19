import Team from "./Team";
import Competition from "./Competition";

export default interface Navigation {
    teams: Team[];
    competitions: Competition[];
    selected: string;
    setSelected: (selected: string) => void;
}