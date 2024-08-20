import { ClipboardType, Mails } from 'lucide-react'

import { FormDTO } from '@/src/DTOs/form'

interface CardProps {
  form: FormDTO
}

export function Card({ form }: CardProps) {
  return (
    <div className="flex h-full max-h-52 flex-col justify-between rounded-xl border bg-card text-card-foreground group-hover:border-primary">
      <div className="flex flex-1 flex-col space-y-1.5 p-6">
        <h1 className="mb-2 flex items-center gap-2 font-semibold leading-none tracking-tight">
          {form.name}
        </h1>
        <p className="line-clamp-4 text-sm text-muted-foreground">
          {form.about}
        </p>
      </div>
      <div className="flex items-center gap-3 p-6 pt-0 text-xs font-semibold text-muted-foreground">
        <div className="flex items-center gap-2">
          <ClipboardType className="h-3 w-3 text-violet-400" />
          {form._count.questions}
        </div>
        <div className="flex items-center gap-2">
          <Mails className="h-3 w-3 text-sky-400" />
          {form._count.responses}
        </div>
      </div>
    </div>
  )
}
