/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Eye, EyeOff, Search } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

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
            'border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <Button
            onClick={(e) => toggleVisibility(e)}
            className="text-primary/70 absolute right-0 top-0 aspect-square h-full px-1"
            variant="link"
          >
            {isVisible ? <Eye /> : <EyeOff />}
          </Button>
        )}
        {search && (
          <Search className="text-muted-foreground absolute right-3 top-0 h-full w-4" />
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
