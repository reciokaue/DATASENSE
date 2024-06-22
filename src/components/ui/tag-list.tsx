'use client'

import { Plus, X } from 'lucide-react'
import React, { HTMLProps } from 'react'

import { TopicDTO } from '@/src/DTOs/topic'
import { cn } from '@/src/lib/utils'

import { Badge } from './badge'

interface TagListProps extends HTMLProps<HTMLDivElement> {
  tags: TopicDTO[]
  direction?: 'vertical' | 'horizontal'
  icon?: 'remove' | 'add' | 'no-icon'
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost'
  onTagClick: (tag: TopicDTO) => void
}

export function TagList({
  tags,
  direction = 'horizontal',
  icon = 'remove',
  variant = 'secondary',
  onTagClick,
  ...rest
}: TagListProps) {
  function normalize(text: string) {
    return text
      .toLowerCase() // Converte o texto todo para minúsculas
      .replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase()
      }) // Capitaliza a primeira letra de cada palavra
  }

  return (
    <div
      className={cn(
        'flex max-w-[450px] gap-2 py-2',
        rest.className,
        direction === 'horizontal' ? 'flex-wrap' : 'flex-col',
      )}
    >
      {tags.map((tag: TopicDTO) => (
        <Badge
          onClick={() => onTagClick(tag)}
          key={`tag-${tag.id}`}
          variant={variant}
        >
          {normalize(tag.name)}
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