'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { getForms } from '@/src/api/get-forms'
import { NewFormButton } from '@/src/components/new-form'
import { Skeleton } from '@/src/components/ui/skeleton'

import { HomeCard } from './home-card'

export default function HomePage() {
  const { data: result, isLoading } = useQuery({
    queryKey: ['user-forms'],
    queryFn: () => getForms({ pageSize: 20 }),
  })

  return (
    <>
      <div className="flex w-full items-center justify-between space-x-3">
        <h1 className="text-2xl font-semibold">Formulários</h1>
        <NewFormButton />
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
      {!isLoading && result?.forms.length === 0 && (
        <div className="flex h-full items-start justify-center pt-40">
          <p>Você ainda não possui nenhum formulário</p>
        </div>
      )}
    </>
  )
}
