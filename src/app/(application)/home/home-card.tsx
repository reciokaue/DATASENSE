import { ClipboardType, Mails } from 'lucide-react'
import { HTMLAttributes } from 'react'

import { Form } from '@/models'

interface HomeCardProps extends HTMLAttributes<HTMLDivElement> {
  form: Form
}

export function HomeCard({ form, ...rest }: HomeCardProps) {
  return (
    <div
      {...rest}
      className={
        'bg-homeCard text-homeCard-foreground relative flex h-full max-h-52 cursor-pointer flex-col justify-between rounded-xl border transition-[brightness] hover:brightness-95 group-hover:border-primary ' +
        rest.className
      }
    >
      <div className="flex flex-1 flex-col space-y-1.5 p-6">
        <h1 className="mb-2 flex items-center gap-2 font-semibold leading-none tracking-tight">
          {form.name}
        </h1>
        <p className="line-clamp-4 text-sm text-muted-foreground">
          {form.description}
        </p>
      </div>
      <div className="flex items-center gap-3 p-6 pt-0 text-xs font-semibold text-muted-foreground">
        <div className="flex items-center gap-2">
          <ClipboardType className="h-3 w-3 text-violet-400" />
          {form?._count?.questions}
        </div>
        <div className="flex items-center gap-2">
          <Mails className="h-3 w-3 text-sky-400" />
          {form?._count?.sessions}
        </div>
      </div>
    </div>
  )
}
