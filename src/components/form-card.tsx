import { ClipboardType, Mails } from 'lucide-react'
import { ComponentProps } from 'react'

import { FormDTO } from '../DTOs/form'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

interface FormCardProps extends ComponentProps<'div'> {
  data: FormDTO
}

export function FormCard({ data, ...rest }: FormCardProps) {
  return (
    <Card
      {...rest}
      className="group flex h-full max-h-52 cursor-pointer flex-col justify-between bg-transparent ring-primary group-hover:border-primary aria-selected:ring-2"
    >
      <CardHeader className="p flex-1">
        <CardTitle className="mb-2 flex items-center gap-2">
          {data.name}
        </CardTitle>
        <CardDescription className="line-clamp-4">{data.about}</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
        <div className="flex items-center gap-2">
          <ClipboardType className="h-3 w-3 text-violet-400" />
          {data._count.questions}
        </div>
        <div className="flex items-center gap-2">
          <Mails className="h-3 w-3 text-sky-400" />
          {data._count.sessions}
        </div>
      </CardFooter>
    </Card>
  )
}
