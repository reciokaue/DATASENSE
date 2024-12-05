'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { z } from 'zod'

import { getForms } from '@/api/get-forms'
import { Pagination } from '@/components/pagination'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { pickMessage } from '@/utils/not-found-messages'
import { useQueryParams } from '@/utils/useQueryParams'

import { CategoryList } from './category-list'
import { Filters } from './filters'
import { FormCard } from './form-card'

const pageSize = 6
const steps = [
  { title: 'Comunidade', icon: 'layout-template', href: '/community' },
]

export default function CommunityPage() {
  const { searchParams } = useQueryParams()

  const search = searchParams.get('s') || ''
  const formFilter = searchParams.get('form') || 'all'
  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: community, isPending: communityLoading } = useQuery({
    queryKey: ['community-forms', search, page, formFilter],
    queryFn: () =>
      getForms({
        page,
        pageSize,
        isPublic: true,
        query: search,
        form: formFilter,
      }),
  })

  return (
    <>
      <Breadcrumb steps={steps} />
      <div className="grid grid-cols-5 grid-rows-2">
        <h1 className="col-span-4 row-span-1 text-3xl font-semibold leading-relaxed text-primary">
          Buscar na Comunidade
        </h1>
        <Filters className="col-span-1 row-span-2" />
        <CategoryList parentId={null} className="col-span-3 row-span-1" />
      </div>

      <section className="flex flex-1 flex-col py-6">
        <Label className="mb-2 text-2xl">Formulários</Label>
        <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-3">
          {community?.forms.map((form) => (
            <FormCard form={form} key={form.id} />
          ))}

          {communityLoading &&
            [0, 1, 2].map((i) => <Skeleton key={i} className="h-44 w-full" />)}
        </div>
        {!communityLoading && community?.forms.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
            <Image
              src="/images/app/not-found.png"
              width={300}
              height={300}
              alt="não encontrado"
            />
            <p className="max-w-80 text-center">{pickMessage()}</p>
          </div>
        )}
        {community?.forms.length > 0 && (
          <Pagination
            perPage={pageSize}
            totalCount={community?.meta?.totalCount}
            className="mt-auto"
            pageIndex={page}
          />
        )}
      </section>
    </>
  )
}
