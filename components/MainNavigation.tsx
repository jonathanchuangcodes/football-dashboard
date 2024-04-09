'use client'

import { useProfile, ProfileProvider } from "@/contexts/ProfileContext";
import NavButton from "@/components/NavButton";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";

export default function MainNavigation() {
    let { teams, competitions } = useProfile();
    let buttonRef = useRef<HTMLButtonElement>(null);
    let [showAdd, setShowAdd] = useState(false);
    const handleClick = () => {
        setShowAdd(!showAdd);
        console.log("clicked", buttonRef.current?.getBoundingClientRect().y);
    }

    return (
        <ProfileProvider>
            <nav className="row-span-1 absolute top-0 left-0 flex-1 h-full flex flex-col gap-20 items-left p-4">
                <NavButton title={"H"} value={"/"} />

                <div className={`${teams.length ? "block" : "hidden"}`}>
                    {teams.map(({ team }) => (
                        <NavButton key={team.id} title={team.name} value={"/teams" + team.id} icon={team.logo} />
                    ))}
                </div>
                <div className={`${competitions.length ? "block" : "hidden"}`}>
                    {competitions.map(({ league }) => (
                        <NavButton key={league.id} title={league.name} value={"/teams" + league.id} icon={league.logo} />
                    ))}
                </div>
                <button ref={buttonRef} className="text-main bg-slate-100 border-4 border-border text-foreground p-2 rounded-md" onClick={handleClick}>+</button>
                {createPortal(<div className={`bg-slate-100 border-main border-2 text-foreground p-2 rounded-md ${showAdd ? "block" : "hidden"} top-0 left-0  absolute z-10`}>hello</div>, document.body)}
            </nav>
        </ProfileProvider>

    )
}