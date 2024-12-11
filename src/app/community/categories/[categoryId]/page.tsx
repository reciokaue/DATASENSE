'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { z } from 'zod'

import { getCategory } from '@/api/get-category'
import { getForms } from '@/api/get-forms'
import { Pagination } from '@/components/pagination'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Icon } from '@/components/ui/icon'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { pickMessage } from '@/utils/not-found-messages'
import { useQueryParams } from '@/utils/useQueryParams'

import { CategoryList } from '../../category-list'
import { Filters } from '../../filters'
import { FormCard } from '../../form-card'

const pageSize = 6

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string }
}) {
  const { searchParams } = useQueryParams()
  const categoryName = searchParams.get('category')
  const { categoryId } = params

  const { data: category } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategory(categoryId),
  })

  const search = searchParams.get('s') || ''
  const formFilter = searchParams.get('form') || 'all'
  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: community, isPending: communityLoading } = useQuery({
    queryKey: ['community-forms', search, page, formFilter, categoryId],
    queryFn: () =>
      getForms({
        page,
        pageSize,
        isPublic: true,
        query: search,
        form: formFilter,
        categoryId,
      }),
    enabled: !!categoryId,
  })

  return (
    <>
      <Breadcrumb
        steps={[
          { title: 'Comunidade', icon: 'layout-template', href: '/community' },
          {
            title: category?.label || categoryName,
            icon: category?.icon || 'Categoria',
            href: `/community/categories/${category?.label}`,
          },
        ]}
      />
      <div className="grid grid-cols-5 grid-rows-2">
        <div
          className={cn([
            'col-span-4 row-span-1 flex items-center gap-2 ',
            (category?.parentId || category?.id) === 1 && 'text-blue-500',
            (category?.parentId || category?.id) === 2 && 'text-amber-400',
            (category?.parentId || category?.id) === 3 && 'text-red-500',
            (category?.parentId || category?.id) === 4 && 'text-green-500',
          ])}
        >
          <Icon
            name={category?.icon || ''}
            className="size-6"
            strokeWidth={3}
          />
          <h1 className="text-3xl font-semibold leading-relaxed">
            {category?.label || categoryName}
          </h1>
        </div>
        <Filters className="col-span-1 row-span-2" />
        <CategoryList
          parentId={categoryId}
          key={categoryName}
          className="col-span-3 row-span-1"
        />
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
            pageIndex={page}
            perPage={pageSize}
            totalCount={community?.meta?.totalCount}
            className="mt-auto"
          />
        )}
      </section>
    </>
  )
}
