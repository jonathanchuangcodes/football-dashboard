import AuthButton from '../components/AuthButton'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Search from '@/components/Search'

interface TopNavigationProps {
    children?: React.ReactNode;
}

export const TopNavigation: React.FC<TopNavigationProps> = () => {
    const cookieStore = cookies()

    const canInitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
        try {
            createClient(cookieStore)
            return true;
        } catch (e) {
            return false;
        }
    }
    let isSupabaseConnected = canInitSupabaseClient();
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                <div className='flex flex-row gap-8'>
                    <button>Home</button>
                    <Search />
                </div>
                {isSupabaseConnected && <AuthButton />}
            </div>
        </nav>
    );
}

export default TopNavigation;