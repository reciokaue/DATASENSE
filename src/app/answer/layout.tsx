'use client'

import { ReactNode } from 'react'

import { Button } from '@/src/components/ui/button'
import { useQueryParams } from '@/src/utils/useQueryParams'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  // const { setQueryParam, searchParams } = useQueryParams()

  // function nextPage() {
  //   const step = searchParams.get('step') || 0
  //   setQueryParam('step', +step + 1)
  // }

  return (
    // <main className="mx-auto flex h-screen max-w-xl flex-col overflow-hidden">
    //   {children}
    // <footer className="flex w-full flex-col space-y-4 p-8">
    //   <h2 className="invisible text-base font-medium">Obrigado</h2>
    //   <Button onClick={nextPage} className="h-14 text-xl">
    //     Continuar
    //   </Button>
    // </footer>
    // </main>
    children
  )
}
