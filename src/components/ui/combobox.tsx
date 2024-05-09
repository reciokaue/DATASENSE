'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/src/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/src/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover'
import { cn } from '@/src/lib/utils'

interface Option {
  label: string
  value: string
}
interface ComboboxProps {
  frameworks: Array<Option>
  title: string
  defaultValue?: string
  styles?: string
  handleSetValue: (topic: string) => void
}

export function Combobox({
  frameworks,
  title,
  styles,
  defaultValue = '',
  handleSetValue,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue)

  function setComboboxValue(framework: Option) {
    const newValue = framework.value === value ? '' : framework.value

    setValue(newValue)
    handleSetValue(newValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={'w-full justify-between ' + styles}
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : title}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mx-0 w-full p-0" align="start" sideOffset={10}>
        <Command className="w-full">
          <CommandInput placeholder={title} />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks?.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={() => {
                  setComboboxValue(framework)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === framework.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
