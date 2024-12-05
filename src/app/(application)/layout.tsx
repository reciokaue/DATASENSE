'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Navbar } from '@/components/navbar'
import { useAuth } from '@/contexts/useAuth'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, status } = useAuth()
  const { push } = useRouter()

  useEffect(() => {
    if (!user) {
      push('/')
    }
  }, [user, push])

  if (status !== 'signIn') return null

  return (
    <div className="mx-auto flex h-screen w-full flex-col overflow-x-hidden ">
      <Navbar />
      <main className="relative mx-auto flex h-full w-full max-w-screen-xl flex-col p-6">
        {children}
      </main>
    </div>
  )
}
