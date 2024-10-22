import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Check } from 'lucide-react'

import { getTopics } from '../api/get-topics'
import { TopicDTO } from '../DTOs/topic'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { TagList } from './ui/tag-list'

interface TopicPickerProps {
  placeholder?: string
  selectedTopics: TopicDTO[]
  setSelectedTopics: (data: TopicDTO[]) => void
  onClose?: (data: TopicDTO[]) => void
  triggerProps?: object
}

export function TopicPicker({
  placeholder,
  selectedTopics,
  setSelectedTopics,
  onClose,
  triggerProps,
}: TopicPickerProps) {
  const queryClient = useQueryClient()

  const { data: topics } = useQuery({
    queryKey: ['topics'],
    queryFn: () => getTopics(0, 100),
  })

  const addNewTopic = (newTopic: TopicDTO) => {
    setSelectedTopics([...selectedTopics, newTopic])
    queryClient.setQueryData(['topics'], (oldData: TopicDTO[]) =>
      oldData.filter((topic) => topic.id !== newTopic.id),
    )
  }
  const removeTopic = (removedTopic: TopicDTO) => {
    setSelectedTopics(
      selectedTopics.filter((topic) => topic.id !== removedTopic.id),
    )
    queryClient.setQueryData(['topics'], (oldData: TopicDTO[]) => [
      ...oldData,
      removedTopic,
    ])
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...triggerProps}>{placeholder || 'Selecionar tópicos'}</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={() => onClose(selectedTopics)}
        className="max-w-4xl"
      >
        <DialogHeader>
          <DialogTitle>Tópicos</DialogTitle>
          <DialogDescription>
            Os tópicos servem para posicionar o seu formulário, identificar
            tendências e auxiliar na análise estatística dos dados gerados. Por
            isso, escolha cuidadosamente os tópicos que fazem mais sentido para
            suas questões
          </DialogDescription>
          {selectedTopics.length > 0 && (
            <div className="gap-2 pt-5">
              <h2 className="text-sm font-medium">Tópicos selecionados</h2>
              <TagList
                onTagClick={removeTopic}
                tags={selectedTopics}
                variant="default"
              />
            </div>
          )}
          <Input placeholder="Buscar tópicos" className="mt-3" search />
          <TagList
            className="pb-6"
            onTagClick={addNewTopic}
            tags={topics || []}
            icon="add"
          />
          <DialogClose asChild>
            <Button onClick={() => onClose(selectedTopics)} className="w-full">
              Salvar
              <Check className="size-5" />
            </Button>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
