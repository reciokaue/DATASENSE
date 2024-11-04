'use client'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

// import { useForm } from 'react-hook-form'
// import { getForm } from '@/src/api/get-form'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'

// import { Form, FormSchema } from '@/src/models'
import { QuestionOptions } from './options'

// const AnswerSchema = FormSchema.pick({
//   questions: true,
// })
// type Answers = Pick<Form, 'questions'>
// { params }: { params: { formId: string } }
export default function AnswerPage() {
  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   reset,
  //   formState: { isSubmitting, errors },
  // } = useForm<Answers>({
  //   resolver: zodResolver(AnswerSchema),
  // })
  // const { data: form, isLoading } = useQuery({
  //   queryKey: ['form', params.formId],
  //   queryFn: () => getForm(params.formId),
  // })

  return (
    <main className="mx-auto flex h-full min-h-screen w-full max-w-screen-sm flex-col ">
      <nav className="flex items-center justify-between px-4 py-3 sm:px-6 md:px-10">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
          DATASENSE
        </h1>
      </nav>
      <div className="flex w-full items-center justify-center">
        <Image
          width="600"
          height="600"
          src={form?.logoUrl || ''}
          alt="imagem do proprietário"
          className="image aspect-square w-full object-fill sm:max-w-lg"
        />
      </div>
      <section className="flex w-full flex-col px-4 py-3 sm:px-6 md:px-10">
        <header className="flex flex-col space-y-2 py-5 text-start md:text-left">
          <h2 className="text-2xl font-semibold">{form?.name}</h2>
          <p className="text-lg font-medium">{form?.description}</p>
          <Badge variant="secondary" className="text-sm sm:text-base">
            Enviamos suas respostas anonimamente
          </Badge>
        </header>
        <div className="flex h-full flex-1 flex-col items-start gap-10 py-10">
          {form?.questions?.map((question, index) => (
            <QuestionOptions
              key={question.id}
              question={question}
              index={index}
            />
          ))}
        </div>
        <footer className="flex w-full py-4">
          <Button className="h-12 w-full text-lg sm:h-14 sm:text-xl">
            Enviar
          </Button>
        </footer>
      </section>
    </main>
  )
}

const form = {
  id: 1,
  name: 'Feedback de Atendimento - Pizzaria',
  description:
    'Ajude-nos a melhorar nossos serviços respondendo às perguntas abaixo.',
  logoUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj9qSVJAxVKeOs4Slk9YRLoPxMXwRBsiKG0WbOlN9gwWH2D5mrlHuIW7zkZf2mf8EHk9I&usqp=CAU',
  questions: [
    {
      id: 1,
      text: 'Como você avalia nosso atendimento geral?',
      index: 0,
      questionType: {
        id: 4,
        name: 'starRating',
        label: 'Avaliação por Estrelas',
      },
      options: [],
      required: true,
    },
    {
      id: 2,
      text: 'Qual o seu nível de satisfação com o sabor da pizza?',
      index: 1,
      questionType: { id: 2, name: 'list', label: 'Lista' },
      options: [
        { id: 1, index: 0, text: 'Muito Insatisfeito' },
        { id: 2, index: 1, text: 'Insatisfeito' },
        { id: 3, index: 2, text: 'Neutro' },
        { id: 4, index: 3, text: 'Satisfeito' },
        { id: 5, index: 4, text: 'Muito Satisfeito' },
      ],
      required: true,
    },
    {
      id: 3,
      text: 'Quais ingredientes você gostaria de ver em novas pizzas?',
      index: 2,
      questionType: { id: 1, name: 'options', label: 'Opções Múltiplas' },
      options: [
        { id: 6, index: 0, text: 'Pepperoni' },
        { id: 7, index: 1, text: 'Frango' },
        { id: 8, index: 2, text: 'Vegetais' },
        { id: 9, index: 3, text: 'Queijos Especiais' },
      ],
      required: false,
    },
    {
      id: 4,
      text: 'Deixe seu comentário sobre o que podemos melhorar:',
      index: 3,
      questionType: { id: 3, name: 'text', label: 'Texto' },
      options: [],
      required: false,
    },
    {
      id: 5,
      text: 'Informe seu telefone para contato (opcional):',
      index: 4,
      questionType: { id: 5, name: 'phone', label: 'Telefone' },
      options: [],
      required: false,
    },
    {
      id: 6,
      text: 'Informe seu e-mail para receber promoções:',
      index: 5,
      questionType: { id: 6, name: 'email', label: 'E-mail' },
      options: [],
      required: true,
    },
    {
      id: 7,
      text: 'Qual o melhor horário para entrarmos em contato?',
      index: 6,
      questionType: { id: 7, name: 'time', label: 'Horário' },
      options: [],
      required: true,
    },
    {
      id: 8,
      text: 'Qual a melhor data para nos visitar?',
      index: 7,
      questionType: { id: 8, name: 'date', label: 'Data' },
      options: [],
      required: true,
    },
    {
      id: 9,
      text: 'O quanto você concorda que nosso serviço é rápido?',
      index: 8,
      questionType: { id: 9, name: 'slider', label: 'Escala de Concordância' },
      options: [],
      required: true,
    },
    {
      id: 10,
      text: 'Deixe seu comentário final:',
      index: 9,
      questionType: { id: 10, name: 'longText', label: 'Texto Longo' },
      options: [],
      required: false,
    },
  ],
}
