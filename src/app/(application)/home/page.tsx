'use client'

import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import { getForms } from '@/src/api/get-forms'
import { Button } from '@/src/components/ui/button'
import { Skeleton } from '@/src/components/ui/skeleton'

import { HomeCard } from './home-card'

export default function HomePage() {
  const { data: result, isLoading } = useQuery({
    queryKey: ['user-forms'],
    queryFn: () => getForms({ pageSize: 20 }),
  })

  return (
    <>
      <div className="flex w-full items-center space-x-3">
        <h1>Formulários</h1>
        <Button link="/forms/new" type="submit" className="gap-2">
          New
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
        {!isLoading && result
          ? result?.forms.map((form) => (
              <Link key={form.id} href={`/forms/${form.id}`} className="group">
                <HomeCard form={form} />
              </Link>
            ))
          : [0, 1, 2].map((i) => (
              <Skeleton key={`skeleton-${i}`} className="h-52 w-full" />
            ))}
      </div>
      <div className="flex h-full items-start justify-center pt-40">
        {!isLoading && <p>Você ainda não possui nenhum formulário</p>}
      </div>
    </>
  )
}
