'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export interface FormLayoutProps {
  params: { formId: string }
  children: ReactNode
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
      <nav className="-mt-5 mb-4 flex w-full justify-center gap-4">
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
      </nav>
      <main>{children}</main>
    </div>
  )
}
