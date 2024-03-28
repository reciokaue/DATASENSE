'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { QuestionCard } from '@/components/question-card'
import { Header } from '@/components/question-card/header'
import { Options } from '@/components/question-card/options'
import { Preview } from '@/components/question-card/preview'
import { TopicPicker } from '@/components/topic-picker'
import { LabelDiv } from '@/components/ui/label-div'
import { Dropdown } from '@/components/ui/select'
import { TagList } from '@/components/ui/tag-list'
import { Textarea } from '@/components/ui/textarea'
import {
  QuestionInput,
  QuestionOutput,
  QuestionSchema,
} from '@/utils/schemas/form'

const questionTypes = [
  { label: 'Opções', value: 'options' },
  { label: 'Cards', value: 'cards' },
  { label: 'Emoji', value: 'emoji' },
  { label: 'Classificação', value: 'classification' },
  { label: 'Texto', value: 'text' },
]

export default function CreateQuestionPage() {
  // const form = useForm<QuestionInput, any, QuestionOutput>({
  //   resolver: zodResolver(QuestionSchema),
  //   defaultValues: {
  //     type: 'options',
  //     text: 'Questão',
  //     options: [{ text: 'Opção', value: 1 }],
  //   },
  // })

  return (
    <div className="mx-auto flex w-full  flex-col space-y-4 py-10">
      <TagList tags={['tag1', 'tag2', 'tag3']} onRemoveTag={() => {}} />

      <article className="flex space-x-6">
        <section className="flex min-w-[400px] flex-col space-y-4">
          <LabelDiv title="Questão" labelFor="question">
            <Textarea id="question" />
          </LabelDiv>
          <div className="flex space-x-4">
            {/* <LabelDiv
              title="Tópicos"
              tooltip="O Tópico é relacionado a pergunta e é utilizado para mostrar e filtrar melhor o resultado das perguntas do formulário"
              name="topics"
              render={(topics) => (
                <TopicPicker
                  setTopics={(t: string[]) => {
                    topics.field.onChange(t)
                  }}
                  selectedTopics={topics.field.value || []}
                />
              )}
            /> */}
            <LabelDiv
              title="Tipo de questão"
              tooltip="O tipo da pergunta é muito importante para se ter o resultado desejado da melhor maneira possível"
            >
              <Dropdown
                placeholder="Selecione um tipo..."
                options={questionTypes}
                setSelected={() => {}}
              />
            </LabelDiv>
          </div>
        </section>
        <aside className="flex w-full">
          {/* <Preview type={questionTypes[0]} options={{}} /> */}
        </aside>
      </article>

      {/* {questionType !== 'text' && (
        <Options
          fields={fields}
          register={register}
          append={append}
          remove={remove}
          control={control}
          questionType={questionType}
        />
      )} */}

      {/* <QuestionCard form={form} item={{ id: 1 }} /> */}
    </div>
  )
}
