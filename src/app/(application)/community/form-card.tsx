import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import { Form } from '@/models'

interface FormCardProps {
  form: Form
}

export function FormCard({ form }: FormCardProps) {
  return (
    <Link href={`/community/template/${form.id}`}>
      <div className="flex w-full flex-col gap-2">
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-xl border border-border hover:shadow">
          {/* {form.logoUrl ? (
          <Image
            className="h-full w-full object-cover"
            src={form.logoUrl}
            width={200}
            height={400}
            alt={form.description}
          />
        ) : ( */}
          <Image
            className="size-20"
            src={'/images/avatars/datasense.png'}
            width={100}
            height={100}
            alt={form.description}
          />
          {/* )} */}
        </div>
        <footer className="flex items-center gap-2">
          <Icon name={form.category?.icon} className="ml-2 size-4" />
          <h1 className="truncate overflow-ellipsis text-xs font-medium capitalize text-primary ">
            {form.name}
          </h1>
          {form.userId === 1 && (
            <div className="ml-auto rounded-sm bg-primary/20 px-2 py-[2px] text-xs leading-tight text-foreground">
              DATASENSE
            </div>
          )}
        </footer>
      </div>
    </Link>
  )
}
