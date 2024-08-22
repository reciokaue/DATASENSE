'use client'
/* eslint-disable jsx-a11y/role-supports-aria-props */
// interface SidebarProps {}

import { Book, LogOut, PieChart, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const links = [
  { title: 'Dashboard', path: 'dashboard', icon: Book },
  { title: 'Analytics', path: 'analytics', icon: PieChart },
  { title: 'Configurações', path: 'settings', icon: Settings },
  { title: 'Forms', path: 'forms', icon: Book },
  { title: 'Logout', path: 'login', icon: LogOut },
]

export function Sidebar() {
  const pathname = usePathname()
  const path = pathname.split('/')[1]

  return (
    <aside className="flex w-80 flex-col  bg-white pl-3 pr-6">
      <header className="flex h-24 w-full items-center px-6 ">
        <h1 className=" text-2xl font-bold">DATASENSE</h1>
        {JSON.stringify(pathname)}
      </header>
      <section className="flex flex-col space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = path === link.path

          return (
            <Link href={link.path} key={link.path}>
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
