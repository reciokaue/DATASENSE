import { useCallback, useState } from 'react'

// import { z } from 'zod'
import { TopicPicker } from '@/src/components/topic-picker'
import { Input } from '@/src/components/ui/input'
import { TagList } from '@/src/components/ui/tag-list'
import { TopicDTO } from '@/src/DTOs/topic'
import { debounce } from '@/src/utils/debounce'
import { useQueryParams } from '@/src/utils/useQueryParams'

// interface FiltersProps {}

export function Filters() {
  const [selectedTopics, setSelectedTopics] = useState<TopicDTO[]>([])
  const { setQueryParam } = useQueryParams()

  // const search = z.string().parse(searchParams.get('search') ?? '')

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
    <div className="flex flex-col">
      <TagList
        tags={selectedTopics}
        onTagClick={() => {}}
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
  )
}
