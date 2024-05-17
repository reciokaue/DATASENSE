'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { OptionDTO } from '@/src/DTOs/option'
import type { OptionType } from '@/src/schemas/form'
import { OptionSchema } from '@/src/schemas/form'

import { EmojiPicker } from '../emoji-picker'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface OptionsProps {
  data: Array<OptionDTO>
}

export function Options({ data }: OptionsProps) {
  const [options, setOptions] = useState<Array<OptionDTO>>(data)

  const addOption = () => {
    setOptions([
      ...options,
      {
        id: null,
        value: 0,
        emoji: null,
        text: '',
        responses: 0,
        index: options.length,
      },
    ])
  }
  const deleteOption = (index: number) => {
    setOptions(options.filter((op) => op.index !== index && op))
  }
  const editOption = (option: OptionDTO) => {
    setOptions(options.map((op) => (op.index === option.index ? option : op)))
  }

  return (
    <section className="w-full max-w-screen-sm space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Opções </h2>
        <Button size="sm" variant="ghost" onClick={addOption}>
          <Plus size={20} />
        </Button>
      </div>
      <ul>
        {options &&
          options.map((option, index) => (
            <Option
              key={`option-${index}`}
              data={option}
              index={index}
              handle={{
                deleteOption,
                editOption,
              }}
            />
          ))}
      </ul>
    </section>
  )
}

interface OptionProps {
  data: OptionDTO
  index: number
  handle: {
    deleteOption: (index: number) => void
    editOption: (option: OptionDTO) => void
  }
}

export function Option({ data, index, handle }: OptionProps) {
  const { register, handleSubmit, watch, setValue } = useForm<OptionType>({
    resolver: zodResolver(OptionSchema),
    defaultValues: {
      ...data,
    },
  })

  const text = watch('text')

  async function handleEdit(data: OptionType) {
    console.log('AAAAAAAAAAAAAa')
    console.log(data)
  }
  function handleCancel() {
    setValue('text', data.text)
  }

  return (
    <form
      className="overflow-hidden py-1 pr-1"
      onSubmit={handleSubmit(handleEdit)}
    >
      <li className="flex items-center">
        <Button
          onClick={() => handle.deleteOption(index)}
          className="mr-2 hover:text-red-500"
          size="icon"
          variant="ghost"
        >
          <Trash2 />
        </Button>
        <Input
          {...register('text')}
          placeholder="Texto da opção"
          styles="flex-1"
          style={{ transition: 'width 0.7s' }}
        />

        <div
          className={
            'flex gap-1  duration-700 ease-linear ' +
            (text !== data.text ? ' ml-2 w-auto opacity-100' : 'w-0')
          }
          style={{ transition: 'width 0.7s' }}
        >
          <Button
            className="bg-blue-500 "
            size="icon"
            onClick={handleSubmit(handleEdit)}
          >
            <Check />
          </Button>
          <Button
            className="ml-1 hover:bg-primary/75"
            variant="secondary"
            size="icon"
            onClick={handleCancel}
          >
            <X />
          </Button>
        </div>
      </li>
    </form>
  )
}
