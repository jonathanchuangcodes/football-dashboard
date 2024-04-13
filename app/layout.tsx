import './globals.css'
import { GeistSans } from 'geist/font/sans'
import MainNavigation from '@/components/MainNavigation'
import TopNavigation from '@/components/TopNavigation'
import { ProfileProvider } from '@/contexts/ProfileContext'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Soccer Dashboard',
  description: 'Dashboard for following teams and competitions.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={`${GeistSans.className}`}>
      <ProfileProvider>
        <body className="grid-cols-2 max-h-screen bg-gray-900 text-foreground ml-24">
          <MainNavigation />
          <div className='flex flex-col max-h-screen row-span-11 grid-rows-3'>
            <TopNavigation />
            <main className="h-[calc(100vh-10rem)] flex flex-row gap-8 justify-center mr-4 ml-4">
              {children}
            </main>
            <footer className="h-20 flex-initial text-black shrink w-full border-t border-t-foreground/10 p-4 flex justify-center align-middle text-center text-xs">
              <p className='text-center'>
                Powered by{' '}
                <a
                  href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noopener noreferrer"
                >
                  Supabase
                </a>
              </p>
            </footer>
          </div>
        </body>
      </ProfileProvider>
    </html>
  )
}
