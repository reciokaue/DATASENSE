'use client'

import { Label } from '@radix-ui/react-label'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { TagInput } from '@/components/ui/tag-input'
import { TagList } from '@/components/ui/tag-list'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'

export default function TopicCreation() {
  const [removedTags, setRemovedTags] = useState<string[]>([])
  const [manual, setManual] = useState(false)
  const [createdTags, setCreatedTags] = useState<string[]>([])

  const queryClient = useQueryClient()

  const handleRemoveTags = async () => {
    if (removedTags.length === 0) return
    await api.delete('/topics', {
      data: { topics: removedTags },
    })
    queryClient.setQueryData(['topics'], (data: string[]) =>
      data.filter((topic) => !removedTags.includes(topic)),
    )
    setRemovedTags([])
  }

  const handleSaveNewTags = async () => {
    if (createdTags.length === 0) return

    await api.post('/topics', {
      topics: createdTags,
    })
    queryClient.setQueryData(['topics'], (data: string[]) => [
      ...data,
      ...createdTags,
    ])
    setCreatedTags([])
  }

  const { data: topics } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      const response = await api.get(`/topics`, {
        params: { pageSize: 100 },
      })

      return response.data
    },
  })

  return (
    <main className="flex h-full flex-col justify-start gap-10 py-10">
      <div className="flex flex-col gap-10 md:flex-row">
        <section className="flex max-w-[450px] flex-col items-start space-y-6">
          <div className="flex flex-col items-start space-y-2">
            <Label>Criar Tópicos</Label>
            <TagInput
              placeholder="digite um tópico"
              tags={createdTags}
              className="sm:min-w-[450px]"
              setTags={setCreatedTags}
              subtext="Estes são os tópicos nos quais você está interessado."
              variant="default"
            />
          </div>
          {manual && (
            <Textarea
              className="h-32 resize-none"
              placeholder='Digite os valores separados por virgula, ex: "tópico1, tópico2"'
              onChange={(e) =>
                setCreatedTags(e.target.value.split(',').map((v) => v.trim()))
              }
            />
          )}
          <div className="flex w-full justify-start gap-2">
            <Button onClick={handleSaveNewTags}>Salvar</Button>
            <Button onClick={() => setManual(!manual)} variant="secondary">
              Manual
            </Button>
          </div>
        </section>
        <section className="flex max-w-[450px] flex-col items-start space-y-6">
          <div className="flex flex-col items-start space-y-2">
            <Label>Deletar Tópicos</Label>
            <TagInput
              placeholder="digite um tópico"
              tags={removedTags}
              setTags={setRemovedTags}
              className="sm:min-w-[450px]"
              subtext="Selecione todos os tópicos que deseja excluir"
              variant="default"
            />
          </div>
          <div className="flex w-full justify-start gap-2">
            <Button onClick={handleRemoveTags} variant="destructive">
              Deletar
            </Button>
            <Button onClick={() => setRemovedTags([])} variant="secondary">
              Cancelar
            </Button>
          </div>
        </section>
      </div>
      {topics && (
        <TagList
          tags={topics.filter((tag: string) => !removedTags.includes(tag))}
          onTagClick={(tag) => setRemovedTags((prev) => [...prev, tag])}
          className="max-w-full"
        />
      )}
    </main>
  )
}
