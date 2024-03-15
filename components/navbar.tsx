'use client'

import { BookAudio } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'

import { cn } from '@/lib/utils'

interface NavbarProps {
  routes?: {
    title: string
    href: string
    disabled?: boolean
  }[]
}

export function Navbar({ routes }: NavbarProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center space-x-4 px-10">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <BookAudio className="h-4 w-4" />
            <span className="inline-block font-bold">DATASENSE</span>
          </Link>
          <nav className="flex gap-6">
            {routes?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? '#' : item.href}
                className={cn(
                  'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                  item.href === pathname
                    ? 'font-bold text-primary/80'
                    : 'text-foreground/60',
                  item.disabled && 'cursor-not-allowed opacity-80',
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
