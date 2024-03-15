'use client'

import { useState } from 'react'

import { SortableItem } from '@/components/sortable/sortable-item'
import { SortableList } from '@/components/sortable/sortable-list'

interface ClassificationProps {
  options: {
    id: string
    text: string
    value: number
    icon?: string
    questionId: string
  }[]
}

export function Classification({ options }: ClassificationProps) {
  const [items, setItems] = useState(options)

  return (
    <div className="flex w-full flex-col gap-2">
      <SortableList
        items={items}
        onChange={setItems}
        renderItem={(item) => (
          <SortableItem id={item.id}>
            <button
              className="flex w-full items-center justify-start gap-2 rounded-md bg-background  px-4 py-4"
              onClick={(e) => e.preventDefault()}
              key={item.id}
            >
              <span className="text-4xl">😃</span>
              <p className="">{item.text}</p>
            </button>
          </SortableItem>
        )}
      />
    </div>
  )
}
