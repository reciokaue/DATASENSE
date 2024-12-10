import Image from 'next/image'
import Link from 'next/link'

import { Icon } from '@/components/ui/icon'
import { Form, User } from '@/models'

interface FormCardProps {
  form: (Form & { user: User }) | any
}

export function FormCard({ form }: FormCardProps) {
  return (
    <Link href={`/community/template/${form.id}`}>
      <div className="flex w-full flex-col gap-2">
        <div className="flex h-64 overflow-hidden rounded-xl border border-border shadow-sm hover:shadow">
          <section
            className={`flex flex-col items-start justify-start gap-2 p-4 ${form?.logoUrl ? 'w-3/5' : 'w-full'}`}
          >
            <div className="flex items-center gap-2">
              <Icon name={form.category?.icon} className="size-4" />
              {form.category.label}
            </div>
            <h2 className="text-xl"> {form?.name}</h2>
            <p className="truncate text-wrap break-words text-sm text-muted-foreground">
              {form.description}
            </p>
          </section>
          {form?.logoUrl && (
            <Image
              className="h-full w-1/2 bg-center object-cover object-center"
              src={form?.logoUrl}
              width={400}
              height={650}
              alt={form.description}
            />
          )}
        </div>
        <footer className="flex items-center gap-3">
          <Image
            src={form?.user.profileImage}
            alt={form?.user.name}
            width={30}
            height={30}
            className="ml-2 flex size-5 flex-shrink-0 rounded-full"
          />
          <h1 className="truncate overflow-ellipsis text-xs font-medium capitalize text-primary ">
            {form.name}
          </h1>
          {form?.user.id === 1 && (
            <div className="ml-auto rounded-sm bg-primary/20 px-2 py-[2px] text-xs leading-tight text-foreground">
              DATASENSE
            </div>
          )}
        </footer>
      </div>
    </Link>
  )
}
