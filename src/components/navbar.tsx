'use client'

import { Book, Home, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

import { useAuth } from '../contexts/Auth'
import { cn } from '../lib/utils'
import { ProfilePopover } from './profile-popover'

interface NavLinkProps {
  href: string
  icon: ReactNode
  text: string
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, text }) => {
  const pathname = usePathname()
  const path = pathname?.split('/')[1]
  const isActive = path === href.slice(1)

  return (
    <li>
      <Link
        href={href}
        className={cn(
          'flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-150 ease-in-out',
          isActive
            ? 'bg-primary-100 font-bold text-primary'
            : 'font-medium text-gray-700 hover:bg-gray-100  hover:text-gray-900',
        )}
      >
        {icon}
        <span className="ml-2">{text}</span>
      </Link>
    </li>
  )
}

export function Navbar() {
  const { user } = useAuth()

  const authLinks = [
    { href: '/home', icon: <Home />, text: 'Home' },
    { href: '/community', icon: <Users />, text: 'Community' },
    { href: '/blog', icon: <Book />, text: 'Blog' },
  ]
  const links = [
    { href: '/community', icon: <Users />, text: 'Community' },
    { href: '/blog', icon: <Book />, text: 'Blog' },
  ]

  return (
    <nav className="z-20 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-10">
          <div className="flex w-full items-center gap-10">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              DATASENSE
            </Link>
            <ul className="flex space-x-4">
              {user?.id
                ? authLinks.map((link) => <NavLink key={link.href} {...link} />)
                : links.map((link) => <NavLink key={link.href} {...link} />)}
            </ul>
          </div>
          <ProfilePopover />
        </div>
      </div>
    </nav>
  )
}
