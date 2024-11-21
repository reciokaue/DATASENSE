'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function FormLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { formId: string }
}>) {
  const pathname = usePathname().split('/').pop()

  return (
    <>
      <nav className="sticky top-10 z-10 mx-auto mb-10 inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
        <Link
          href={`/form/${params.formId}/`}
          aria-selected={pathname === params.formId}
          className="inline-flex w-32 items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:bg-background aria-selected:text-foreground aria-selected:shadow"
        >
          Questões
        </Link>
        <Link
          aria-selected={pathname === 'responses'}
          href={`/form/${params.formId}/responses`}
          className="inline-flex w-32 items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:bg-background aria-selected:text-foreground aria-selected:shadow"
        >
          Respostas
        </Link>
        <Link
          aria-selected={pathname === 'config'}
          href={`/form/${params.formId}/config`}
          className="inline-flex w-32 items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:bg-background aria-selected:text-foreground aria-selected:shadow"
        >
          Configurações
        </Link>
      </nav>
      <section className="mt-2 flex w-full flex-col">{children}</section>
    </>
  )
}
