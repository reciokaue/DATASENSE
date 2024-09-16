'use client'

import { useQuery } from '@tanstack/react-query'
import { Frown } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { z } from 'zod'

import { copyForm } from '@/src/api/copy-form'
import { getForms } from '@/src/api/get-forms'
import { Pagination } from '@/src/components/pagination'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { debounce } from '@/src/utils/debounce'

import { PageWrapper } from '../../../layout'
import { Card } from '../models/card'

export default function Page({ params }: { params: { id: string } }) {
  const [search, setSearch] = useState('')
  const [selectedFormId, setSelectedFormId] = useState<number>()

  const router = useRouter()
  const searchParams = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result, refetch } = useQuery({
    queryKey: ['user-forms', search, pageIndex],
    queryFn: () => getForms({ query: search, page: pageIndex }),
  })

  const searchNewForm = useCallback((value: string) => {
    debounce(refetch, 1000)
    setSearch(value)
  }, [])

  async function handleCopyForm() {
    if (!params.id || !selectedFormId) return

    await copyForm({
      formId: +params.id,
      modelId: selectedFormId,
    })
  }

  function handleStartWithModel() {
    router.push(`/forms/${params.id}/models`)
  }
  function handleStartFromZero() {
    router.push(`/forms/${params.id}/editing`)
  }

  return (
    <PageWrapper className="space-y-5 pt-20">
      <header className=" space-y-1">
        <h1 className="text-lg font-semibold leading-none tracking-tight">
          Selecionar formulário
        </h1>
        <p className="text-sm text-muted-foreground">
          Ao selecionar um formulário todas as questões serão copiadas para seu
          novo formulário
        </p>
      </header>
      <Input
        type="email"
        placeholder="Procurar..."
        className="w-full"
        onChange={(e) => searchNewForm(e.target.value)}
        value={search}
      />
      {result && result.forms?.length > 0 ? (
        <div className="mt-8 grid h-full flex-1 grid-cols-1 gap-3 md:grid-cols-3">
          {result.forms?.map((form) => (
            <Card
              key={form.id}
              form={form}
              onClick={() => setSelectedFormId(form.id)}
              aria-selected={selectedFormId === form.id}
              className="aria-selected:brightness-90"
            />
          ))}
        </div>
      ) : (
        <div className="flex h-full flex-1  flex-col items-center justify-center gap-2 text-muted-foreground">
          <Frown className="size-8 " />
          <p className="max-w-80 text-center text-sm">
            Nenhum formulário foi encontrado, busque por um modelo ou comece
            agora seu novo formulário do zero
          </p>
        </div>
      )}
      <div className="mt-auto flex w-full">
        {result && (
          <Pagination
            pageIndex={result.meta.page}
            totalCount={result.meta.totalCount}
            perPage={result.meta.pageSize}
          />
        )}
      </div>
      <footer className="flex items-center justify-end gap-3">
        <Button variant="secondary" onClick={handleStartFromZero}>
          Continuar do zero
        </Button>
        <Button variant="secondary" onClick={handleStartWithModel}>
          Copiar modelo
        </Button>
        <Button disabled={selectedFormId === 0} onClick={handleCopyForm}>
          Continuar
        </Button>
      </footer>
    </PageWrapper>
  )
}