'use client'

import { useState } from 'react'

import { QuestionCard } from '@/components/question-card'
import { SortableItem } from '@/components/sortable/sortable-item'
import { SortableList } from '@/components/sortable/sortable-list'

interface QuestionListProps {
  questions: { id: number }[]
}

export function QuestionList({ questions }: QuestionListProps) {
  const [items, setItems] = useState(questions)

  return (
    <div className="flex">
      <SortableList
        items={items}
        onChange={setItems}
        renderItem={(item) => (
          <SortableItem id={item.id}>
            <QuestionCard item={item} />
          </SortableItem>
        )}
      />
    </div>
  )
}
