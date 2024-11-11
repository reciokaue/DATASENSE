'use client'

import { useQuery } from '@tanstack/react-query'

import { getCategoryByName } from '@/api/get-category'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Icon } from '@/components/ui/icon'

import { CategoryList } from '../../category-list'

export default function CategoryPage({
  params,
}: {
  params: { categoryName: string }
}) {
  const { data: category } = useQuery({
    queryKey: ['category', params.categoryName],
    queryFn: () => getCategoryByName(params.categoryName),
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
    </>
  )
}
