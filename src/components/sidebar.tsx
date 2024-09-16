'use client'
/* eslint-disable jsx-a11y/role-supports-aria-props */

import { Book, PieChart, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { title: 'Dashboard', path: '/', icon: Book },
  { title: 'Analytics', path: '/analytics', icon: PieChart },
  { title: 'Configurações', path: '/settings', icon: Settings },
  { title: 'Edição', path: '/editing', icon: Book },
]

export function Sidebar({ formId }: { formId: string }) {
  const pathname = usePathname()
  const type = pathname.split('/').pop()

  return (
    <aside className="flex min-w-48 flex-col  bg-white pr-3">
      <section className="flex flex-col space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive =
            (link.path === '/' && type === formId) ||
            type === link.path.slice(1)
          const path = `/forms/${formId}${link.path}`

          return (
            <Link href={path} key={link.path}>
              <li
                className="flex w-full cursor-pointer items-center gap-2 rounded-md p-3 font-medium text-primary/70 transition-colors hover:bg-primary/10 aria-selected:bg-primary aria-selected:text-white"
                aria-selected={isActive}
              >
                <Icon className="size-4" />
                {link.title}
              </li>
            </Link>
          )
        })}
      </section>
    </aside>
  )
}
