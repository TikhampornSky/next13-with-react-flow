import { ScreenContextProvider } from '@/components/Playground/context/ScreenContext'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Explore Flow',
  description: 'Explored by Tontan',
}

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScreenContextProvider>
          {children}
        </ScreenContextProvider>
      </body>
    </html>
  )
}
