import { Plus, Trash2 } from 'lucide-react'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'

import { EmojiPicker } from '../emoji-picker'
import { SortableItem } from '../sortable/sortable-item'
import { SortableList } from '../sortable/sortable-list'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface OptionsProps {
  useForm: UseFormReturn<any>
}

export function Options({ useForm }: OptionsProps) {
  const { register, control, watch, getValues } = useForm
  const questionType = watch('questionType')
  // const optionsObject = watch('options')
  const isEmojiInput = questionType.name === 'emoji'

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'options',
    keyName: 'fieldId',
  })
  const { append: appendDeletedOption } = useFieldArray({
    control,
    name: 'deletedOptions',
  })

  function newOption(event: any) {
    event.preventDefault()
    append({
      id: Math.round(Math.random() * 10000),
      text: '',
      index: fields.length,
      new: true,
    })
  }
  function removeOption(event: any, option: any) {
    event.preventDefault()
    remove(option.index)
    if (!option.new) appendDeletedOption(option)
  }

  function onChangeSorting(data: any[]) {
    const options = getValues('options')
    const indexSorted = data.map((option: any, index: number) => ({
      ...options[option.index],
      index,
    }))
    replace(indexSorted)
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Opções </h2>
        <Button onClick={newOption} size="sm" variant="ghost">
          <Plus size={20} />
        </Button>
      </div>
      <SortableList
        items={fields}
        onChange={onChangeSorting}
        renderItem={(item, index) => (
          <SortableItem
            sortableId={item.id}
            className="flex items-center gap-2"
          >
            <Button
              onClick={(e) => removeOption(e, item)}
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
          </SortableItem>
        )}
      />
    </section>
  )
}

// {
//   ;['emoji', 'cards', 'classification'].includes(questionType) && (
//     <Controller
//       control={control}
//       name={`options.${index}.emoji`}
//       render={(emoji) => (
//         <EmojiPicker
//           onSelect={(e: any) => {
//             emoji.field.onChange(e)
//           }}
//         />
//       )}
//     />
//   )
// }
{
  /* <Controller
                control={control}
                name={`options.${index}.text`}
                render={(text) => (
                  <EmojiPicker
                    selectedEmoji={text.field.value}
                    onSelect={(e: any) => {
                      text.field.onChange(e)
                      console.log(e)
                    }}
                  />
                )}
              /> */
}
