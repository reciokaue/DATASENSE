/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'

import { Button } from '@/src/components/ui/button'
import { DatePicker } from '@/src/components/ui/date-picker'
import { Input } from '@/src/components/ui/input'
import { Slider } from '@/src/components/ui/slider'
import { Textarea } from '@/src/components/ui/textarea'
import { TimePicker } from '@/src/components/ui/time-picker'
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
        text: option.text,
        optionId: option.id,
        questionId: question?.id,
      })
    }
  }

  if (type === 'text')
    return (
      <Input
        className="h-auto border-2 px-4 py-4"
        placeholder="Digite sua resposta aqui..."
        {...register(`responses.${question?.index}.text`, {
          required: {
            value: question?.required || false,
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
        {...register(`responses.${question?.index}.text`, {
          required: {
            value: question?.required || false,
            message: 'Questão obrigatória',
          },
        })}
      />
    )

  if (type === 'options')
    return (
      <div className="flex h-fit flex-wrap justify-center gap-2">
        {question?.options?.map((option: any) => (
          <Button
            key={option.id}
            type="button"
            variant={
              selectedOptions.includes(option.id) ? 'default' : 'outline'
            }
            onClick={() => toggleSelected(option)}
            className="h-auto border-2 py-4"
          >
            {option.text}
          </Button>
        ))}
      </div>
    )

  if (type === 'starRating')
    return (
      <Controller
        name={`responses.${question?.index}`}
        control={control}
        render={({ field }) => (
          <div className="flex w-full items-center justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`text-6xl ${star <= field?.value?.value ? 'text-yellow-400' : 'text-gray-400'}`}
                onClick={() =>
                  field.onChange({
                    questionId: question?.id,
                    text: question.text,
                    value: star,
                  })
                }
              >
                ★
              </button>
            ))}
          </div>
        )}
        rules={{
          required: {
            value: question?.required || false,
            message: 'Questão obrigatoria',
          },
        }}
      />
    )

  if (type === 'list')
    return (
      <Controller
        name={`responses.${question?.index}`}
        control={control}
        render={({ field }) => (
          <div className="flex flex-col justify-start gap-2">
            {question?.options?.map((option) => (
              <Button
                type="button"
                key={option.id}
                variant={
                  option.id === field.value?.optionId ? 'default' : 'outline'
                }
                className="h-auto border-2 py-3"
                onClick={() =>
                  field.onChange({
                    questionId: question?.id,
                    optionId: option.id,
                    text: option.text,
                  })
                }
              >
                {option.text}
              </Button>
            ))}
          </div>
        )}
        rules={{
          required: {
            value: question?.required || false,
            message: 'Questão obrigatória',
          },
        }}
      />
    )

  if (type === 'phone')
    return (
      <Input
        type="tel"
        // pattern="^\(\d{2}\)\s?\d{5}-\d{4}$"
        placeholder="(XX) XXXXX-XXXX"
        className="h-auto border-2 px-4 py-4"
        {...register(`responses.${question?.index}.text`, {
          required: question?.required,
        })}
      />
    )

  if (type === 'email')
    return (
      <Input
        type="email"
        placeholder="seuemail@exemplo.com"
        className="h-auto border-2 px-4 py-4"
        {...register(`responses.${question?.index}.text`, {
          required: question?.required,
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Email inválido',
          },
        })}
      />
    )

  if (type === 'time')
    return (
      <Controller
        rules={{
          required: {
            value: question?.required || false,
            message: 'Questão obrigatória',
          },
        }}
        control={control}
        name={`responses.${question?.index}.text`}
        render={({ field }) => (
          <TimePicker
            date={field.value || new Date()}
            setDate={(date) => field.onChange(date)}
          />
        )}
      />
    )

  if (type === 'date')
    return (
      <Controller
        rules={{
          required: {
            value: question?.required || false,
            message: 'Questão obrigatoria',
          },
        }}
        control={control}
        name={`responses.${question?.index}.text`}
        render={({ field }) => (
          <DatePicker
            date={field.value || new Date()}
            setDate={(date) => field.onChange(date)}
          />
        )}
      />
    )

  if (type === 'slider')
    return (
      <Controller
        rules={{
          required: {
            value: question?.required || false,
            message: 'Questão obrigatoria',
          },
        }}
        name={`responses.${question?.index}.value`}
        control={control}
        defaultValue={5}
        render={({ field }) => (
          <>
            <Slider
              onValueCommit={(value) => field.onChange(value[0])}
              defaultValue={[5]}
              max={10}
              step={1}
            />
            <footer className="grid grid-cols-3 py-4 text-sm text-primary/60">
              <span>Não concordo (0)</span>
              <div className="flex items-center justify-center gap-2 pt-4 text-sm text-primary/50">
                Puxe
              </div>
              <span className="text-end">Totalmente! (10)</span>
            </footer>
          </>
        )}
      />
    )

  return <p>Tipo de questão não suportado: {JSON.stringify(question)}</p>
}
