import { ClipboardType, Mails } from 'lucide-react'
import Link from 'next/link'

import { FormDTO } from '../DTOs/form'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

export function FormCard({ data }: { data: FormDTO }) {
  return (
    <Link href={`/form/${data.id}`} className="group">
      <Card className="flex h-full max-h-52 flex-col justify-between group-hover:border-primary">
        <CardHeader className="p flex-1">
          <CardTitle className="mb-2 flex items-center gap-2">
            {data.name}
          </CardTitle>
          <CardDescription className="line-clamp-4">
            {data.about}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
          <div className="flex items-center gap-2">
            <ClipboardType className="h-3 w-3 text-violet-400" />
            {data._count.questions}
          </div>
          <div className="flex items-center gap-2">
            <Mails className="h-3 w-3 text-sky-400" />
            {data._count.responses}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
