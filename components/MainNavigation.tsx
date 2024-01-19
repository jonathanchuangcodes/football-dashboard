'use client'

import { useNav, NavigationProvider } from "@/contexts/NavigationContext";
import { useState } from "react"
import NavButton from "@/components/NavButton";

export default function MainNavigation() {
    let { teams, competitions, selected, setSelected } = useNav();

    return (
        <NavigationProvider>
            <nav className="flex-1 h-full w-24 flex flex-col gap-20 items-left mx-3 my-3">
                <NavButton title={"Home"} value={""} />

                {teams.map(({ team }) => (
                    <NavButton key={team.id} title={team.name} value={"/teams" + team.id} icon={team.logo} />
                ))}
            </nav>
        </NavigationProvider>

    )
}