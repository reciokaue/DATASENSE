'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

import { Options } from '@/src/components/question/options'
import { Preview } from '@/src/components/question/preview'
import { TopicPicker } from '@/src/components/topic-picker'
import { Button } from '@/src/components/ui/button'
import { LabelDiv } from '@/src/components/ui/label-div'
import { Dropdown } from '@/src/components/ui/select'
import { Switch } from '@/src/components/ui/switch'
import { TagList } from '@/src/components/ui/tag-list'
import { Textarea } from '@/src/components/ui/textarea'
import { QuestionSchema } from '@/src/schemas/form'

const questionTypes = [
  { label: 'Opções', value: 'options' },
  { label: 'Cards', value: 'cards' },
  { label: 'Emoji', value: 'emoji' },
  { label: 'Classificação', value: 'classification' },
  { label: 'Texto', value: 'text' },
]

export default function CreateQuestionPage() {
  const Question = useForm<QuestionSchema>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      type: 'options',
      options: [{ text: 'Opção', value: 1 }],
    },
  })
  const { register, handleSubmit, control, watch } = Question

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  })
  const options = watch('options')
  const questionType = watch('type')
  const topics = watch('topics')

  return (
    <div className="mx-auto flex w-full flex-col space-y-2 pb-10 pt-3">
      {topics && (
        <TagList
          className="max-w-full"
          tags={topics}
          variant="default"
          icon="no-icon"
        />
      )}
      <article className="flex space-x-6">
        <section className="flex h-full max-h-[180px] min-w-[400px] flex-col justify-between space-y-4">
          <LabelDiv title="Questão" labelFor="question">
            <Textarea
              className="h-full resize-none"
              id="question"
              {...register('text')}
            />
          </LabelDiv>
          <div className="flex space-x-4">
            <LabelDiv
              title="Tópicos"
              tooltip="O Tópico é relacionado a pergunta e é utilizado para mostrar e filtrar melhor o resultado das perguntas do formulário"
              name="topics"
              control={control}
              render={(topics) => (
                <TopicPicker
                  setTopics={(t: string[]) => {
                    topics.field.onChange(t)
                  }}
                  selectedTopics={topics.field.value || []}
                />
              )}
            />
            <LabelDiv
              title="Tipo de questão"
              tooltip="O tipo da pergunta é muito importante para se ter o resultado desejado da melhor maneira possível"
              name="type"
              control={control}
              render={(type) => (
                <Dropdown
                  setSelected={(t) => {
                    type.field.onChange(t)
                  }}
                  placeholder="Selecione um tipo..."
                  options={questionTypes}
                />
              )}
            />
          </div>
        </section>
        <aside className="flex w-full">
          <Preview type={questionType} options={options} />
        </aside>
      </article>

      {questionType !== 'text' && (
        <Options
          fields={fields}
          register={register}
          append={append}
          remove={remove}
          control={control}
          questionType={questionType}
        />
      )}
      <footer className="flex w-full items-center justify-end gap-4">
        {/* <Button variant="ghost" size="icon">
          <Copy />
        </Button> */}
        <div className="mr-4 flex items-center gap-2 leading-10">
          Obrigatória <Switch />
        </div>
        <Button variant="secondary">Limpar</Button>
        <Button>Salvar</Button>
      </footer>
    </div>
  )
}
