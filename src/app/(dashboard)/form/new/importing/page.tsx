'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

import { FormCard } from '@/src/components/form-card'
import { Button } from '@/src/components/ui/button'
import { FormDTO } from '@/src/DTOs/form'
import { api } from '@/src/lib/api'

import { userForms } from '../../../dashboard/querys'

export default function ImportingQuestionsPage() {
  const [selectedForm, setSelectedForm] = useState<FormDTO>()
  const { data: forms } = useQuery(userForms())

  return (
    <div className="relative mb-10 flex w-full flex-col pb-20">
      <nav className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold leading-relaxed">
            Importe perguntas de seus formulários
          </h1>
          <p className="max-w-[500px] font-medium leading-relaxed">
            selecione o formulário que deseja copiar as perguntas e clique em
            [Copiar formulário] para criar um novo formulário a partir de um
            antigo
          </p>
        </div>
        <Link href="/form/new">
          <Button variant="ghost" size="icon">
            <ChevronLeft />
          </Button>
        </Link>
      </nav>

      <section className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {forms &&
          forms?.map((form: FormDTO) => (
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
          <CopyForm selectedFormId={selectedForm?.id} />
        </Suspense>
      </footer>
    </div>
  )
}
function CopyForm({ selectedFormId }: { selectedFormId?: number }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const name = searchParams.get('name')
  const about = searchParams.get('about')
  const topics = searchParams?.get('topics')?.split(',')

  const data = { name, about, topics }

  async function createNewForm() {
    if (!selectedFormId) return
    console.log(selectedFormId, data)

    const response = await api.post(`/form?id=${selectedFormId}`, {
      ...data,
      topics: data.topics ? data?.topics.map((topic) => Number(topic)) : [],
    })

    router.push(`/form/${response.data.id}/edit`)
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
