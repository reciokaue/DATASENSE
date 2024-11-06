'use client'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Smile } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface EmojiPickerProps {
  control: any
  name: string
}
export function InputEmojiPicker({ control, name }: EmojiPickerProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-xl">
                <Smile />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="right" align="start">
              <Picker
                data={data}
                onEmojiSelect={(emoji: any) => {
                  field.onChange(
                    field.value ? field.value + emoji.native : emoji.native,
                  )
                }}
                locale="pt"
              />
            </PopoverContent>
          </Popover>
          <Input
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
            placeholder="Texto da opção"
            styles="flex-1"
          />
        </>
      )}
    />
  )
}
