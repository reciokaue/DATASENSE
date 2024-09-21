import type { Active, UniqueIdentifier } from '@dnd-kit/core'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import type { ReactNode } from 'react'
import React, { useMemo, useState } from 'react'

import { SortableOverlay } from './sortable-overlay'

interface BaseItem {
  id: UniqueIdentifier
  index: number
}

interface Props<T extends BaseItem> {
  items: T[] | any
  // onChange: (items: T[]) => void
  swap: (from: number, to: number) => void
  renderItem: (item: T, index: number) => ReactNode
}

export function SortableList<T extends BaseItem>({
  items,
  // onChange,
  renderItem,
  swap,
}: Props<T>) {
  const [active, setActive] = useState<Active | null>(null)
  const activeItem = useMemo(
    () => items.find((item: T) => item.id === active?.id),
    [active, items],
  )
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active)
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(
            (item: T) => item.id === active.id,
          )
          const overIndex = items.findIndex((item: T) => item.id === over.id)

          swap(activeIndex, overIndex)
          // onChange(arrayMove(items, activeIndex, overIndex))
        }
        setActive(null)
      }}
      onDragCancel={() => {
        setActive(null)
      }}
    >
      <SortableContext items={items}>
        <ul
          className="flex w-full list-none flex-col gap-3 p-0"
          role="application"
        >
          {items.map((item: T, index: number) => (
            <React.Fragment key={item.id}>
              {renderItem(item, index)}
            </React.Fragment>
          ))}
        </ul>
      </SortableContext>
      {/* <SortableOverlay>
        {activeItem ? renderItem(activeItem, activeItem?.index) : null}
      </SortableOverlay> */}
    </DndContext>
  )
}
