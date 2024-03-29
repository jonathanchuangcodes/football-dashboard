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
    <html lang="en" className={GeistSans.className}>
      <body className="bg-slate-100 text-foreground flex">
        <MainNavigation />

        <div className='flex flex-col w-full'>
        <TopNavigation />
        <main className="flex flex-col items-center mr-4 ml-4">
          {children}
        </main>
        </div>


      </body>
    </html>
  )
}
