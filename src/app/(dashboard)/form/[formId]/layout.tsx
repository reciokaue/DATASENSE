// import Link from 'next/link'
import { ReactNode } from 'react'

export interface FormLayoutProps {
  params: { formId: string }
  children: ReactNode
}

export default async function FormLayout({
  params,
  children,
}: FormLayoutProps) {
  // const { formId } = params
  // const tabs = [
  //   { title: 'Respostas', path: `/form/${formId}/responses` },
  //   { title: 'Questões', path: `/form/${formId}/questions` },
  //   { title: 'Configurações', path: `/form/${formId}/config` },
  // ]

  return children
  // <div>
  //   <nav className="-mt-5 flex w-full justify-center gap-4">
  //     {tabs.map((tab) => (
  //       <Link
  //         key={tab.title}
  //         href={tab.path}
  //         className="min-w-20 text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
  //       >
  //         {tab.title}
  //       </Link>
  //     ))}
  //   </nav>
  //   <main>{children}</main>
  // </div>
}
