"use client"

import { createContext, useContext, useState } from "react";
import Profile from "@/interfaces/Profile";

const ProfileContext = createContext<Profile>({
    teams: [],
    competitions: [],
    email: "",
    addTeam: () => { },
    addCompetition: () => { },
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
    let addTeam = (team: number) => {
        let newTeams = [...profileState.teams, team];
        setProfileState({ ...profileState, teams: newTeams as number[] });
    }

    let addCompetition = (competition: number) => {
        let newCompetitions = [...profileState.competitions, competition];
        setProfileState({ ...profileState, competitions: newCompetitions as number[] });
    }

    let setTeams = (teams: number[]) => {
        setProfileState({ ...profileState, teams });
    }

    let setCompetitions = (competitions: number[]) => {
        setProfileState({ ...profileState, competitions });
    }


    const [profileState, setProfileState] = useState<Profile>({
        teams: [],
        competitions: [],
        email: "",
        addTeam,
        addCompetition,
        setTeams,
        setCompetitions
    });



    const value = {
        ...profileState,
        addTeam,
        addCompetition,
        setTeams,
        setCompetitions
    };
    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}
