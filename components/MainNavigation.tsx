import { CgHomeAlt } from "react-icons/cg";
import NavButton from "@/components/NavButton";
import TeamLinkList from "./TeamLinkList";
import CompetitionLinkList from "./CompetitionLinkList";

export default function MainNavigation() {

    return (
        <nav className="row-span-1 absolute top-0 left-0 flex-1 h-full flex flex-col gap-20 items-left p-4 ">
            <NavButton title={"Home"} icon={<CgHomeAlt />} value={"/"} />

            <TeamLinkList />
            <CompetitionLinkList />
            {/* <div className={`${competitions.length ? "block" : "hidden"}`}>
                        {competitionsInfo.map(({ league }) => (
                            <NavButton key={league.id} title={league.name} value={"/competitions/" + league.id} src={league.logo} />
                        ))}
                    </div> */}
            {/* <button ref={buttonRef} className="text-main bg-slate-100 border-4 border-border text-foreground p-2 rounded-md" onClick={handleClick}>+</button>
                    {createPortal(<div className={`bg-slate-100 border-main border-2 text-foreground p-2 rounded-md h-full w-full ${showAdd ? "block" : "hidden"} top-0 left-0  absolute z-10`}>hello</div>, document.body)} */}
        </nav>
    )
}