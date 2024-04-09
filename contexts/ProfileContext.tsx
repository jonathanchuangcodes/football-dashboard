import { createContext, useContext, useState } from "react";
import Profile from "@/interfaces/Profile";
import Team from "@/interfaces/Team";
import Competition from "@/interfaces/Competition";

const ProfileContext = createContext<Profile>({
    teams: [],
    competitions: [],
    email: "",

});

export const useProfile = () => {
    return useContext(ProfileContext);
};

export const ProfileProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [profileState, setProfileState] = useState<Profile>({
        teams: [],
        competitions: [],
        email: "",
    });

    let setTeams = (team: Team) => {
        let newTeams = [...profileState.teams, team];
        setProfileState({ ...profileState, teams: newTeams as Team[] });
    }

    let setCompetitions = (competition: Competition) => {
        let newCompetitions = [...profileState.competitions, competition];
        setProfileState({ ...profileState, competitions: newCompetitions as Competition[] });
    }

    const value = {
        ...profileState,
        setTeams,
        setCompetitions
    };
    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}
