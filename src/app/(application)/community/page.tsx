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
import { Skeleton } from '@/components/ui/skeleton'
import { useQueryParams } from '@/utils/useQueryParams'

// import { Skeleton } from '@/components/ui/skeleton'
import { CategoryList } from './category-list'
import { Filters } from './filters'
import { FormCard } from './form-card'

export default function CommunityPage() {
  const { searchParams } = useQueryParams()

  const search = searchParams.get('s')

  // const { data: datasense, isPending: datasenseLoading } = useQuery({
  //   queryKey: ['datasense-forms', search],
  //   queryFn: () =>
  //     getForms({ page: 0, pageSize: 8, datasense: true, query: search }),
  // })

  const { data: community, isPending: communityLoading } = useQuery({
    queryKey: ['community-forms', search],
    queryFn: () =>
      getForms({ page: 0, pageSize: 8, isPublic: true, query: search }),
  })

  return (
    <>
      <Breadcrumb
        steps={[
          { title: 'Comunidade', icon: 'layout-template', href: '/community' },
        ]}
      />
      <Filters title="Buscar na Comunidade" />
      <CategoryList parentId={null} key={'home'} />
      <section className="flex flex-col py-6">
        {/* <Label className="mb-2 text-2xl">Formulários Datasense</Label> */}
        {/* <Carousel>
          <CarouselContent>
            {datasense?.forms.map((form) => (
              <CarouselItem key={form.id} className="md:basis-1/3 lg:basis-1/4">
                <FormCard form={form} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel> */}
        <Label className="mb-2 mt-6 text-2xl">Formulários</Label>
        <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-3">
          {communityLoading &&
            [0, 1, 2].map((i) => <Skeleton key={i} className="h-44 w-full" />)}

          {community?.forms.map((form) => (
            <FormCard form={form} key={form.id} />
          ))}
        </div>
      </section>
    </>
  )
}
