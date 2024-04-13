"use client"

import { createContext, useContext, useState } from "react";
import Profile from "@/interfaces/Profile";

const ProfileContext = createContext<Profile>({
    teams: [],
    competitions: [2, 39],
    email: "",
    setTeams: () => { },
    setCompetitions: () => { },
});

export const useProfile = () => {
    return useContext(ProfileContext);
};

export const ProfileProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    let setTeams = (team: number) => {
        let newTeams = [...profileState.teams, team];
        setProfileState({ ...profileState, teams: newTeams as number[] });
    }

    let setCompetitions = (competition: number) => {
        let newCompetitions = [...profileState.competitions, competition];
        setProfileState({ ...profileState, competitions: newCompetitions as number[] });
    }
    const [profileState, setProfileState] = useState<Profile>({
        teams: [],
        competitions: [],
        email: "",
        setTeams,
        setCompetitions
    });



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
