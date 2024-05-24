import { Plus, Trash2 } from 'lucide-react'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'

import { EmojiPicker } from '../emoji-picker'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface OptionsProps {
  useForm: UseFormReturn<any>
}

export function Options({ useForm }: OptionsProps) {
  const { register, control } = useForm

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  })

  function newOption() {
    append({
      id: Math.round(Math.random() * 10000),
      text: '',
      index: fields.length + 1,
    })
  }
  function removeOption(index: number) {
    remove(index)
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Opções </h2>
        <Button onClick={newOption} size="sm" variant="ghost">
          <Plus size={20} />
        </Button>
      </div>
      {fields.map((field, index) => (
        <li key={`option-${field.id}`} className="flex items-center gap-2">
          <Button
            onClick={() => removeOption(index)}
            className="hover:text-red-500"
            size="icon"
            variant="ghost"
          >
            <Trash2 />
          </Button>
          {/* {['emoji', 'cards', 'classification'].includes(questionType) && (
            <Controller
              control={control}
              name={`options.${index}.emoji`}
              render={(emoji) => (
                <EmojiPicker
                  onSelect={(e: any) => {
                    emoji.field.onChange(e)
                  }}
                />
              )}
            />
          )} */}
          <Input
            {...register(`options.${index}.text`)}
            placeholder="Texto da opção"
            styles="flex-1"
          />
          {/* <Input
            {...register(`options.${index}.value`)}
            placeholder="Valor"
            defaultValue={index}
            styles="flex w-20"
          /> */}
        </li>
      ))}
    </section>
  )
}
