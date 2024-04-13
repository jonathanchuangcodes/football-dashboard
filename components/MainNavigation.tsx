'use client'

import { CgHomeAlt } from "react-icons/cg";
import { IconContext } from "react-icons";
import { useProfile, ProfileProvider } from "@/contexts/ProfileContext";
import { useRef, useState } from "react";
import NavButton from "@/components/NavButton";

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
            <IconContext.Provider value={{ color: "#092771", size: "2rem" }}>

                <nav className="row-span-1 absolute top-0 left-0 flex-1 h-full flex flex-col gap-20 items-left p-4 ">
                    <NavButton title={"Home"} icon={<CgHomeAlt />} value={"/"} />

                    {/* <div className={`${teams.length ? "block" : "hidden"}`}>
                        {teams.map(({ team }) => (
                            <NavButton key={team.id} title={team.name} value={"/teams/" + team.id} src={team.logo} />
                        ))}
                    </div>
                    <div className={`${competitions.length ? "block" : "hidden"}`}>
                        {competitions.map(({ league }) => (
                            <NavButton key={league.id} title={league.name} value={"/competitions/" + league.id} src={league.logo} />
                        ))}
                    </div> */}
                    {/* <button ref={buttonRef} className="text-main bg-slate-100 border-4 border-border text-foreground p-2 rounded-md" onClick={handleClick}>+</button>
                    {createPortal(<div className={`bg-slate-100 border-main border-2 text-foreground p-2 rounded-md h-full w-full ${showAdd ? "block" : "hidden"} top-0 left-0  absolute z-10`}>hello</div>, document.body)} */}
                </nav>
            </IconContext.Provider>
        </ProfileProvider>
    )
}