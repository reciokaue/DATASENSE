'use client'

import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import { getForms } from '@/src/api/get-forms'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Skeleton } from '@/src/components/ui/skeleton'
import { useAuth } from '@/src/contexts/Auth'
import { debounce } from '@/src/utils/debounce'

import { PageHeader, PageWrapper } from '../layout'
import { Card } from './card'

export default function Dashboard() {
  const [search, setSearch] = useState('')
  const { logout } = useAuth()

  const { data: forms, isLoading } = useQuery({
    queryKey: ['user-forms', search],
    queryFn: () => getForms({ query: search }),
  })
  const onChange = (event: any) => {
    debouncedSearchData(event.target.value)
  }

  const debouncedSearchData = useCallback(
    debounce((data) => {
      setSearch(data)
    }, 500),
    [],
  )

  return (
    <>
      <PageHeader>
        Aqui é o header{' '}
        <Button onClick={logout} className="ml-auto">
          Logout
        </Button>
      </PageHeader>
      <PageWrapper>
        <div className="flex w-full items-center space-x-3">
          <div className="w-full">
            <Input
              type="email"
              placeholder="Procurar..."
              className="w-full"
              onChange={onChange}
              // value={search}
            />
          </div>
          <Button link="/form/new" type="submit" className="gap-2">
            New
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {isLoading
            ? [0, 1, 2].map((i) => (
                <Skeleton key={`skeleton-${i}`} className="h-52 w-full" />
              ))
            : forms &&
              forms.map((form) => (
                <Link
                  key={form.id}
                  href={`/form/${form.id}/editing`}
                  className="group"
                >
                  <Card form={form} />
                </Link>
              ))}
        </div>
        <div className="flex h-full items-start justify-center pt-40">
          {!isLoading && search === '' ? (
            <p>Voce ainda não possui nenhum formulário</p>
          ) : (
            <p>Nenhum formulário encontrado</p>
          )}
        </div>
      </PageWrapper>
    </>
  )
}
