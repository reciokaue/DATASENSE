'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

import { FormCard } from '@/src/components/form-card'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { useTopics } from '@/src/contexts/topics'
import { FormDTO } from '@/src/DTOs/form'
import { api } from '@/src/lib/api'

import { searchForms, userForms } from '../../../dashboard/querys'

export default function ImportingModelsPage() {
  const [selectedForm, setSelectedForm] = useState<FormDTO>()
  const [search, setSearch] = useState('')

  const { topics } = useTopics()

  const { data: forms } = useQuery(userForms())
  const { data: queryForms, refetch } = useQuery(searchForms(search, true))

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
    <div className="relative mb-10 flex w-full flex-col pb-20">
      <header className="flex items-center justify-between py-4">
        <h1 className="text-3xl font-semibold text-primary">Modelos</h1>
        <Link href="/form/new">
          <Button variant="ghost" size="icon">
            <ChevronLeft />
          </Button>
        </Link>
      </header>
      <div className="flex flex-wrap gap-2">
        {topics
          ? [{ id: 0, name: 'Todas' }, ...topics].map((topic) => (
              <Badge
                variant={topic.name === 'Todas' ? 'secondary' : 'default'}
                key={topic.id}
              >
                {topic.name}
              </Badge>
            ))
          : null}
      </div>
      <div className="relative mt-4 w-full">
        <span className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center">
          <Search className="text-primary/60" size={20} />
        </span>
        <Input
          type="email"
          placeholder="Procurar..."
          className="w-full pl-10"
          onChange={onChange}
          value={search}
        />
      </div>

      <section className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {(search ? queryForms : forms)?.map((form: FormDTO) => (
          <FormCard
            data={form}
            key={form.id}
            onClick={() => setSelectedForm(form)}
            aria-selected={selectedForm?.id === form.id}
          />
        ))}
      </section>
      <footer className="screen:px-0 fixed bottom-0 left-0 right-0 bg-primary p-10">
        <Suspense>
          <CopyModel selectedFormId={selectedForm?.id} />
        </Suspense>
      </footer>
    </div>
  )
}

function CopyModel({ selectedFormId }: { selectedFormId?: number }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const name = searchParams.get('name')
  const about = searchParams.get('about')
  const formTopics = searchParams?.get('topics')?.split(',')

  const data = { name, about, topics: formTopics }

  async function createNewForm() {
    if (!selectedFormId) return

    console.log(selectedFormId)
    const response = await api.post(`/form?id=${selectedFormId}/id`, {
      ...data,
      topics: data.topics ? data?.topics.map((topic) => Number(topic)) : [],
    })
    router.push(`/form/${response.data.id}/id`)
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl items-end justify-end">
      <Button
        disabled={!selectedFormId}
        variant="secondary"
        className="w-fit px-10"
        onClick={createNewForm}
      >
        Copiar formulário
      </Button>
    </div>
  )
}
