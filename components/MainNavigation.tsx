'use client'

import { useNav, NavigationProvider } from "@/contexts/NavigationContext";
import { useState } from "react"
import NavButton from "@/components/NavButton";

export default function MainNavigation() {
    let { teams, competitions } = useNav();

    return (
        <NavigationProvider>
            <nav className="absolute top-0 left-0 flex-1 h-full w-24 flex flex-col gap-20 items-left p-4">
                <NavButton title={"H"} value={"/"} />

                <div>
                    {teams.map(({ team }) => (
                        <NavButton key={team.id} title={team.name} value={"/teams" + team.id} icon={team.logo} />
                    ))}
                </div>
                <div>
                    {competitions.map(({ league }) => (
                        <NavButton key={league.id} title={league.name} value={"/teams" + league.id} icon={league.logo} />
                    ))}
                </div>
                <button className="bg-slate-100 text-foreground p-2 rounded-md">+</button>
            </nav>
        </NavigationProvider>

    )
}