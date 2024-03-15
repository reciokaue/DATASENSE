import { HelpCircle } from 'lucide-react'
import { ReactNode } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface LabelDivProps {
  title: string
  tooltip?: string
  labelFor?: string
  child?: ReactNode
  children?: ReactNode
  styles?: string
}

export function LabelDiv({
  title,
  tooltip,
  labelFor,
  styles,
  child,
  children,
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
          <div className={styles}>
            {child} {children}
          </div>
        </div>
        <TooltipContent className="max-w-xs">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
