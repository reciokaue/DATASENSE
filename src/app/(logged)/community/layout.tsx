'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'

import { getTopics } from '@/src/api/get-topics'
import { TopicPicker } from '@/src/components/topic-picker'
import { Input } from '@/src/components/ui/input'
import { TagList } from '@/src/components/ui/tag-list'
import { TopicDTO } from '@/src/DTOs/topic'
import { debounce } from '@/src/utils/debounce'
import { useQueryParams } from '@/src/utils/useQueryParams'

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedTopics, setSelectedTopics] = useState<TopicDTO[]>([])
  const { setQueryParam } = useQueryParams()

  const pathname = usePathname()
  const path = pathname?.split('/').pop()

  const { data: topics } = useQuery({
    queryKey: ['topics'],
    queryFn: () => getTopics(0, 100),
  })

  const setSearchOnUrl = useCallback(
    debounce((data) => {
      setQueryParam('search', data)
    }, 500),
    [],
  )

  const updateTopicsUrl = (data: TopicDTO[]) => {
    setQueryParam('topics', data.map((topic) => topic.id).join(','))
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col px-2">
      <nav className="mb-2 flex items-center gap-4 px-6 pt-6">
        <Link
          className="text-2xl font-medium text-primary/60 aria-selected:text-primary"
          href="/community/forms"
          aria-selected={path === 'forms'}
        >
          Formulários
        </Link>
        <span className="text-gray-300">|</span>
        <Link
          className="text-2xl font-medium text-primary/60 aria-selected:text-primary"
          href="/community/questions"
          aria-selected={path === 'questions'}
        >
          Questões
        </Link>
      </nav>
      <div className="flex flex-col gap-4 px-6">
        <TagList
          tags={selectedTopics.length > 0 ? selectedTopics : topics || []}
          onTagClick={() => {}}
          loading={!topics && selectedTopics.length === 0}
          icon="no-icon"
          variant="default"
        />
        <footer className="flex gap-4">
          <Input
            type="email"
            placeholder="Procurar..."
            className="w-full"
            styles="w-full"
            onChange={(e) => setSearchOnUrl(e.target.value)}
          />
          <TopicPicker
            setSelectedTopics={setSelectedTopics}
            selectedTopics={selectedTopics}
            onClose={updateTopicsUrl}
          />
        </footer>
      </div>
      <div className="flex flex-col gap-4 p-6">{children}</div>
    </div>
  )
}
