'use client'

import {
  addMinutes,
  format,
  getMinutes,
  setHours,
  setMinutes,
  subMinutes,
} from 'date-fns'
import { ChevronDown, ChevronUp, Clock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'

interface TimePickerProps {
  setDate: (date: Date) => void
  date: Date
}

export function TimePicker({ setDate, date }: TimePickerProps) {
  function addHalfHour() {
    setDate(addMinutes(date, calcHour().add))
  }
  function subtractHalfHour() {
    setDate(subMinutes(date, calcHour().sub))
  }
  function calcHour() {
    const minutes = getMinutes(date)
    if (minutes === 0 || minutes === 30) return { add: 30, sub: 30 }

    const roundedTime = (Math.round(minutes / 30) * 30) % 60
    const difference = roundedTime - minutes

    return {
      add: difference > 0 ? difference : 60 + difference,
      sub: Math.abs(difference),
    }
  }

  function onChangeHour(hours: string) {
    setDate(setHours(date, +hours))
  }
  function onChangeMinutes(minutes: string) {
    setDate(setMinutes(date, +minutes))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'flex flex-1 items-center justify-start gap-2 rounded-lg border-2 border-border bg-background p-4 text-primary/70',
            !date && 'text-primary/40',
          )}
        >
          <Clock className="ml-2 size-5" />
          {date ? format(date, 'HH:mm') : <span>Horário</span>}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-border bg-popover p-6 text-primary shadow-lg">
        <h1 className="my-6 text-2xl font-semibold text-primary">
          Selecionar horário
        </h1>
        <div className="flex flex-col space-y-2">
          <header className="grid grid-cols-5 gap-2 ">
            <h2 className="col-span-2 text-xl text-primary/80">Horas</h2>
            <h2 className="col-span-2 text-xl text-primary/80">Minutos</h2>
          </header>
          <section className="grid grid-cols-5 gap-2 ">
            <input
              type="number"
              max={24}
              min={0}
              onChange={(e) => onChangeHour(e.target.value)}
              className="col-span-2 rounded-md bg-muted px-5 py-2 text-center font-mono text-5xl font-semibold text-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              value={format(date, 'HH')}
            />
            <input
              type="number"
              max={24}
              min={0}
              onChange={(e) => onChangeMinutes(e.target.value)}
              value={format(date, 'mm')}
              className="col-span-2 rounded-md bg-muted px-5 py-2 text-center font-mono text-5xl font-semibold text-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <aside className="grid h-full grid-rows-2 gap-2">
              <button
                onClick={addHalfHour}
                className="rounded-md border-2 border-border px-2 py-1 hover:bg-muted"
              >
                <ChevronUp className="size-10 text-muted-foreground" />
              </button>
              <button
                onClick={subtractHalfHour}
                className="rounded-md border-2 border-border px-2 py-1 hover:bg-muted"
              >
                <ChevronDown className="size-10 text-muted-foreground" />
              </button>
            </aside>
          </section>
        </div>

        <DrawerClose asChild>
          <Button size="lg" className="mt-4 w-full">
            Selecionar
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  )
}
