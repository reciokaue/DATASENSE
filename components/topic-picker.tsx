import { useEffect, useState } from 'react'

import { api } from '@/lib/api'

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
  setTopics: (topic: string[]) => void
  selectedTopics: Array<string>
}

export function TopicPicker({ setTopics, selectedTopics }: TopicPickerProps) {
  const [formTags, setFormTags] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>(selectedTopics)
  const [search, setSearch] = useState('')

  const addTag = (tagRemoved: string) => {
    setFormTags([...formTags, tagRemoved])
    setTags(tags.filter((tag: string) => tag !== tagRemoved))
  }
  const undoAddTag = (tagRemoved: string) => {
    setTags([...tags, tagRemoved])
    setFormTags(formTags.filter((tag: string) => tag !== tagRemoved))
  }

  function handleChangeTopics() {
    setTopics(formTags)
  }

  useEffect(() => {
    async function fetchData() {
      const allTopics = await api.get('/topics', {
        params: { pageSize: 500 },
      })
      setTags(
        tags.length > 0
          ? allTopics.data.filter((item: string) => !tags.includes(item))
          : allTopics.data,
      )
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function normalize(string: string) {
    return string
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar Tópicos</Button>
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
            onRemoveTag={undoAddTag}
          />
          <Input
            onChange={(e) => setSearch(e.currentTarget.value)}
            value={search}
            placeholder="Buscar tópicos"
          />
          <TagList
            className="max-w-full"
            addIcon
            tags={tags.filter((tag: string) => {
              return normalize(tag).includes(normalize(search))
            })}
            onRemoveTag={addTag}
          />
        </section>
        <footer className="flex w-full justify-end gap-2 px-4 ">
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleChangeTopics}>Adicionar</Button>
          </DialogClose>
        </footer>
      </DialogContent>
    </Dialog>
  )
}
