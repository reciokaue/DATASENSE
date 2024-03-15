'use client'

import { Label } from '@radix-ui/react-label'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { TagInput } from '@/components/ui/tag-input'
import { TagList } from '@/components/ui/tag-list'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'

export default function TopicCreation() {
  const [removedTags, setRemovedTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [manual, setManual] = useState(false)
  const [createdTags, setCreatedTags] = useState<string[]>([])

  const removeTag = (tagRemoved: string) => {
    setRemovedTags([...removedTags, tagRemoved])
    setAllTags(allTags.filter((tag: string) => tag !== tagRemoved))
  }
  const undoRemoveTag = (tagRemoved: string) => {
    setAllTags([...allTags, tagRemoved])
    setRemovedTags(removedTags.filter((tag: string) => tag !== tagRemoved))
  }
  const cancelRemoveTags = () => {
    setAllTags([...removedTags, ...allTags])
    setRemovedTags([])
  }

  const handleSaveNewTags = async () => {
    if (createdTags.length === 0) return
    await api.post('/topic', {
      topics: createdTags,
    })
    setAllTags([...allTags, ...createdTags])
    setCreatedTags([])
  }
  const handleRemoveTags = async () => {
    if (removedTags.length === 0) return
    await api.delete('/topic', {
      data: {
        topics: removedTags,
      },
    })
    setRemovedTags([])
  }

  useEffect(() => {
    async function fetchData() {
      const topics = await api.get('/topic', {
        params: { pageSize: 500 },
      })
      setAllTags(topics.data as string[])
    }
    fetchData()
  }, [])

  return (
    <main className="flex h-full flex-col justify-start gap-10 pb-10 pt-20">
      <div className="flex flex-col gap-10 md:flex-row">
        <section className="flex max-w-[450px] flex-col items-start space-y-6">
          <div className="flex flex-col items-start space-y-2">
            <Label>Criar Tópicos</Label>
            <TagInput
              placeholder="digite um tópico"
              tags={createdTags}
              className="sm:min-w-[450px]"
              setTags={(tags) => {
                setCreatedTags(tags)
              }}
            />
            <p className="text-[0.8rem] text-muted-foreground">
              Estes são os tópicos nos quais você está interessado.
            </p>
          </div>
          {manual && (
            <Textarea
              className="h-32 resize-none"
              onChange={(e) =>
                setCreatedTags(e.target.value.split(',').map((v) => v.trim()))
              }
              placeholder='Digite os valores separados por virgula, ex: "tópico1, tópico2"'
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
              className="sm:min-w-[450px]"
              setTags={(tags) => {
                setRemovedTags(tags)
              }}
              onTagRemove={(tag) => undoRemoveTag(tag)}
            />
            <p className="text-[0.8rem] text-muted-foreground">
              Selecione todos os tópicos que deseja excluir
            </p>
          </div>
          <div className="flex w-full justify-start gap-2">
            <Button onClick={handleRemoveTags} variant="destructive">
              Deletar
            </Button>
            <Button onClick={cancelRemoveTags} variant="secondary">
              Cancelar
            </Button>
          </div>
        </section>
      </div>
      <TagList tags={allTags} onRemoveTag={removeTag} className="max-w-full" />
    </main>
  )
}
