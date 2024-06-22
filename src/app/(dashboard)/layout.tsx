import { ReactNode } from 'react'

import { Navbar } from '@/src/components/navbar'

const routes = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Admin', href: '/admin/topics' },
]

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar routes={routes} />
      <div className="screen:px-0 mx-auto flex w-full max-w-6xl flex-col p-10">
        {children}
      </div>
    </>
  )
}
