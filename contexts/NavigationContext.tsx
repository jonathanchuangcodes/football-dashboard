import { createContext, useContext, useState } from "react";
import Navigation from "@/interfaces/Navigation";
import Team from "@/interfaces/Team";
import Competition from "@/interfaces/Competition";

const NavigationContext = createContext<Navigation>({
    teams: [],
    competitions: [],
    setTeams: () => { },
    setCompetitions: () => { },
});

export const useNav = () => {
    return useContext(NavigationContext);
};

export const NavigationProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [navigationState, setNavigationState] = useState<{ teams: Team[], competitions: Competition[] }>({
        teams: [],
        competitions: [],
    });

    let setTeams = (team: Team) => {
        let newTeams = [...navigationState.teams, team];
        setNavigationState({ ...navigationState, teams: newTeams })
    }

    let setCompetitions = (competition: Competition) => {
        let newCompetitions = [...navigationState.competitions, competition];
        setNavigationState({ ...navigationState, competitions: newCompetitions })
    }

    const value = {
        ...navigationState,
        setTeams,
        setCompetitions
    };
    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
}
