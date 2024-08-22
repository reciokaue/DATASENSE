import { ReactNode } from 'react'

import { Sidebar } from '@/src/components/sidebar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex h-screen w-full flex-col ">
      <div className="flex h-full w-full bg-primary-foreground">
        <Sidebar />
        <div className="flex h-full w-full flex-col"> {children}</div>
      </div>
    </main>
  )
}

export function PageHeader({ children }: { children: ReactNode }) {
  return (
    <header className="flex h-24 w-full items-center bg-white px-6">
      {children}
    </header>
  )
}

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col p-6">
      {children}
    </div>
  )
}
