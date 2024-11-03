/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Eye, EyeOff, Search } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/src/lib/utils'

import { Button } from './button'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  styles?: string
  search?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, styles, search = false, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)

    const toggleVisibility = (e: any) => {
      e.preventDefault()
      setIsVisible(!isVisible)
    }

    const typeState =
      type === 'password' ? (isVisible ? 'text' : 'password') : type

    return (
      <div className={cn('relative', styles)}>
        <input
          type={typeState}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <Button
            onClick={(e) => toggleVisibility(e)}
            className="absolute right-0 top-0 aspect-square h-full px-1 text-primary/70"
            variant="link"
          >
            {isVisible ? <Eye /> : <EyeOff />}
          </Button>
        )}
        {search && (
          <Search className="absolute right-3 top-0 h-full w-4 text-muted-foreground" />
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
