import { useState } from 'react'

import { useTopics } from '@/src/contexts/topics'

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
  setTopics: (topic: TopicDTO[]) => void
  selectedTopics: Array<TopicDTO>
}

export function TopicPicker({ setTopics, selectedTopics }: TopicPickerProps) {
  const [formTags, setFormTags] = useState<TopicDTO[]>(selectedTopics)
  const [search, setSearch] = useState('')
  const { topics } = useTopics()

  const addTag = (tagRemoved: TopicDTO) => {
    setFormTags([...formTags, tagRemoved])
  }
  const undoAddTag = (tagRemoved: TopicDTO) => {
    setFormTags(formTags.filter((tag: TopicDTO) => tag.id !== tagRemoved.id))
  }

  function handleChangeTopics() {
    setTopics(formTags)
  }

  function normalize(text: string) {
    return text
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          Adicionar Tópicos
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-2 sm:max-w-[825px]">
        <DialogHeader className="p-0">
          <DialogTitle>Tópicos</DialogTitle>
          <DialogDescription>
            Escolha os tópicos que mais combinam com seu formulário
          </DialogDescription>
        </DialogHeader>
        <section className="flex flex-col space-y-4">
          <TagList
            className="max-w-full"
            tags={formTags}
            onTagClick={undoAddTag}
            variant="default"
          />
          <Input
            onChange={(e) => setSearch(e.currentTarget.value)}
            value={search}
            placeholder="Buscar tópicos"
          />
          {topics && (
            <TagList
              className="max-w-full"
              tags={topics.filter(
                (tag: TopicDTO) =>
                  !formTags.includes(tag) &&
                  normalize(tag.name).includes(normalize(search)),
              )}
              onTagClick={addTag}
              icon="add"
            />
          )}
        </section>
        <footer className="flex w-full justify-end gap-2 px-4 ">
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleChangeTopics}>Salvar</Button>
          </DialogClose>
        </footer>
      </DialogContent>
    </Dialog>
  )
}
