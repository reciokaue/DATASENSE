import { ReactNode } from 'react'

import { Nav } from '@/components/nav'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="screen:px-0 mx-auto flex max-w-6xl flex-col px-10">
      <Nav />
      {children}
    </div>
  )
}
