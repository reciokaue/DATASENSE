'use client'

import { PopoverClose } from '@radix-ui/react-popover'
import { format, subMonths } from 'date-fns'
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
import { useQueryParams } from '@/utils/useQueryParams'

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  // date: DateRange | undefined
  // setDate: (date: DateRange | undefined) => void
}

export function DateRangePicker({
  // date,
  // setDate,
  ...rest
}: DateRangePickerProps) {
  const { setMultipleQueryParams, searchParams, removeQueryParam } =
    useQueryParams()

  const from = JSON.parse(searchParams.get('from'))
  const to = JSON.parse(searchParams.get('to'))

  function handleChangeDate(date: DateRange) {
    setMultipleQueryParams({
      from: JSON.stringify(date.from),
      to: JSON.stringify(date.to),
    })
  }

  function handleClearFilter() {
    removeQueryParam(['from', 'to'])
  }

  return (
    <div className={cn('grid gap-2', rest.className)} {...rest}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant="outline">
            <CalendarIcon className="size-4" />
            {from ? (
              to ? (
                <>
                  {format(from, 'd LLL')}
                  {' até '}
                  {format(to, "d' de 'LLL")}
                </>
              ) : (
                format(from, 'LLL dd, y')
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
            defaultMonth={subMonths(new Date(), 1)}
            selected={{
              from,
              to,
            }}
            onSelect={handleChangeDate}
            numberOfMonths={2}
          />
          <div className="flex p-2">
            <PopoverClose asChild>
              <Button onClick={handleClearFilter}>Limpar</Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
