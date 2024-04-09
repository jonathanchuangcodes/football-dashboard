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
        <nav className="h-20 flex-initial p-4 w-full flex justify-between border-b border-b-foreground/10">
            <div className="w-full flex justify-between items-center text-sm">
                    <Search />
                {isSupabaseConnected && <AuthButton />}
            </div>
        </nav>
    );
}

export default TopNavigation;