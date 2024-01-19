import { createContext, useContext, useState } from "react";
import Navigation from "@/interfaces/Navigation";

const NavigationContext = createContext<Navigation>({
    teams: [],
    competitions: [],
    selected: "",
    setSelected: () => "",
});

export const useNav = () => {
    return useContext(NavigationContext);
};

export const NavigationProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [navigationState, setNavigationState] = useState({
        teams: [],
        competitions: [],
        selected: "",
    });

    let setSelected = (selected: string) => {
        setNavigationState({ ...navigationState, selected });
    }

    const value = {
        ...navigationState,
        setSelected,
    };
    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
}
