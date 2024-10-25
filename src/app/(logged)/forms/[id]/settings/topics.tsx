import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { updateFormTopics } from '@/src/api/update-form-topics'
import { TopicPicker } from '@/src/components/topic-picker'
import { TagList } from '@/src/components/ui/tag-list'
import { FormDTO } from '@/src/DTOs/form'
import { TopicDTO } from '@/src/DTOs/topic'

interface TopicsProps {
  form: FormDTO | undefined
}

export function Topics({ form }: TopicsProps) {
  const [selectedTopics, setSelectedTopics] = useState<TopicDTO[]>(
    form?.topics || [],
  )
  const queryClient = useQueryClient()

  const updateFormMutation = useMutation({
    mutationFn: (form: any) => updateFormTopics(form),
    onError: (err, updatingForm) => {
      console.log(updatingForm, err)
    },
  })

  async function onSaveData(topics: TopicDTO[]) {
    const newForm = { ...form, topics }
    await updateFormMutation.mutateAsync(newForm)
    queryClient.setQueryData(['form', String(form?.id)], newForm)
  }

  return (
    <>
      <TagList
        className="max-w-full"
        tags={form?.topics || []}
        loading={!form?.topics}
        loadingSize={10}
        variant="default"
        icon="no-icon"
        onTagClick={() => {}}
      />

      <TopicPicker
        setSelectedTopics={setSelectedTopics}
        selectedTopics={selectedTopics}
        onClose={onSaveData}
        triggerProps={{
          variant: 'outline',
          className: 'w-fit',
        }}
      />
    </>
  )
}
