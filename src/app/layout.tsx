import '../utils/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Providers } from '@/src/contexts/providers'

import { Navbar } from '../components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DATASENSE',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="mx-auto flex h-screen w-full flex-col ">
            <Navbar />
            <main className="mx-auto flex h-full w-full max-w-screen-xl flex-col p-6">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
