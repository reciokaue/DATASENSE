import { api } from '@/lib/api'

import { Combobox } from './ui/combobox'

interface TopicPickerProps {
  setTopic: (topic: string) => void
}

export async function TopicPicker({ setTopic }: TopicPickerProps) {
  const topics = await api.get('/topics', {
    params: { pageSize: 500 },
  })

  const data = topics.data.map((topic: string) => {
    return {
      label: topic,
      value: topic,
    }
  })

  return (
    <>
      <Combobox
        defaultValue="options"
        title="Selecione um tópico..."
        frameworks={data}
        handleSetValue={setTopic}
      />
      {JSON.stringify(topics.data)}
    </>
  )
}
