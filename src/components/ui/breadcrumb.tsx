import { Slot } from '@radix-ui/react-slot'
import { ChevronRightIcon, CircleEllipsis as EllipsisIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { Icon } from './icon'
import { Skeleton } from './skeleton'

const BreadcrumbWrapper = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
BreadcrumbWrapper.displayName = 'BreadcrumbWrapper'

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<'ol'>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
      className,
    )}
    {...props}
  />
))
BreadcrumbList.displayName = 'BreadcrumbList'

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('inline-flex items-center gap-1.5', className)}
    {...props}
  />
))
BreadcrumbItem.displayName = 'BreadcrumbItem'

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      ref={ref}
      className={cn('transition-colors hover:text-foreground', className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = 'BreadcrumbLink'

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('font-normal text-foreground', className)}
    {...props}
  />
))
BreadcrumbPage.displayName = 'BreadcrumbPage'

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:h-3.5 [&>svg]:w-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRightIcon />}
  </li>
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <EllipsisIcon className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis'

interface BreadcrumbProps {
  steps: {
    title?: string
    icon?: string
    href?: string
  }[]
}

const Breadcrumb = ({ steps }: BreadcrumbProps) => (
  <BreadcrumbWrapper>
    <BreadcrumbList>
      {steps.map((step, index) => (
        <BreadcrumbItem key={step.title || Math.random()}>
          {!step?.title ? (
            <Skeleton className="h-5 w-20" />
          ) : steps.length === index + 1 ? (
            <BreadcrumbPage className="flex items-center gap-2 font-semibold">
              <Icon name={step.icon} className="size-4" />
              {step.title}
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              className="flex items-center gap-2 font-semibold"
              href={step.href}
            >
              <Icon name={step.icon} className="size-4" />
              {step.title}
            </BreadcrumbLink>
          )}
          {index + 1 < steps.length && <BreadcrumbSeparator />}
        </BreadcrumbItem>
      ))}
    </BreadcrumbList>
  </BreadcrumbWrapper>
)
Breadcrumb.displayName = 'Breadcrumb'

export {
  Breadcrumb,
  BreadcrumbWrapper,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
