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

import { QuestionType } from './question'

export default function AnswerPage({ params }: { params: { formId: string } }) {
  const responseForm = useForm<MultipleResponses>({})
  const { push } = useRouter()
  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = responseForm

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
  const focusNextError = (data: any) => {
    console.log(data)
    // TODO Select the next error input
  }
  return (
    <main className="mx-auto flex h-full min-h-screen w-full max-w-screen-sm flex-col ">
      <nav className="flex items-center justify-between px-4 py-3 sm:px-6 md:px-10">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
          DATASENSE
        </h1>
      </nav>
      <div className="flex w-full items-center justify-center px-4 py-3 sm:px-6 md:px-10">
        {form?.logoUrl ? (
          <Image
            width="600"
            height="600"
            src={form?.logoUrl}
            alt="imagem do proprietário"
            className="h-80 w-full rounded-lg object-fill"
          />
        ) : (
          <div className="h-80 w-full rounded-lg bg-primary/20 object-fill"></div>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, focusNextError)}
        className="flex h-full w-full flex-1 flex-col px-4 py-3 sm:px-6 md:px-10"
      >
        <header className="flex flex-col space-y-2 py-5 text-start md:text-left">
          <h2 className="text-2xl font-semibold">{form?.name}</h2>
          <p className="text-lg font-medium">{form?.description}</p>
          <Badge variant="secondary" className="text-sm sm:text-base">
            Enviamos suas respostas anonimamente
          </Badge>
        </header>
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
                {question.required && ' *'}
                {/* {question.id} */}
              </h1>
              <QuestionType form={responseForm} question={question} />
              {errors.responses?.[index]?.value?.message && (
                <p className="pt-4 text-sm text-red-500">
                  {errors.responses?.[index]?.value?.message}
                </p>
              )}
            </section>
          ))}
        </div>
        <footer className="flex w-full py-4">
          <Button
            type="submit"
            className="h-12 w-full text-lg sm:h-14 sm:text-xl"
          >
            Enviar
          </Button>
        </footer>
      </form>
    </main>
  )
}

// const form: Form = {
//   id: 1,
//   name: 'Feedback de Atendimento - Pizzaria',
//   description:
//     'Ajude-nos a melhorar nossos serviços respondendo às perguntas abaixo.',
//   logoUrl:
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj9qSVJAxVKeOs4Slk9YRLoPxMXwRBsiKG0WbOlN9gwWH2D5mrlHuIW7zkZf2mf8EHk9I&usqp=CAU',
//   questions: [
//     {
//       id: 1,
//       formId: 1,
//       text: 'Como você avalia nosso atendimento geral?',
//       index: 0,
//       questionType: {
//         icon: 'circle',
//         id: 4,
//         name: 'starRating',
//         label: 'Avaliação por Estrelas',
//       },
//       options: [],
//       required: true,
//     },
//     {
//       id: 2,
//       formId: 1,
//       text: 'Qual o seu nível de satisfação com o sabor da pizza?',
//       index: 1,
//       questionType: { icon: 'circle', id: 2, name: 'list', label: 'Lista' },
//       options: [
//         { id: 1, index: 0, text: 'Muito Insatisfeito' },
//         { id: 2, index: 1, text: 'Insatisfeito' },
//         { id: 3, index: 2, text: 'Neutro' },
//         { id: 4, index: 3, text: 'Satisfeito' },
//         { id: 5, index: 4, text: 'Muito Satisfeito' },
//       ],
//       required: true,
//     },
//     {
//       id: 3,
//       formId: 1,
//       text: 'Quais ingredientes você gostaria de ver em novas pizzas?',
//       index: 2,
//       questionType: {
//         icon: 'circle',
//         id: 1,
//         name: 'options',
//         label: 'Opções Múltiplas',
//       },
//       options: [
//         { id: 6, index: 0, text: 'Pepperoni' },
//         { id: 7, index: 1, text: 'Frango' },
//         { id: 8, index: 2, text: 'Vegetais' },
//         { id: 9, index: 3, text: 'Queijos Especiais' },
//       ],
//       required: true,
//     },
//     {
//       id: 4,
//       formId: 1,
//       text: 'Deixe seu comentário sobre o que podemos melhorar:',
//       index: 3,
//       questionType: { icon: 'circle', id: 3, name: 'text', label: 'Texto' },
//       options: [],
//       required: true,
//     },
//     {
//       id: 5,
//       formId: 1,
//       text: 'Informe seu telefone para contato (opcional):',
//       index: 4,
//       questionType: { icon: 'circle', id: 5, name: 'phone', label: 'Telefone' },
//       options: [],
//       required: true,
//     },
//     {
//       id: 6,
//       formId: 1,
//       text: 'Informe seu e-mail para receber promoções:',
//       index: 5,
//       questionType: { icon: 'circle', id: 6, name: 'email', label: 'E-mail' },
//       options: [],
//       required: true,
//     },
//     {
//       id: 7,
//       formId: 1,
//       text: 'Qual o melhor horário para entrarmos em contato?',
//       index: 6,
//       questionType: { icon: 'circle', id: 7, name: 'time', label: 'Horário' },
//       options: [],
//       required: true,
//     },
//     {
//       id: 8,
//       formId: 1,
//       text: 'Qual a melhor data para nos visitar?',
//       index: 7,
//       questionType: { icon: 'circle', id: 8, name: 'date', label: 'Data' },
//       options: [],
//       required: true,
//     },
//     {
//       id: 9,
//       formId: 1,
//       text: 'O quanto você concorda que nosso serviço é rápido?',
//       index: 8,
//       questionType: {
//         icon: 'circle',
//         id: 9,
//         name: 'slider',
//         label: 'Escala de Concordância',
//       },
//       options: [],
//       required: true,
//     },
//     {
//       id: 10,
//       formId: 1,
//       text: 'Deixe seu comentário final:',
//       index: 9,
//       questionType: {
//         icon: 'circle',
//         id: 10,
//         name: 'longText',
//         label: 'Texto Longo',
//       },
//       options: [],
//       required: true,
//     },
//   ],
//   active: false,
//   isPublic: null,
//   createdAt: null,
//   userId: null,
// }
