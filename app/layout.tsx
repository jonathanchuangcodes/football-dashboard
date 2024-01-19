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
      <body className="bg-background text-foreground">
        <TopNavigation />
        <MainNavigation>

        </MainNavigation>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>

      </body>
    </html>
  )
}
