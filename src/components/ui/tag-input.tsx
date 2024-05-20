'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { HTMLProps } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { TopicDTO } from '@/src/DTOs/topic'

import { Input } from './input'
import { TagList } from './tag-list'

export interface TagInputProps extends HTMLProps<HTMLInputElement> {
  tags: TopicDTO[]
  subtext?: string
  setTags: (tags: TopicDTO[]) => void
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost'
}

export function TagInput({
  tags,
  setTags,
  subtext,
  variant = 'secondary',
  ...rest
}: TagInputProps) {
  const schema = z.object({
    tag: z.string().min(3, 'Mínimo de 3 caracteres'),
  })
  type Props = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Props>({
    resolver: zodResolver(schema),
  })

  function handleRemoveTag(removedTag: TopicDTO) {
    setTags(tags.filter((tag) => tag.id !== removedTag.id))
  }

  function handleKeyDown(data: Props) {
    setTags([
      ...tags,
      {
        id: 0,
        name: data.tag,
      },
    ])
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleKeyDown)}
      className="flex flex-col gap-2"
    >
      <TagList tags={tags} onTagClick={handleRemoveTag} variant={variant} />
      <Input type="text" {...register('tag')} {...rest} />
      <p className="text-[0.8rem] text-muted-foreground">
        {errors.tag?.message || subtext}
      </p>
    </form>
  )
}
