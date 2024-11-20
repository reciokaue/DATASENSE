'use client'

import { useQuery } from '@tanstack/react-query'

import { getForm } from '@/api/get-form'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

export default function TemplatePage({
  params,
}: {
  params: { formId: string }
}) {
  const { data: form } = useQuery({
    queryKey: ['form-template', params.formId],
    queryFn: () => getForm(params.formId),
  })

  return (
    <div className="flex h-full flex-col space-y-6 px-10">
      <Breadcrumb
        steps={[
          {
            title: 'Comunidade',
            icon: 'layout-template',
            href: '/community',
          },
          {
            title: form?.category?.label,
            icon: form?.category?.icon,
            href: `/community/categories/${form?.category?.name}`,
          },
          { title: form?.name, icon: 'book-copy', href: '/' },
        ]}
      />
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col">
          <header className="mb-3 mt-2 flex items-center gap-4 text-primary">
            <Icon
              name={form?.category?.icon || ''}
              className="size-10"
              strokeWidth={3}
            />
            <h1 className="text-3xl font-semibold leading-relaxed ">
              {form?.name}
            </h1>
          </header>
          <p>{form?.description}</p>
          <footer className="flex gap-3  pt-3">
            <Button>+ Copiar</Button>
            <Button>Visualizar</Button>
          </footer>
        </div>
        <div className="min-h-96 ">
          <div className="h-full w-full rounded-md bg-primary/20"></div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold">Questões</h2>
      <section className="grid grid-cols-2 gap-6">
        {form?.questions?.map((question, index) => (
          <div
            key={question.id}
            className="flex w-full flex-col space-y-4 rounded-md border p-6"
          >
            <header className="flex items-center justify-between">
              <h2 className="text-base font-medium">Questão {index + 1}</h2>
              <div className="flex gap-2">
                <Icon name={question.questionType?.icon} />
                {question.questionType?.label}
              </div>
            </header>
            <p>{question.text}</p>
            <div className="flex h-fit flex-wrap justify-center gap-2">
              {question?.options?.map((option: any) => (
                <Button key={option.id} type="button" variant="outline">
                  {option.text}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
