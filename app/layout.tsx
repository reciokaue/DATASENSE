import '../styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Providers } from '@/components/providers'
import { api } from '@/lib/api'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Feedback-view',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const token = cookieStore.get('@feedback.view:auth-token')

  if (!token) {
    redirect('./login')
  } else {
    api.defaults.headers.common.Authorization = `Bearer ${token.value}`
  }

  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  )
}
