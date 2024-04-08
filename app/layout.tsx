import { GeistSans } from 'geist/font/sans'
import './globals.css'
import MainNavigation from '@/components/MainNavigation'
import TopNavigation from '@/components/TopNavigation'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Soccer Dashboard',
  description: 'Dashboard for following teams and competitions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.className} h-screen`}>
      <body className="bg-slate-100 text-foreground h-screen ml-24">
        <MainNavigation />
        <TopNavigation />
        <main className="max-h-fit mr-4 ml-4">
          {children}
        </main>
        <footer className="text-black w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>
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
      </body>
    </html>
  )
}
