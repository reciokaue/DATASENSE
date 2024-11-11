import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'
import { Category } from '@/models'

interface CategoryListProps {
  categories: Category[] | undefined
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <section className="flex flex-wrap items-center gap-2">
      {categories
        ? categories.map((category) => (
            <Link
              href={`/community/categories/${category.name}`}
              key={category.id}
            >
              <Badge className="gap-2" variant="secondary">
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
