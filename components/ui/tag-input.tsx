'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { HTMLProps } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '../ui/input'
import { TagList } from './tag-list'

export interface TagInputProps extends HTMLProps<HTMLInputElement> {
  tags: string[]
  subtext?: string
  setTags: (tags: string[]) => void
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
    tag: z
      .string()
      .min(3, 'Mínimo de 3 caracteres')
      .refine((tag) => !tags.includes(tag), {
        message: 'Este tópico já existe',
      }),
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

  function handleRemoveTag(removedTag: string) {
    setTags(tags.filter((tag) => tag !== removedTag))
  }

  function handleKeyDown(data: Props) {
    setTags([...tags, data.tag])
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
