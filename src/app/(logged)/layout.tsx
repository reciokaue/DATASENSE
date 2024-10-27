import { HTMLAttributes, ReactNode } from 'react'

import { Navbar } from '@/src/components/navbar'
// import { Sidebar } from '@/src/components/sidebar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex h-screen w-full flex-col ">
      <Navbar />
      <div className="flex h-full w-full flex-col">{children}</div>
      {/* <div className="flex h-full w-full bg-primary-foreground">
        <Sidebar />
      </div> */}
    </main>
  )
}

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function PageHeader({ children, ...rest }: WrapperProps) {
  return (
    <header {...rest} className="flex h-24 w-full items-center bg-white px-6">
      {children}
    </header>
  )
}

export function PageWrapper({ children, ...rest }: WrapperProps) {
  return (
    <div
      {...rest}
      className={
        'mx-auto flex h-full w-full max-w-screen-xl flex-col p-6 ' +
        rest.className
      }
    >
      {children}
    </div>
  )
}
