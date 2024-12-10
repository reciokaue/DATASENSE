import { cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex cursor-pointer h-7 leading-3 gap-1 items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-primary/20',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        ghost:
          'hover:bg-accent hover:text-accent-foreground border-none text-primary/90',

        1: 'border-none bg-blue-50 text-blue-600 hover:bg-blue-100 hover:border-blue-300',

        // Amarelo
        2: 'border-none bg-yellow-50 text-yellow-600 hover:bg-yellow-100 hover:border-yellow-300',

        // Vermelho
        3: 'border-none bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300',

        // Verde
        4: 'border-none bg-green-50 text-green-600 hover:bg-green-100 hover:border-green-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: any
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
