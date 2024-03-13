import { ReactNode } from 'react'

import { Navbar } from '@/components/navbar'

const routes = [
  { title: 'Documentation', href: '/docs', disabled: true },
  { title: 'Tópicos', href: '/admin/topic' },
  { title: 'Tipos de questão', href: '/admin/question-types', disabled: true },
  { title: 'Support', href: '/support', disabled: true },
  { title: 'Dashboard', href: '/dashboard' },
]

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar routes={routes} />
      <div className="container  mx-auto flex max-w-6xl flex-col">
        {children}
      </div>
    </div>
  )
}
