'use client'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Smile } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/src/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover'

interface EmojiPickerProps {
  onSelect: (emoji: string) => void
}

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start text-xl">
          {selected || <Smile />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="right" align="start">
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => {
            setSelected(emoji.native)
            onSelect(emoji.native)
          }}
          locale="pt"
        />
      </PopoverContent>
    </Popover>
  )
}
