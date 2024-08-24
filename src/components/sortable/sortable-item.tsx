import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import type { CSSProperties, HTMLProps, PropsWithChildren } from 'react'
import React, { createContext, useContext, useMemo } from 'react'

interface Props extends HTMLProps<HTMLLIElement> {
  sortableId: UniqueIdentifier
  isEditing?: boolean
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

export function SortableItem({
  children,
  sortableId,
  isEditing = true,
  ...rest
}: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: sortableId })
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
        id={`sortable-${sortableId}`}
        className="flex flex-grow items-center "
        ref={setNodeRef}
        style={style}
        {...rest}
      >
        {children}
        {isEditing ? <DragHandle /> : null}
      </li>
    </SortableItemContext.Provider>
  )
}

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext)

  return (
    <button
      className="x-1 ml-1 rounded-sm py-2 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      {...attributes}
      {...listeners}
      ref={ref}
      onClick={(e) => e.preventDefault()}
    >
      <GripVertical className="h-5 w-5" />
    </button>
  )
}
