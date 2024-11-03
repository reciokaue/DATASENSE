'use client'

import { useQuery } from '@tanstack/react-query'

import { getForm } from '@/src/api/get-form'
import { Breadcrumb } from '@/src/components/ui/breadcrumb'
import { Button } from '@/src/components/ui/button'
import { Icon } from '@/src/components/ui/icon'

export default function TemplatePage({
  params,
}: {
  params: { formId: string }
}) {
  const { data: form } = useQuery({
    queryKey: ['form', params.formId],
    queryFn: () => getForm(params.formId),
  })

  return (
    <div className="flex h-full flex-col px-10">
      <div className="grid grid-cols-2 ">
        <div className="flex flex-col">
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

          <header className="mb-3 mt-2 flex items-center gap-2 text-primary">
            <Icon
              name={form?.category?.icon || ''}
              className="size-6"
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
      <div className="my-6 flex h-20 border-y border-border"></div>
      {/* {JSON.stringify(form?.questions)} */}
      <section className="flex flex-col gap-6">
        {form?.questions?.map((question, index) => (
          <div key={question.id} className="flex w-full flex-col space-y-4 p-6">
            <header className="flex items-center justify-between">
              <h2 className="text-base font-medium">Questão {index + 1}</h2>
              <div className="flex gap-2">
                <Icon name={question.questionType?.icon} />
                {question.questionType?.label}
              </div>
            </header>
            <p>{question.text}</p>
            {question.options && (
              <ul>
                {question.options.map((option) => (
                  <li className="" key={option.id}>
                    {option.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    </div>
  )
}
