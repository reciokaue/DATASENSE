'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { getForm } from '@/api/get-form'
import { submitResponses } from '@/api/submit-responses'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MultipleResponses } from '@/models'
import { useQueryParams } from '@/utils/useQueryParams'

import { QuestionType } from './question'

export default function AnswerPage({ params }: { params: { formId: string } }) {
  const responseForm = useForm<MultipleResponses>({})
  const { searchParams } = useQueryParams()
  const { push } = useRouter()
  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = responseForm

  const viewMode = Boolean(searchParams.get('view')) || false
  const backTo =
    searchParams.get('backTo') || `/community/template/${params.formId}`

  const { data: form } = useQuery({
    queryKey: ['form', params.formId],
    queryFn: async () => {
      const data = await getForm(params.formId)
      reset({
        responses: data?.questions.map((q: any) => ({
          questionId: q.id,
        })),
      })
      return data
    },
  })

  const onSubmit: SubmitHandler<MultipleResponses> = async (data) => {
    if (!form?.id) return
    const filledResponses = data.responses.filter(
      (response) =>
        (response?.value !== undefined && response?.value !== null) ||
        (response?.text !== undefined && response?.text !== ''),
    )
    console.log(filledResponses)
    await submitResponses(form?.id, filledResponses)

    push(`/answer/success`)
  }

  return (
    <main className="mx-auto flex h-full min-h-screen w-full max-w-screen-sm flex-col ">
      <nav className="flex items-center justify-between px-4 py-3 sm:px-6 md:px-10">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
          DATASENSE
        </h1>
      </nav>
      {form?.logoUrl && (
        <div className="flex h-96 w-full overflow-hidden rounded-xl border border-border">
          <Image
            className="h-full w-full object-cover"
            src={form.logoUrl}
            width={450}
            height={600}
            alt={form.description}
          />
        </div>
      )}
      <header className="flex flex-col space-y-2 px-4 py-3 text-start sm:px-6 md:px-10">
        <h2 className="text-2xl font-semibold">{form?.name}</h2>
        <p className="text-lg font-medium">{form?.description}</p>
        <Badge variant="secondary" className="text-sm sm:text-base">
          Enviamos suas respostas anonimamente
        </Badge>
      </header>
      {form?.active && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full w-full flex-1 flex-col px-4 py-3 sm:px-6 md:px-10"
        >
          <div className="flex h-full flex-1 flex-col items-start gap-10 py-10">
            {form?.questions?.map((question, index) => (
              <section key={question.id} className="flex w-full flex-col">
                <header className="mb-3 flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {index + 1}
                  </span>
                  <h2 className="text-sm text-primary/60">
                    {question.questionType?.label}
                  </h2>
                </header>
                <h1 className="mb-6 text-2xl font-bold text-primary">
                  {question.text}
                  {question.required && ' (obrigatória)'}
                </h1>
                <QuestionType
                  form={responseForm}
                  question={question}
                  index={index}
                />
                {errors.responses?.[index]?.value?.message && (
                  <p className="pt-4 text-sm text-red-500">
                    {errors.responses?.[index]?.value?.message}
                  </p>
                )}
              </section>
            ))}
          </div>
          <footer className="flex w-full py-4">
            {!viewMode ? (
              <Button
                type="submit"
                className="h-12 w-full text-lg sm:h-14 sm:text-xl"
              >
                Enviar
              </Button>
            ) : (
              <Button
                className="h-12 w-full text-lg sm:h-14 sm:text-xl"
                link={backTo}
              >
                Voltar
              </Button>
            )}
          </footer>
        </form>
      )}
      {!form?.active && (
        <div className="mt-10 w-full px-4 py-3 text-start sm:px-6 md:px-10">
          <p className="mt-4 text-center text-lg text-gray-700 dark:text-gray-300 sm:text-xl">
            Este formulário esta inativo e nao aceita novas respostas, procure o
            dono caso ache que seja um erro
          </p>

          {!viewMode ? (
            <Button
              type="button"
              className="mt-10 h-12 w-full text-lg sm:h-14 sm:text-xl"
              link="/"
            >
              Crie seu próprio formulário
            </Button>
          ) : (
            <Button
              className="mt-10 h-12 w-full text-lg sm:h-14 sm:text-xl"
              link={backTo}
            >
              Voltar
            </Button>
          )}
        </div>
      )}
    </main>
  )
}
