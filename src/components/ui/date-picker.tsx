'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/src/lib/utils'

import { Button } from './button'
import { Calendar } from './calendar'
import { Drawer, DrawerContent, DrawerTrigger } from './drawer'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export function DatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'flex flex-1 items-center justify-start gap-2 rounded-lg border-2 border-border bg-background p-4 text-primary/70',
            !date && 'text-primary/40',
          )}
        >
          <CalendarIcon className="ml-2 size-5" />
          {date ? format(date, 'PPP') : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export function DatePickerMobile() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'flex flex-1 items-center justify-start gap-2 rounded-lg border-2 border-border bg-background p-4',
            !date && 'text-muted',
          )}
        >
          <CalendarIcon className="ml-2 size-5 text-muted" />
          {date ? format(date, 'PPP') : <span>Selecione uma data</span>}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="w-full"
        />
      </DrawerContent>
    </Drawer>
  )
}
