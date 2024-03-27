'use client'

import { useQuery } from '@tanstack/react-query'
import { Plus, Search } from 'lucide-react'
import Link from 'next/link'

import { FormCard } from '@/components/form-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'

export default function FormsPage() {
  const { data: topics } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      const response = await api.get(`/topics`, {
        params: { pageSize: 100 },
      })

      return response.data
    },
  })

  const { data: forms } = useQuery({
    queryKey: ['public-forms'],
    queryFn: async () => {
      const response = await api.get(`/forms`, {
        params: { pageSize: 6, isPublic: true },
      })
      return response.data
    },
  })

  return (
    <div className="flex flex-1 flex-col pt-2">
      <header className="flex items-center justify-between py-2">
        <h1 className="text-3xl font-semibold text-primary">
          Formulários Populares
        </h1>
        <Link href="/admin/forms/create">
          <Button size="sm" className="text-xs">
            Add <Plus size={10} />
          </Button>
        </Link>
      </header>
      <section>
        <div className="mt-2 flex flex-wrap gap-1">
          {topics &&
            ['Todas', ...topics, '...'].map((tag) => (
              <Badge
                variant={['Todas', '...'].includes(tag) ? 'default' : 'ghost'}
                key={`form-${tag}`}
              >
                {tag}
              </Badge>
            ))}
        </div>
        <div className="relative mt-4 w-full">
          <span className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center">
            <Search className="text-primary/60" size={20} />
          </span>
          <Input
            type="email"
            placeholder="Procurar..."
            className="w-full pl-10"
          />
        </div>
        <h1 className="mt-8 text-xl font-semibold">Todas</h1>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {forms &&
            forms.map((form: any) => <FormCard data={form} key={form.id} />)}
        </div>
      </section>
    </div>
  )
}
