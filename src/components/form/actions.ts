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
    insert(index + 1, {
      ...fields[index],
      id: -Math.round(Math.random() * 100),
      _count: {
        responses: 0,
      },
      // options: fields[index].map((opt) => ({
      //   ...opt,
      //   id: -Math.round(Math.random() * 100),
      // })),
    })
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
        id: 2,
        name: 'list',
        label: 'Lista',
        icon: 'list',
      },
      required: true,
      options: [],
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
