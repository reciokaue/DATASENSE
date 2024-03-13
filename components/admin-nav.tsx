'use client'

import { BookAudio } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import * as React from 'react'

import { cn } from '@/lib/utils'

const routes = [
  {
    title: 'Documentation',
    href: '/docs',
  },
  {
    title: 'Tópicos',
    href: '/admin/topics',
  },
  {
    title: 'Tipos de questão',
    href: '/admin/question-types',
  },
  {
    title: 'Support',
    href: '/support',
    disabled: true,
  },
]

export function AdminNav() {
  const segment = useSelectedLayoutSegment()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <BookAudio className="h-4 w-4" />
            <span className="inline-block font-bold">FeedbackView</span>
          </Link>
          <nav className="flex gap-6">
            {routes?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? '#' : item.href}
                className={cn(
                  'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                  item.href.startsWith(`/${segment}`)
                    ? 'text-foreground'
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
