import { HelpCircle } from 'lucide-react'
import { HTMLProps } from 'react'
import { Controller, ControllerProps } from 'react-hook-form'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface LabelDivProps extends HTMLProps<HTMLDivElement> {
  title: string
  tooltip?: string
  labelFor?: string
  control?: any
  render?: ControllerProps['render']
}

export function LabelDiv({
  title,
  tooltip,
  labelFor,
  render,
  control,
  ...rest
}: LabelDivProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <div className="flex w-full flex-col justify-start gap-2">
          <TooltipTrigger className="flex items-center gap-2">
            <label className="text-sm font-medium" htmlFor={labelFor}>
              {title}
            </label>
            {tooltip && (
              <HelpCircle size={18} className="text-muted-foreground" />
            )}
          </TooltipTrigger>
          <div {...rest}>
            {rest.children}
            {render && (
              <Controller
                control={control}
                name={rest.name || ''}
                render={render}
              />
            )}
          </div>
        </div>
        {tooltip && (
          <TooltipContent className="max-w-xs">
            <p>{tooltip}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}
