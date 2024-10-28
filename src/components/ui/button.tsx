import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Check, Loader2 } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { cn } from '@/src/lib/utils'

const buttonVariants = cva(
  'inline-flex relative items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90 focus-visible:bg-primary/90 focus-visible:font-bold',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        xl: 'h-14 rounded-md px-8 text-2xl',
        icon: 'h-10 w-10 ',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  link?: string
  isLoading?: boolean
  isSuccess?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      isSuccess,
      asChild = false,
      link,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const buttonElement = (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={isLoading || props.disabled}
      >
        {props.children}
        {isLoading ? (
          <div className="absolute flex w-full justify-center bg-inherit">
            <Loader2 className=" size-4 animate-spin" />
          </div>
        ) : (
          isSuccess && <Check className="size-4" />
        )}
      </Comp>
    )

    return !link ? buttonElement : <Link href={link}>{buttonElement}</Link>
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
