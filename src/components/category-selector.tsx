import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

import { getCategories } from '../api/get-categories'
import { Category } from '../models'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface CategorySelectorProps {
  control: any
  name: string
  parentId: number | null
  error?: string
}

export function CategorySelector({
  control,
  name,
  parentId,
  error,
}: CategorySelectorProps) {
  const [parentCategory, setParentCategory] = useState<Category | null>()

  const { data: result } = useQuery({
    queryKey: ['categories', parentId],
    queryFn: () => getCategories({ pageSize: 100, parentId }),
  })

  return (
    <div className="col-span-2 flex flex-col space-y-2">
      <Controller
        control={control}
        name={name}
        render={(category) => (
          <>
            <Label htmlFor="category">Categoria *</Label>

            <SelectCategory
              set={(data) => {
                setParentCategory(data)
                // category?.field.onChange(data)
              }}
              categories={result?.categories}
            />
            {parentCategory?.subcategories && (
              <>
                <Label htmlFor="category" className="pt-2">
                  Subcategoria
                </Label>
                <SelectCategory
                  set={(data) => category.field.onChange(data.id)}
                  categories={parentCategory?.subcategories}
                />
              </>
            )}
          </>
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
interface SelectCategoryProps {
  set: (category: Category) => void
  categories: Category[] | undefined
}

function SelectCategory({ set, categories }: SelectCategoryProps) {
  return (
    <Select onValueChange={(subcategory) => set(JSON.parse(subcategory))}>
      <SelectTrigger id="category" className="w-[280px]">
        <SelectValue placeholder="Selecionar" />
      </SelectTrigger>
      <SelectContent>
        {categories &&
          categories.map((category) => (
            <SelectItem key={category.id} value={JSON.stringify(category)}>
              {category.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
