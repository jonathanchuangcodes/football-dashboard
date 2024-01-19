import { createContext, useContext, useState } from "react";
import Navigation from "@/interfaces/Navigation";
import Profile from "@/interfaces/Profile";

const ProfileContext = createContext<Profile>({
    teams: [],
    competitions: [],
    email: "",

});

export const useNav = () => {
    return useContext(ProfileContext);
};

export const ProfileProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [profileState, setProfileState] = useState({
        teams: [],
        competitions: [],
        email: "",
    });

    const value = {
        ...profileState,
    };
    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}
