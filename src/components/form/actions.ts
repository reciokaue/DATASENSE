import { Question } from '@/models'

interface addQuestionProps {
  question?: Partial<Question>
  // type: string
}

export const formActions = ({ remove, insert, fields, append, form }: any) => {
  const removeQuestion = (index: number) => {
    remove(index)
  }
  const cloneQuestion = (index: number) => {
    insert(index + 1, fields[index])
  }
  const addQuestion = ({ question }: addQuestionProps) => {
    if (question)
      return append({
        text: question.text,
        questionType: question.questionType,
        required: question.required,
        options: question.options,
        index: fields.length,
        formId: form.data?.id,
        id: -Math.round(Math.random() * 100),
      })

    append({
      text: '',
      questionType: {
        id: 10,
        name: 'options',
        label: 'Multiplas opções',
        icon: 'ellipsis',
      },
      required: true,
      options: [
        { text: 'Ótimo', id: -Math.round(Math.random() * 1000), index: 0 },
        { text: 'Bom', id: -Math.round(Math.random() * 1000), index: 1 },
        { text: 'Regular', id: -Math.round(Math.random() * 1000), index: 2 },
        { text: 'Ruim', id: -Math.round(Math.random() * 1000), index: 3 },
        { text: 'Péssimo', id: -Math.round(Math.random() * 1000), index: 4 },
        { text: 'Não sei', id: -Math.round(Math.random() * 1000), index: 5 },
      ],
      index: fields.length,
      formId: form.data?.id,
      id: -Math.round(Math.random() * 100),
    })
  }

  return {
    removeQuestion,
    cloneQuestion,
    addQuestion,
  }
}
