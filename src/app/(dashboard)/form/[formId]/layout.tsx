'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { Button } from '@/src/components/ui/button'

export interface PageFormSlugProps {
  params: { formId: string }
}
interface FormLayoutProps extends PageFormSlugProps {
  children?: ReactNode
}

export default async function FormLayout({
  params,
  children,
}: FormLayoutProps) {
  const { formId } = params
  const tabs = [
    { title: 'Questões', path: `/form/${formId}/edit` },
    { title: 'Respostas', path: `/form/${formId}/responses` },
    { title: 'Configurações', path: `/form/${formId}/config` },
  ]
  const pathname = usePathname()

  return (
    <div>
      <nav className="mx-auto -mt-5 mb-4 flex w-full max-w-4xl items-center justify-between">
        <Link href="/dashboard" className="self-end">
          <Button variant="ghost" size="icon">
            <ChevronLeft />
          </Button>
        </Link>
        <div className="flex items-center justify-center gap-4">
          {tabs.map((tab) => (
            <Link
              key={tab.title}
              href={tab.path}
              className={
                'min-w-20 text-lg font-semibold transition-colors hover:text-primary/80 sm:text-sm ' +
                (tab.path === pathname
                  ? 'font-bold text-primary hover:text-primary'
                  : 'text-primary/60')
              }
            >
              {tab.title}
            </Link>
          ))}
        </div>
        <Button variant="ghost" className="invisible" size="icon">
          <ChevronLeft />
        </Button>
      </nav>
      <main>{children}</main>
    </div>
  )
}
