import { Button } from '@/src/components/ui/button'

export function Initial() {
  return (
    <div className="flex h-full flex-col items-center justify-between">
      <h1 className="pt-10 text-2xl font-bold text-gray-900 dark:text-white">
        DATASENSE
      </h1>
      <p className=" p-10 text-center text-2xl leading-relaxed">
        Bem-vindo ao Datasense! Aqui, suas respostas são 100% anônimas. Nosso
        compromisso é garantir que seus dados pessoais permaneçam privados.
        Sinta-se à vontade para compartilhar suas respostas com total segurança.
      </p>
      <footer className="flex w-full flex-col space-y-4 p-8">
        <h2 className="invisible text-base font-medium">Obrigado</h2>
        <Button className="h-14 text-xl">Continuar</Button>
      </footer>
    </div>
  )
}


/* eslint-disable react-hooks/rules-of-hooks */
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'

import { Button } from '@/src/components/ui/button'
import { DatePicker } from '@/src/components/ui/date-picker'
import { Input } from '@/src/components/ui/input'
import { Slider } from '@/src/components/ui/slider'
import { Textarea } from '@/src/components/ui/textarea'
import { TimePicker } from '@/src/components/ui/time-picker'
import { cn } from '@/src/lib/utils'
import { Option, Question } from '@/src/models'

interface QuestionTypeProps {
  question: Question
  form: UseFormReturn<any>
}

export function QuestionType({ question, form }: QuestionTypeProps) {
  const { register, control } = form
  const type = question?.questionType?.name
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'responses',
  })

  const [selectedOptions, setSelectedOptions] = useState<number[]>([])

  const toggleSelected = (option: Option) => {
    if (selectedOptions.includes(option.id)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== option.id))
      remove(fields.findIndex((field: any) => field?.optionId === option.id))
    } else {
      setSelectedOptions([...selectedOptions, option.id])
      append({
        value: option.text,
        optionId: option.id,
        questionId: question.id,
      })
    }
  }
  // setValue(`responses.${question.index}.questionId`, question.id)

  // const components: any = {
  //   text: <Text />,
  //   longText: <LongText />,
  //   // options: <Options question={question} />,
  //   starRating: <StarRating />,
  //   // list: <List question={question} />,
  //   phone: <Phone />,
  //   email: <Email />,
  //   time: <Time />,
  //   date: <DateOption />,
  //   slider: <RatingScale />,
  // }

  if (type === 'text')
    return (
      <Input
        className="h-auto border-2 px-4 py-4"
        placeholder="Digite sua resposta aqui..."
        {...register(`responses.${question.index}.value`, {
          required: {
            value: question.required,
            message: 'Questão obrigatória',
          },
        })}
      />
    )
  if (type === 'longText')
    return (
      <Textarea
        className="h-48 w-full resize-none border-2 px-4 py-4"
        maxLength={500}
        placeholder="Digite sua resposta aqui..."
        {...register(`responses.${question.index}.value`, {
          required: {
            value: question.required,
            message: 'Questão obrigatória',
          },
        })}
      />
    )

  if (type === 'options') {
    return (
      <div className="flex h-fit flex-wrap justify-center gap-2">
        {JSON.stringify(fields.length)}
        {question.options?.map((option) => (
          <Button
            key={option.id}
            type="button"
            variant={
              selectedOptions.includes(option?.id ||) ? 'default' : 'outline'
            }
            onClick={() => toggleSelected(option)}
            className="h-auto border-2 py-4"
          >
            {option.text}
          </Button>
        ))}
      </div>
    )
  }

  return <p>{JSON.stringify(question)}</p>
  // return components[type]
}

// Tipos de perguntas individuais

// function Options({ question }: { question: Question }) {
//   const [selected, setSelected] = useState<any>()

//   return (
//     {question?.options?.map((option) => (
//       <Button
//         key={option.id}
//         variant={option.id === selected?.id ? 'default' : 'outline'}
//         className="h-auto border-2 py-4"
//         onClick={() => setSelected(option)}
//       >
//         {option.text}
//       </Button>
//     ))}
//   )
// }

// function StarRating() {
//   const [rating, setRating] = useState<number>(0)

//   return (
//     <div className="flex w-full items-center justify-center gap-3">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <button
//           key={star}
//           className={cn([
//             'text-6xl',
//             star <= rating ? 'text-yellow-400' : 'text-gray-400',
//           ])}
//           onClick={() => setRating(star)}
//         >
//           ★
//         </button>
//       ))}
//     </div>
//   )
// }

// function List({ question }: { question: Question }) {
//   const [selected, setSelected] = useState<any>()

//   return (
//     <div className="flex flex-col justify-start gap-2">
//       {question?.options?.map((option) => (
//         <Button
//           key={option.id}
//           variant={option.id === selected?.id ? 'default' : 'outline'}
//           className="h-auto border-2 py-3"
//           onClick={() => setSelected(option)}
//         >
//           {option.text}
//         </Button>
//       ))}
//     </div>
//   )
// }

// function Phone() {
//   return (
//     <Input
//       type="tel"
//       placeholder="(XX) XXXXX-XXXX"
//       className="h-auto border-2 px-4 py-4"
//     />
//   )
// }

// function Email() {
//   return (
//     <Input
//       type="email"
//       placeholder="seuemail@exemplo.com"
//       className="h-auto border-2 px-4 py-4"
//     />
//   )
// }
// function Time() {
//   const [date, setDate] = useState(new Date())

//   return <TimePicker date={date} setDate={setDate} />
// }
// function DateOption() {
//   return <DatePicker />
// }
// function RatingScale() {
//   return (
//     <>
//       <Slider defaultValue={[50]} max={100} step={1} />
//       <footer className="grid grid-cols-3 py-4 text-sm text-primary/60">
//         <span>
//           Não concordo
//           <br />
//           (0)
//         </span>
//         <div className="flex items-center justify-center gap-2 pt-4 text-sm text-primary/50">
//           <ArrowLeft className="size-4 text-primary/20" />
//           Puxe
//           <ArrowRight className="size-4 text-primary/20" />
//         </div>
//         <span className="text-end">
//           Totalmente!
//           <br />
//           (10)
//         </span>
//       </footer>
//     </>
//   )
// }
