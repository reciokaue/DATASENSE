'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { getCategories } from '@/api/get-categories'
import { getForms } from '@/api/get-forms'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

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

  const { data: result } = useQuery({
    queryKey: ['community-forms'],
    queryFn: () =>
      getForms({
        page: 0,
        pageSize: 100,
        isPublic: true,
      }),
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
        <Label className="text-2xl">Formulários</Label>
        <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {result?.forms
            ? result?.forms.map((form) => (
                <Link key={form.id} href={`/community/template/${form.id}`}>
                  <div className="flex w-full flex-col gap-2">
                    <div className="h-40 w-full rounded-lg bg-primary/70"></div>
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
              ))
            : [0, 1, 2].map((i) => (
                <Skeleton key={`skeleton-${i}`} className="h-52 w-full" />
              ))}
        </div>
      </section>
    </>
  )
}
