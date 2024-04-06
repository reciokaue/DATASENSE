'use client'

import { Label } from '@radix-ui/react-label'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { TagInput } from '@/components/ui/tag-input'
import { TagList } from '@/components/ui/tag-list'
import { Textarea } from '@/components/ui/textarea'
import { useTopics } from '@/contexts/topics'

export default function TopicCreation() {
  const [removedTopics, setRemovedTopics] = useState<string[]>([])
  const [newTopics, setNewTopics] = useState<string[]>([])
  const [manual, setManual] = useState(false)
  const { topics, addNewTopics, removeTopics } = useTopics()

  const handleRemoveTags = async () => {
    addNewTopics(newTopics)
    setRemovedTopics([])
  }

  const handleSaveNewTags = async () => {
    removeTopics(removedTopics)
    setNewTopics([])
  }

  return (
    <main className="flex h-full flex-col justify-start gap-10 py-10">
      <div className="flex flex-col gap-10 md:flex-row">
        <section className="flex max-w-[450px] flex-col items-start space-y-6">
          <div className="flex flex-col items-start space-y-2">
            <Label>Criar Tópicos</Label>
            <TagInput
              placeholder="digite um tópico"
              tags={newTopics}
              className="sm:min-w-[450px]"
              setTags={setNewTopics}
              subtext="Estes são os tópicos nos quais você está interessado."
              variant="default"
            />
          </div>
          {manual && (
            <Textarea
              className="h-32 resize-none"
              placeholder='Digite os valores separados por virgula, ex: "tópico1, tópico2"'
              onChange={(e) =>
                setNewTopics(e.target.value.split(',').map((v) => v.trim()))
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
              tags={removedTopics}
              setTags={setRemovedTopics}
              className="sm:min-w-[450px]"
              subtext="Selecione todos os tópicos que deseja excluir"
              variant="default"
            />
          </div>
          <div className="flex w-full justify-start gap-2">
            <Button onClick={handleRemoveTags} variant="destructive">
              Deletar
            </Button>
            <Button onClick={() => setRemovedTopics([])} variant="secondary">
              Cancelar
            </Button>
          </div>
        </section>
      </div>
      {topics && (
        <TagList
          tags={topics.filter((tag: string) => !removedTopics.includes(tag))}
          onTagClick={(tag) => setRemovedTopics((prev) => [...prev, tag])}
          className="max-w-full"
        />
      )}
    </main>
  )
}
