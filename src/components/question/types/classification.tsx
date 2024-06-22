'use client'

import { Smile } from 'lucide-react'
import { useState } from 'react'

import { SortableItem } from '@/src/components/sortable/sortable-item'
import { SortableList } from '@/src/components/sortable/sortable-list'

interface ClassificationProps {
  options: {
    id: string
    text: string
    value: number
    icon?: string
    questionId: string
    emoji?: string
  }[]
}

export function Classification({ options }: ClassificationProps) {
  const [items, setItems] = useState(options)

  return (
    <div className="flex w-full flex-col gap-2">
      {/* <SortableList
        items={items}
        onChange={setItems}
        renderItem={(item) => (
          <SortableItem id={item.id} key={`${item.id}-classification`}>
            <button
              className="flex w-full items-center justify-start gap-2 rounded-md bg-background  px-4 py-4"
              onClick={(e) => e.preventDefault()}
              key={item.id}
            >
              <span className="text-4xl">
                {item.emoji || (
                  <Smile className="h-14 w-14 text-muted-foreground" />
                )}
              </span>
              <p className="">{item.text}</p>
            </button>
          </SortableItem>
        )}
      /> */}
    </div>
  )
}
