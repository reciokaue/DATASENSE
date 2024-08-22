import { ReactNode } from 'react'

import { Sidebar } from '@/src/components/sidebar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex h-screen w-full flex-col ">
      <header className="flex h-20 w-full items-center px-6 ">
        <h1 className=" text-2xl font-bold">DATASENSE</h1>
      </header>
      <div className="flex h-full w-full bg-primary/5">
        <Sidebar />
        <div className="mx-auto  flex h-full w-full max-w-screen-xl flex-col rounded-tl-md  p-6 ">
          {children}
        </div>
      </div>
    </main>
  )
}
