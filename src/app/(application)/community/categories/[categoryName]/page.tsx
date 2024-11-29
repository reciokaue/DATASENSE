'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

import { getCategoryByName } from '@/api/get-category'
import { getForms } from '@/api/get-forms'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Icon } from '@/components/ui/icon'
import { Label } from '@/components/ui/label'

import { CategoryList } from '../../category-list'

export default function CategoryPage({
  params,
}: {
  params: { categoryName: string }
}) {
  const { data: category } = useQuery({
    queryKey: ['category-templates', params.categoryName],
    queryFn: () => getCategoryByName(params.categoryName),
  })

  const { data: datasense } = useQuery({
    queryKey: ['datasense-forms', params.categoryName],
    queryFn: () =>
      getForms({
        page: 0,
        pageSize: 8,
        datasense: true,
        categoryId: category.id,
      }),
  })

  const { data: community } = useQuery({
    queryKey: ['community-forms', params.categoryName],
    queryFn: () => getForms({ page: 0, pageSize: 8, isPublic: true }),
  })

  return (
    <>
      <Breadcrumb
        steps={[
          { title: 'Comunidade', icon: 'layout-template', href: '/community' },
          {
            title: category?.label || '',
            icon: 'layout-template',
            href: `/community/categories/${category?.label}`,
          },
        ]}
      />
      <header className="mb-3 mt-2 flex items-center gap-2 text-primary">
        <Icon name={category?.icon || ''} className="size-6" strokeWidth={3} />
        <h1 className="text-3xl font-semibold leading-relaxed ">
          {category?.label}
        </h1>
      </header>
      <CategoryList categories={category?.subcategories} />

      <section className="flex flex-col py-6">
        <Label className="mb-2 text-2xl">Formulários Datasense</Label>
        <Carousel>
          <CarouselContent>
            {datasense?.forms.map((form) => (
              <CarouselItem key={form.id} className="basis-1/4">
                <Link href={`/community/template/${form.id}`}>
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex h-40 w-full items-center justify-center rounded-lg bg-primary/20">
                      <Image
                        className="size-20"
                        src={'/images/avatars/datasense.png'}
                        width={100}
                        height={100}
                        alt={form.description}
                      />
                    </div>
                    <footer className="flex items-center gap-2">
                      <Icon
                        name={form.category?.icon || ''}
                        className="size-4"
                      />
                      <h1 className="truncate overflow-ellipsis text-xs font-medium text-primary ">
                        {form.name}
                      </h1>
                    </footer>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <Label className="mb-2 mt-6 text-2xl">Formulários da Comunidade</Label>
        <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {community?.forms.map((form) => (
            <Link
              key={form.id}
              href={`/community/template/${form.id}`}
              className="basis-1/4"
            >
              <div className="flex w-full flex-col gap-2">
                <div className="flex h-40 w-full items-center justify-center rounded-lg bg-primary/20">
                  <Image
                    className="size-20"
                    src={'/images/avatars/datasense.png'}
                    width={100}
                    height={100}
                    alt={''}
                  />
                </div>
                <footer className="flex items-center gap-2">
                  <Icon name={form.category?.icon || ''} className="size-4" />
                  <h1 className="truncate overflow-ellipsis text-xs font-medium text-primary ">
                    {form.name}
                  </h1>
                </footer>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
