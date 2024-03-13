'use client'

import React from 'react'
import SortableList, { SortableItem } from 'react-easy-sort'

import { cn } from '@/lib/utils'

import { Tag, TagProps } from './tag'

export type TagListProps = {
  tags: string[]
  customTagRenderer?: (tag: string) => React.ReactNode
  direction?: TagProps['direction']
  onSortEnd?: (oldIndex: number, newIndex: number) => void
  className?: string
} & Omit<TagProps, 'tagObj'>

const DropTarget: React.FC = () => {
  return <div className={cn('h-full rounded-md bg-secondary/50')} />
}

export const TagList: React.FC<TagListProps> = ({
  tags,
  customTagRenderer = false,
  direction = 'row',
  draggable = false,
  onSortEnd,
  className,
  ...tagListProps
}) => {
  const [draggedTagId, setDraggedTagId] = React.useState<string | null>(null)

  const handleMouseDown = (id: string) => {
    setDraggedTagId(id)
  }

  const handleMouseUp = () => {
    setDraggedTagId(null)
  }

  return (
    <div
      className={cn('max-w-[450px] rounded-md', className, {
        'flex flex-wrap gap-2': direction === 'row',
        'flex flex-col gap-2': direction === 'column',
      })}
    >
      {draggable ? (
        <SortableList
          onSortEnd={onSortEnd}
          className="list flex flex-wrap gap-2"
          dropTarget={<DropTarget />}
        >
          {tags.map((tagObj) => (
            <SortableItem key={tagObj}>
              <div
                onMouseDown={() => handleMouseDown(tagObj)}
                onMouseLeave={handleMouseUp}
                className={cn(
                  {
                    'rounded-md border border-solid border-primary':
                      draggedTagId === tagObj,
                  },
                  'transition-all duration-200 ease-in-out',
                )}
              >
                {customTagRenderer ? (
                  customTagRenderer(tagObj)
                ) : (
                  <Tag
                    draggable={undefined}
                    direction={undefined}
                    tagObj={tagObj}
                    {...tagListProps}
                  />
                )}
              </div>
            </SortableItem>
          ))}
        </SortableList>
      ) : (
        tags.map((tagObj) =>
          customTagRenderer ? (
            customTagRenderer(tagObj)
          ) : (
            <Tag
              draggable={undefined}
              direction={undefined}
              key={tagObj}
              tagObj={tagObj}
              {...tagListProps}
            />
          ),
        )
      )}
    </div>
  )
}
