import { get } from "@/api/football";
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export default async function CompetitionPage({ params }: { params: { id: string } }) {
    let response = await get("/leagues", { id: params.id });
    let data = await response.json();
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser();
    const isSignedIn = user !== null
    const favoritedFlag = !user?.user_metadata?.competitions?.includes(params.id);
    const handleOnClick = async () => {
        'use server'

        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const { data: { user } } = await supabase.auth.getUser()
        const metadata = user?.user_metadata
        const competitions = metadata?.competitions

        const { error } = await supabase.auth.updateUser({
            data: competitions ? { ...metadata, competitions: [...metadata?.competitions, Number(params.id)] } : { ...metadata, competitions: [Number(params.id)] }
        })

        if (error) {
            console.log(error)
        }
        return
    }
    return (
        <div>
            {isSignedIn && favoritedFlag && <form action={handleOnClick}>
                <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">Add Competition</button>
            </form>}
            <pre className="text-black">{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}