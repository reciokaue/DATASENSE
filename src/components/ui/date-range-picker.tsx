'use client'

import { addDays, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  // date: DateRange | undefined
  // setDate: (date: DateRange | undefined) => void
}

export function DateRangePicker({
  // date,
  // setDate,
  ...rest
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: null,
    to: new Date(),
  })

  return (
    <div className={cn('grid gap-2', rest.className)} {...rest}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant="outline">
            <CalendarIcon className="size-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'd LLL')}
                  {' até '}
                  {format(date.to, "d' de 'LLL")}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span className="text-large font-normal">
                Selecionar Período?
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
