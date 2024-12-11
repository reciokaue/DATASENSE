import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { getCategories } from '@/api/get-categories'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface CategoryListProps {
  parentId?: number | string
  className?: string
}

export function CategoryList({ parentId, className }: CategoryListProps) {
  const { data } = useQuery({
    queryKey: ['categories', parentId],
    queryFn: () =>
      getCategories({
        page: 0,
        pageSize: 100,
        parentId,
      }),
    staleTime: Infinity,
  })

  return (
    <section className={cn(['flex flex-wrap items-center gap-2', className])}>
      {data
        ? data.categories.map((category) => (
            <Link
              href={`/community/categories/${category.id}?category=${category.label}`}
              key={category.id}
            >
              <Badge
                className="gap-2"
                variant={category?.parentId || category?.id}
              >
                <Icon name={category.icon} size={15} />
                {category.label}
              </Badge>
            </Link>
          ))
        : [0, 1, 2, 3, 4, 5, 6].map((index) => (
            <Skeleton className="h-7 w-16" key={`category-${index}`} />
          ))}
    </section>
  )
}
