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
import { useState } from 'react'

import { Button } from '@/src/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/src/components/ui/drawer'
import { cn } from '@/src/lib/utils'

interface TimePickerProps {
  setDate: (date: Date) => void
  date: Date
}

export function TimePicker({ setDate, date }: TimePickerProps) {
  const [open, setOpen] = useState(false)

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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'flex flex-1 items-center justify-start gap-2 rounded-lg border border-border bg-background p-4',
            !date && 'text-muted',
          )}
        >
          <Clock className="ml-2 size-5 text-muted" />
          {date ? format(date, 'HH:mm') : <span>Horário</span>}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-border bg-popover p-6 text-primary shadow-lg">
        <h1 className="my-6 text-2xl font-semibold text-primary">
          Selecionar horário
        </h1>
        <div className="flex flex-col items-center justify-center space-y-2">
          <header className="flex gap-10">
            <h2 className="w-40 text-xl text-primary/80">Horas</h2>
            <h2 className="w-40 text-xl text-primary/80">Minutos</h2>
            <span className="w-20"></span>
          </header>
          <section className="relative flex items-center justify-center gap-10">
            <input
              type="number"
              max={24}
              min={0}
              onChange={(e) => onChangeHour(e.target.value)}
              className="aspect-square w-40 rounded-md bg-muted px-5 py-2 text-center font-mono text-8xl font-semibold text-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              value={format(date, 'HH')}
            />
            <span className="absolute align-top text-6xl leading-10 text-primary/60">
              :
            </span>
            <input
              type="number"
              max={24}
              min={0}
              onChange={(e) => onChangeMinutes(e.target.value)}
              value={format(date, 'mm')}
              className="aspect-square w-40 rounded-md bg-muted px-5 py-2 text-center font-mono text-8xl font-semibold text-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <aside className="flex h-full flex-col gap-6">
              <button
                onClick={addHalfHour}
                className="rounded border border-border px-2 py-1 hover:bg-muted"
              >
                <ChevronUp className="size-16 text-muted-foreground" />
              </button>
              <button
                onClick={subtractHalfHour}
                className="rounded border border-border px-2 py-1 hover:bg-muted"
              >
                <ChevronDown className="size-16 text-muted-foreground" />
              </button>
            </aside>
          </section>
        </div>

        <DrawerClose asChild>
          <Button size="xl" className="mt-4 w-full">
            Salvar
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  )
}
