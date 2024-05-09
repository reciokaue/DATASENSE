'use client'

import { Plus, X } from 'lucide-react'
import React, { HTMLProps } from 'react'

import { cn } from '@/src/lib/utils'

import { Badge } from './badge'

interface TagListProps extends HTMLProps<HTMLDivElement> {
  tags: string[]
  direction?: 'vertical' | 'horizontal'
  icon?: 'remove' | 'add' | 'no-icon'
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost'
  onTagClick?: (tag: string) => void
}

export function TagList({
  tags,
  direction = 'horizontal',
  icon = 'remove',
  variant = 'secondary',
  onTagClick,
  ...rest
}: TagListProps) {
  return (
    <div
      className={cn(
        'flex max-w-[450px] gap-2 py-2',
        rest.className,
        direction === 'horizontal' ? 'flex-wrap' : 'flex-col',
      )}
    >
      {tags.map((tag) => (
        <Badge onClick={() => onTagClick(tag)} key={tag} variant={variant}>
          {tag}
          {
            {
              add: <Plus size={14} />,
              remove: <X size={14} />,
              'no-icon': null,
            }[icon]
          }
        </Badge>
      ))}
    </div>
  )
}
