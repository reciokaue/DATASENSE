'use client'

import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

import { FormCard } from '@/src/components/form-card'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'

import { searchForms, userForms } from './querys'

export default function Dashboard() {
  const [search, setSearch] = useState('')

  const { data: forms } = useQuery(userForms())
  const { data: queryForms, refetch } = useQuery(searchForms(search))

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
        {(search ? queryForms : forms)?.map((form: any) => (
          <FormCard data={form} key={form.id} />
        ))}
      </div>
    </>
  )
}
