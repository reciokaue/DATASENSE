'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronLeftCircleIcon, Pen } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { getForm } from '@/src/api/get-form'
import { Button } from '@/src/components/ui/button'

import { PageHeader, PageWrapper } from '../../layout'

export default function Page({ params }: { params: { id: string } }) {
  const { data: form } = useQuery({
    queryKey: ['form', params.id],
    queryFn: () => getForm({ query: params.id }),
  })

  const navigation = useRouter()

  return (
    <>
      <PageHeader>
        <Button
          onClick={navigation.back}
          variant="ghost"
          size="icon"
          className="mr-2 rounded-full text-primary/60"
        >
          <ChevronLeftCircleIcon />
        </Button>
        <h2 className="w-full text-xl font-semibold text-primary">
          {form?.name}
        </h2>

        <Button link={`/form/${params.id}`}>
          <Pen className="size-4" />
          Editar
        </Button>
      </PageHeader>
      <PageWrapper>Analytics</PageWrapper>
    </>
  )
}
