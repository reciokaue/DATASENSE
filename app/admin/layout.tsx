import { ReactNode } from 'react'

import { AdminNav } from '@/components/admin-nav'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AdminNav />
      <div className="container  mx-auto flex max-w-6xl flex-col">
        {children}
      </div>
    </div>
  )
}
