export const formActions = ({ remove, insert, fields, append, form }: any) => {
  const removeQuestion = (index: number) => {
    remove(index)
  }
  const cloneQuestion = (index: number) => {
    insert(index + 1, fields[index])
  }
  const addQuestion = () => {
    append({
      text: '',
      questionType: {
        id: 1,
        name: 'options',
        label: 'Opções',
        icon: 'CircleDot',
      },
      required: false,
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
