'use client'

import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { z } from 'zod'

import { getForms } from '@/src/api/get-forms'
import { Pagination } from '@/src/components/pagination'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Skeleton } from '@/src/components/ui/skeleton'
import { useAuth } from '@/src/contexts/Auth'
import { debounce } from '@/src/utils/debounce'

import { PageHeader, PageWrapper } from '../layout'
import { Card } from './card'

export default function Dashboard() {
  const { logout } = useAuth()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const search = z.string().parse(searchParams.get('search') ?? '')

  const { data: result, isLoading } = useQuery({
    queryKey: ['user-forms', search, pageIndex],
    queryFn: () => getForms({ query: search, page: pageIndex, pageSize: 1 }),
  })

  const onChange = (event: any) => {
    debouncedSearchData(event.target.value)
  }

  const debouncedSearchData = useCallback(
    debounce((data) => {
      if (search === '') router.push(pathname)
      else router.push(pathname + '?search=' + data)
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
            : result && result?.forms?.length > 0
              ? result.forms.map((form) => (
                  <Link
                    key={form.id}
                    href={`/form/${form.id}/editing`}
                    className="group"
                  >
                    <Card form={form} />
                  </Link>
                ))
              : null}
        </div>
        <div className="flex h-full items-start justify-center pt-40">
          {!isLoading && (result?.forms?.length === 0 || search !== '') ? (
            <p>
              {search === ''
                ? 'Você ainda não possui nenhum formulário'
                : 'Nenhum formulário encontrado'}
            </p>
          ) : null}
        </div>
        <footer className="mt-auto flex w-full">
          {result && (
            <Pagination
              pageIndex={result.meta.page}
              totalCount={result.meta.totalCount}
              perPage={result.meta.pageSize}
            />
          )}
        </footer>
      </PageWrapper>
    </>
  )
}
