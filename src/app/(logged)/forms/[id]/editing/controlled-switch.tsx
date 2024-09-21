import { Controller } from 'react-hook-form'

import { Switch } from '@/src/components/ui/switch'

interface SelectProps {
  control: any
  name: string
}

export function ControlledSwitch({ control, name }: SelectProps) {
  return (
    <div className="flex flex-col  items-start gap-2">
      <Controller
        control={control}
        name={name}
        render={(required) => {
          if (required === undefined) required?.field?.onChange(false)

          return (
            <Switch
              checked={required.field.value}
              onCheckedChange={(value: boolean) =>
                required.field.onChange(value)
              }
            />
          )
        }}
      />
    </div>
  )
}
