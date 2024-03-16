import { Plus, Trash2 } from 'lucide-react'
import { FieldArrayWithId } from 'react-hook-form'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { LabelDiv } from '../ui/label-div'

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
    <LabelDiv title="Opções" styles="space-y-3 pr-8">
      {fields.map((field, index) => (
        <li
          key={`option-${index}`}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <button
            onClick={() => removeOption(index)}
            className="hover:text-red-500"
          >
            <Trash2 />
          </button>
          <Input
            {...register(`options.${index}.text`)}
            placeholder="Option text"
            styles="flex-1"
          />
        </li>
      ))}
      <Button onClick={newOption} size="sm" variant="link">
        <Plus size={20} /> Opção
      </Button>
    </LabelDiv>
  )
}
