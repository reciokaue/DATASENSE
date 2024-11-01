'use client'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Smile } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface EmojiPickerProps {
  control: any
  name: string
}
export function EmojiPicker({ control, name }: EmojiPickerProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={(text) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-xl">
              {text.field.value || <Smile />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="right" align="start">
            <Picker
              data={data}
              onEmojiSelect={(emoji: any) => text.field.onChange(emoji.native)}
              locale="pt"
            />
          </PopoverContent>
        </Popover>
      )}
    />
  )
}
