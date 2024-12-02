'use client'

import { useQuery } from '@tanstack/react-query'

import { getForms } from '@/api/get-forms'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// import { Skeleton } from '@/components/ui/skeleton'
import { CategoryList } from './category-list'
import { FormCard } from './form-card'

export default function CommunityPage() {
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
      <CategoryList parentId={null} key={'home'} />
      <section className="flex flex-col py-6">
        <Label className="mb-2 text-2xl">Formulários Datasense</Label>
        <Carousel>
          <CarouselContent>
            {datasense?.forms.map((form) => (
              <CarouselItem key={form.id} className="basis-1/4">
                <FormCard form={form} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <Label className="mb-2 mt-6 text-2xl">Formulários da Comunidade</Label>
        <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {community?.forms.map((form) => (
            <FormCard form={form} key={form.id} />
          ))}
        </div>
      </section>
    </>
  )
}
