/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { type VariantProps } from 'class-variance-authority'
import React from 'react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { toast } from '../ui/use-toast'
import { tagVariants } from './tag'
import { TagList } from './tag-list'

export enum Delimiter {
  Comma = ',',
  Enter = 'Enter',
  Space = ' ',
}

type OmittedInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'value'
>

export interface TagInputProps
  extends OmittedInputProps,
    VariantProps<typeof tagVariants> {
  placeholder?: string
  tags: Array<string>
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  maxTags?: number
  minTags?: number
  readOnly?: boolean
  disabled?: boolean
  onTagAdd?: (tag: string) => void
  onTagRemove?: (tag: string) => void
  allowDuplicates?: boolean
  validateTag?: (tag: string) => boolean
  delimiter?: Delimiter
  showCount?: boolean
  placeholderWhenFull?: string
  sortTags?: boolean
  delimiterList?: string[]
  truncate?: number
  minLength?: number
  maxLength?: number
  usePopoverForTags?: boolean
  value?: string | number | readonly string[] | { id: string; text: string }[]
  direction?: 'row' | 'column'
  onInputChange?: (value: string) => void
  customTagRenderer?: (tag: string) => React.ReactNode
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onTagClick?: (tag: string) => void
  draggable?: boolean
  inputFieldPostion?: 'bottom' | 'top' | 'inline'
  clearAll?: boolean
  onClearAll?: () => void
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  (props, ref) => {
    const {
      id,
      placeholder,
      tags,
      setTags,
      variant,
      size,
      shape,
      className,
      maxTags,
      delimiter = Delimiter.Comma,
      onTagAdd,
      onTagRemove,
      allowDuplicates,
      showCount,
      validateTag,
      placeholderWhenFull = 'Max tags reached',
      sortTags,
      delimiterList,
      truncate,
      borderStyle,
      textCase,
      interaction,
      animation,
      textStyle,
      minLength,
      maxLength,
      direction = 'row',
      onInputChange,
      customTagRenderer,
      onFocus,
      onBlur,
      onTagClick,
      draggable = false,
      inputFieldPostion = 'bottom',
      clearAll = false,
      onClearAll,
      usePopoverForTags = false,
      inputProps = {},
      disabled = false,
    } = props

    const [inputValue, setInputValue] = React.useState('')
    const [tagCount, setTagCount] = React.useState(Math.max(0, tags.length))
    const inputRef = React.useRef<HTMLInputElement>(null)

    if (
      (maxTags !== undefined && maxTags < 0) ||
      (props.minTags !== undefined && props.minTags < 0)
    ) {
      console.warn('maxTags and minTags cannot be less than 0')
      toast({
        title: 'maxTags and minTags cannot be less than 0',
        description:
          'Please set maxTags and minTags to a value greater than or equal to 0',
        variant: 'destructive',
      })
      return null
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      onInputChange?.(newValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        delimiterList
          ? delimiterList.includes(e.key)
          : e.key === delimiter || e.key === Delimiter.Enter
      ) {
        e.preventDefault()
        const newTagText = inputValue.trim()

        if (validateTag && !validateTag(newTagText)) {
          return
        }

        if (minLength && newTagText.length < minLength) {
          console.warn('Tag is too short')
          toast({
            title: 'Tag is too short',
            description: 'Please enter a tag with more characters',
            variant: 'destructive',
          })
          return
        }

        // Validate maxLength
        if (maxLength && newTagText.length > maxLength) {
          toast({
            title: 'Tag is too long',
            description: 'Please enter a tag with less characters',
            variant: 'destructive',
          })
          console.warn('Tag is too long')
          return
        }
        if (
          newTagText &&
          (allowDuplicates || !tags.some((tag) => tag === newTagText)) &&
          (maxTags === undefined || tags.length < maxTags)
        ) {
          setTags([...tags, newTagText])
          onTagAdd?.(newTagText)
          setTagCount((prevTagCount) => prevTagCount + 1)
        }
        setInputValue('')
      }
    }

    const removeTag = (idToRemove: string) => {
      setTags(tags.filter((tag) => tag !== idToRemove))
      onTagRemove?.(tags.find((tag) => tag === idToRemove) || '')
      setTagCount((prevTagCount) => prevTagCount - 1)
    }

    const onSortEnd = (oldIndex: number, newIndex: number) => {
      setTags((currentTags) => {
        const newTags = [...currentTags]
        const [removedTag] = newTags.splice(oldIndex, 1)
        newTags.splice(newIndex, 0, removedTag)

        return newTags
      })
    }

    const handleClearAll = () => {
      onClearAll?.()
    }
    const displayedTags = sortTags ? [...tags].sort() : tags

    const truncatedTags = truncate
      ? tags.map((tag) =>
          tag.length > truncate ? `${tag.substring(0, truncate)}...` : tag,
        )
      : displayedTags

    return (
      <div
        className={`flex w-full gap-3 ${
          inputFieldPostion === 'bottom'
            ? 'flex-col'
            : inputFieldPostion === 'top'
              ? 'flex-col-reverse'
              : 'flex-row'
        }`}
      >
        {!usePopoverForTags ? (
          <TagList
            tags={truncatedTags}
            customTagRenderer={customTagRenderer}
            variant={variant}
            size={size}
            shape={shape}
            borderStyle={borderStyle}
            textCase={textCase}
            interaction={interaction}
            animation={animation}
            textStyle={textStyle}
            onTagClick={onTagClick}
            draggable={draggable}
            onSortEnd={onSortEnd}
            onRemoveTag={removeTag}
            direction={direction}
          />
        ) : null}
        <div className="w-full">
          {!usePopoverForTags && (
            <Input
              ref={inputRef}
              id={id}
              type="text"
              placeholder={
                maxTags !== undefined && tags.length >= maxTags
                  ? placeholderWhenFull
                  : placeholder
              }
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={onFocus}
              onBlur={onBlur}
              {...inputProps}
              className={className}
              disabled={
                disabled || (maxTags !== undefined && tags.length >= maxTags)
              }
            />
          )}
        </div>
        {showCount && maxTags && (
          <div className="flex">
            <span className="ml-auto mt-1 text-sm text-muted-foreground">
              {`${tagCount}`}/{`${maxTags}`}
            </span>
          </div>
        )}
        {clearAll && (
          <Button type="button" onClick={handleClearAll} className="mt-2">
            Clear All
          </Button>
        )}
      </div>
    )
  },
)

TagInput.displayName = 'TagInput'

export { TagInput }
