'use client'

import { useQuery } from '@tanstack/react-query'
import { Plus, Search } from 'lucide-react'
import Link from 'next/link'

import { PreviewQuestionCard } from '@/components/question-card/preview-question-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useTopics } from '@/contexts/topics'
import { api } from '@/lib/api'

export default function QuestionsPage() {
  const { topics } = useTopics()

  const { data: questions } = useQuery({
    queryKey: ['public-questions'],
    queryFn: async () => {
      const response = await api.get(`/questions`, {
        params: { pageSize: 6, isPublic: true },
      })

      return response.data
    },
  })

  return (
    <div className="flex flex-1 flex-col pt-2">
      <header className="flex items-center justify-between py-2">
        <h1 className="text-3xl font-semibold text-primary">
          Questões Populares
        </h1>
        <Link href="/admin/questions/create">
          <Button size="sm" className="text-xs">
            Add <Plus size={10} />
          </Button>
        </Link>
      </header>
      <section>
        <div className="mt-2 flex flex-wrap gap-1">
          {topics &&
            ['Todas', ...topics, '...'].map((tag) => (
              <Badge
                variant={['Todas', '...'].includes(tag) ? 'default' : 'ghost'}
                key={tag}
              >
                {tag}
              </Badge>
            ))}
        </div>
        <div className="relative mt-4 w-full">
          <span className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center">
            <Search className="text-primary/60" size={20} />
          </span>
          <Input
            type="email"
            placeholder="Procurar..."
            className="w-full pl-10"
          />
        </div>
        <h1 className="mt-8 text-xl font-semibold">Todas</h1>
        <section className="g mt-5 flex flex-wrap justify-stretch gap-2">
          {questions
            ? questions?.map((question: any) => (
                <PreviewQuestionCard question={question} key={question.id} />
              ))
            : [1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton
                  key={`skeleton-${i}`}
                  className=" min-h-32 min-w-[309px]"
                />
              ))}
        </section>
      </section>
    </div>
  )
}
