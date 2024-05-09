import { ClipboardType, Mails } from 'lucide-react'
import Link from 'next/link'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

export interface FormData {
  id: string
  name: string
  about: string
  active: boolean
  logoUrl: string
  isPublic: boolean
  createdAt: Date
  endedAt: Date
  userId: string
  _count: {
    questions: number
    sessions: number
    topics: number
    responses: number
  }
}

export function FormCard({ data }: { data: FormData }) {
  return (
    <Link href={`/form/${data.id}/questions`} className="group">
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
            {data._count.Answer}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
