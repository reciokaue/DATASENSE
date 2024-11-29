'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

import { getCategories } from '@/api/get-categories'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// import { Skeleton } from '@/components/ui/skeleton'
import { CategoryList } from './category-list'

export default function CommunityPage() {
  const { data: categoriesResult } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getCategories({
        page: 0,
        pageSize: 100,
      }),
  })

  const { data: datasense } = useQuery({
    queryKey: ['datasense-forms'],
    queryFn: () => getForms({ page: 0, pageSize: 8, datasense: true }),
  })

  const { data: community } = useQuery({
    queryKey: ['community-forms'],
    queryFn: () => getForms({ page: 0, pageSize: 8, isPublic: true }),
  })

  return (
    <>
      <Breadcrumb
        steps={[
          { title: 'Comunidade', icon: 'layout-template', href: '/community' },
        ]}
      />
      <header className="mb-3 flex items-center justify-between">
        <h1 className="text-3xl font-semibold leading-relaxed text-primary">
          Buscar na Comunidade
        </h1>

        {/* TODO Filters  */}
        <Input
          search
          className="w-full"
          styles="focus:w-full"
          placeholder="Buscar"
        />
      </header>
      <CategoryList categories={categoriesResult?.categories} />
      <section className="flex flex-col py-6">
        <Label className="mb-2 text-2xl">Formulários Datasense</Label>
        <Carousel>
          <CarouselContent>
            {datasense?.forms.map((form) => (
              <CarouselItem key={form.id} className="basis-1/4">
                <Link href={`/community/template/${form.id}`}>
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-primary/20">
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
