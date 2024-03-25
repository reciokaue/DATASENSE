'use client'

import React from 'react'
import SortableList, { SortableItem } from 'react-easy-sort'

import { cn } from '@/lib/utils'

import { Tag, TagProps } from './tag'

export type TagListProps = {
  tags: string[]
  direction?: TagProps['direction']
  className?: string
  addIcon?: boolean
} & Omit<TagProps, 'tagObj'>

const DropTarget: React.FC = () => {
  return <div className={cn('h-full rounded-md bg-secondary/50')} />
}

export const TagList: React.FC<TagListProps> = ({
  tags,
  direction = 'row',
  draggable = false,
  className,
  addIcon = false,
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
                <Tag
                  draggable={undefined}
                  direction={undefined}
                  tagObj={tagObj}
                  {...tagListProps}
                  addIcon={addIcon}
                />
              </div>
            </SortableItem>
          ))}
        </SortableList>
      ) : (
        tags.map((tagObj) => (
          <Tag
            draggable={undefined}
            direction={undefined}
            key={tagObj}
            tagObj={tagObj}
            {...tagListProps}
            addIcon={addIcon}
          />
        ))
      )}
    </div>
  )
}
