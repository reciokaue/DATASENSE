import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import type { CSSProperties, PropsWithChildren } from 'react'
import React, { createContext, useContext, useMemo } from 'react'

interface Props {
  id: UniqueIdentifier
}

interface Context {
  attributes: Record<string, any>
  listeners: DraggableSyntheticListeners
  ref(node: HTMLElement | null): void
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
})

export function SortableItem({ children, id }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id })
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef],
  )
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <SortableItemContext.Provider value={context}>
      <li
        className="flex flex-grow items-center"
        ref={setNodeRef}
        style={style}
      >
        {children}
        <DragHandle />
      </li>
    </SortableItemContext.Provider>
  )
}

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext)

  return (
    <button
      className="ml-1 rounded-sm px-1 py-2 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      {...attributes}
      {...listeners}
      ref={ref}
    >
      <GripVertical className="h-5 w-5" />
    </button>
  )
}
