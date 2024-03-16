import { Plus, Trash2 } from 'lucide-react'
import { FieldArrayWithId } from 'react-hook-form'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface OptionsProps {
  register: any
  append: any
  remove: any
  fields: FieldArrayWithId<
    {
      text: string
      type: string
      topic: string
      id?: string | undefined
      isDefault?: boolean | undefined
      options?:
        | {
            text: string
            value: number
            id?: string | undefined
          }[]
        | undefined
    },
    'options',
    'id'
  >[]
}

export function Options({ fields, register, append, remove }: OptionsProps) {
  function newOption() {
    append({ text: '', value: 0 })
  }
  function removeOption(index: number) {
    remove(index)
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Opções</h2>

        <Button onClick={newOption} size="sm" variant="ghost">
          <Plus size={20} />
        </Button>
      </div>
      {fields.map((field, index) => (
        <li
          key={`option-${index}`}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <Button
            onClick={() => removeOption(index)}
            className="hover:text-red-500"
            size="icon"
            variant="ghost"
          >
            <Trash2 />
          </Button>
          <Input
            {...register(`options.${index}.text`)}
            placeholder="Texto da opção"
            styles="flex-1"
          />
          <Input
            {...register(`options.${index}.value`)}
            placeholder="Valor"
            defaultValue={index}
            styles="flex w-20"
          />
        </li>
      ))}
    </section>
  )
}
