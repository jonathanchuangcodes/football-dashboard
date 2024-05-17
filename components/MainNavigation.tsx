import { CgHomeAlt } from "react-icons/cg";
import CompetitionLinkList from "./CompetitionLinkList";
import NavButton from "@/components/NavButton";
import TeamLinkList from "./TeamLinkList";
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import AddButton from "./AddButton";

export default async function MainNavigation() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser();
    const isSignedIn = user !== null
    const competitions = user?.user_metadata?.competitions
    const teams = user?.user_metadata?.teams

    const handleOnClick = async (id: number) => {
        'use server'

        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const { data: { user } } = await supabase.auth.getUser()
        const metadata = user?.user_metadata
        const competitions = metadata?.competitions

        const { error } = await supabase.auth.updateUser({
            data: competitions ? { ...metadata, competitions: [...metadata?.competitions, Number(id)] } : { ...metadata, competitions: [Number(id)] }
        })

        if (error) {
            console.log(error)
        }
        return
    }
    return (
        <nav className="row-span-1 absolute top-0 left-0 flex-1 h-full flex flex-col gap-2 items-left p-4 w-28">
            <NavButton title={"Home"} icon={<CgHomeAlt />} value={"/"} />
            <TeamLinkList />
            <CompetitionLinkList />
            {isSignedIn && <AddButton onClick={handleOnClick} competitions={competitions} teams={teams} />}
        </nav>
    )
}