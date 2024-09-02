'use client'

import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getForms } from '@/src/api/get-forms'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'

import { PageHeader, PageWrapper } from '../layout'
import { Card } from './card'

export default function Dashboard() {
  const [search, setSearch] = useState('')

  const { data: forms } = useQuery({
    queryKey: ['user-forms'],
    queryFn: () => getForms({}),
  })
  const { data: queryForms, refetch } = useQuery({
    queryKey: ['query-user-forms'],
    queryFn: () => getForms({ query: search }),
    enabled: false,
  })

  const onChange = (event: any) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    if (search) {
      const timeoutId = setTimeout(() => {
        refetch()
      }, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [refetch, search])

  return (
    <>
      <PageHeader>Aqui é o header</PageHeader>
      <PageWrapper>
        <div className="flex w-full items-center space-x-3">
          <div className="w-full">
            <Input
              type="email"
              placeholder="Procurar..."
              className="w-full"
              onChange={onChange}
              value={search}
            />
          </div>
          <Button link="/form/new" type="submit" className="gap-2">
            New
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {(search ? queryForms : forms)?.map((form) => (
            <Link
              key={form.id}
              href={`/form/${form.id}/editing`}
              className="group"
            >
              <Card form={form} />
            </Link>
          ))}
        </div>
      </PageWrapper>
    </>
  )
}
