'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Check, Loader2, Plus, UploadCloud, X } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { getForm } from '@/src/api/get-form'
import { updateFormQuestions } from '@/src/api/update-form-questions'
import { SortableItem } from '@/src/components/sortable/sortable-item'
import { SortableList } from '@/src/components/sortable/sortable-list'
import { Button } from '@/src/components/ui/button'
import { Skeleton } from '@/src/components/ui/skeleton'
import { debounce } from '@/src/utils/debounce'
import {
  questionSchemaArray,
  questionSchemaArrayType,
} from '@/src/utils/schemas/question'

import { Card } from './card'

export default function Page({ params }: { params: { id: string } }) {
  const formId = +params.id

  const { data: form, isLoading } = useQuery({
    queryKey: ['form', params.id],
    queryFn: async () => {
      const data = await getForm(formId)
      reset({ questions: data?.questions || [] })
      return data
    },
  })

  const questionsForm = useForm<questionSchemaArrayType>({
    resolver: zodResolver(questionSchemaArray),
    defaultValues: { questions: form?.questions || [] },
  })
  const { reset, control } = questionsForm

  const { fields, append, swap } = useFieldArray({
    control,
    name: 'questions',
  })

  const updateQuestionsMutation = useMutation({
    mutationFn: (questions: any) => updateFormQuestions(formId, questions),
    onError: (err, newQuestions) => {
      console.log(newQuestions, err)
    },
  })

  async function handleSaveQuestions() {
    const data = questionsForm.getValues().questions
    await updateQuestionsMutation.mutateAsync(data)
    console.log(data)
    reset({ questions: data })
  }

  function handleAddQuestion() {
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
      formId,
      id: -Math.round(Math.random() * 100),
    })
  }

  const debouncedSave = useCallback(debounce(handleSaveQuestions, 1000), [
    handleSaveQuestions,
  ])

  useEffect(() => {
    const subscription = questionsForm.watch(() => {
      if (questionsForm.formState.isDirty) {
        debouncedSave()
      }
    })

    const interval = setInterval(
      () => {
        if (questionsForm.formState.isDirty) {
          handleSaveQuestions()
        }
      },
      60 * 1000 * 5,
    ) // Salva a cada 5 minutos se houver alterações

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (questionsForm.formState.isDirty) {
        handleSaveQuestions()
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      subscription.unsubscribe()
      clearInterval(interval)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [questionsForm])

  return (
    <div className="relative flex flex-col pb-10">
      <header className="mb-6 mr-8 flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleSaveQuestions}
            variant="secondary"
            className="bg-white text-black"
          >
            {!updateQuestionsMutation.isPending ? (
              <>
                Salvar <UploadCloud />
              </>
            ) : (
              <>
                Salvando <Loader2 className="animate-spin" />
              </>
            )}
          </Button>
          <span className="flex items-center gap-2">
            {updateQuestionsMutation.isSuccess &&
              questionsForm.formState.isDirty && (
                <>
                  <Check className="text-green-500" /> Salvo
                </>
              )}
            {updateQuestionsMutation.isError && (
              <>
                <X className="text-red-500" />
                Erro ao salvar
              </>
            )}
          </span>
        </div>
        <Button
          onClick={handleAddQuestion}
          variant="ghost"
          className="items-center"
        >
          Nova questão <Plus />
        </Button>
      </header>

      {!isLoading && fields && form && (
        <SortableList
          items={fields}
          swap={swap}
          renderItem={(item, index) => (
            <SortableItem
              sortableId={item.id}
              className="flex items-center gap-2"
            >
              <Card
                question={item}
                formId={+params.id}
                questionsForm={questionsForm}
                index={index}
              />
            </SortableItem>
          )}
        />
      )}

      {isLoading &&
        [0, 1, 2].map((i) => (
          <Skeleton className="mx-4 my-2 mr-10 h-40 w-full" key={i} />
        ))}
    </div>
  )
}
