import Image from 'next/image'
import Link from 'next/link'

import { Icon } from '@/components/ui/icon'
import { Form } from '@/models'

interface FormCardProps {
  form: Form
}

export function FormCard({ form }: FormCardProps) {
  return (
    <Link href={`/community/template/${form.id}`}>
      <div className="flex w-full flex-col gap-2">
        <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-lg border border border-border bg-primary/20">
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
          <Icon name={form.category?.icon} className="size-4" />
          <h1 className="truncate overflow-ellipsis text-xs font-medium text-primary ">
            {form.name}
          </h1>
        </footer>
      </div>
    </Link>
  )
}
