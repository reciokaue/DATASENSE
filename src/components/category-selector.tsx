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
  category?: Category
  error?: string
}

export function CategorySelector({
  control,
  name,
  category,
  error,
}: CategorySelectorProps) {
  const [parentCategory, setParentCategory] = useState<Category | undefined>(
    category,
  )

  const { data: result } = useQuery({
    queryKey: ['categories', category?.id],
    queryFn: () => getCategories({ pageSize: 100, parentId: null }),
  })

  const findCategory = (label: string, child?: boolean) =>
    (child
      ? parentCategory?.subcategories || []
      : result?.categories || []
    ).find((category) => category.label === label)

  return (
    <div className="col-span-2 flex flex-col space-y-2">
      <Controller
        control={control}
        name={name}
        render={(categoryField) => (
          <>
            <Label htmlFor="category">Categoria *</Label>
            <Select
              defaultValue={category?.parent?.label}
              onValueChange={(label) => setParentCategory(findCategory(label))}
            >
              <SelectTrigger
                defaultValue={'show'}
                id="category"
                className="w-[280px]"
              >
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent>
                {result &&
                  result.categories.map((category) => (
                    <SelectItem key={category.id} value={category.label}>
                      {category.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {parentCategory && (
              <>
                <Label htmlFor="category" className="pt-2">
                  Subcategoria
                </Label>
                <Select
                  defaultValue={category?.label}
                  onValueChange={(label) =>
                    categoryField.field.onChange(findCategory(label, true)?.id)
                  }
                >
                  <SelectTrigger id="category" className="w-[280px]">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {parentCategory.subcategories ? (
                      parentCategory.subcategories.map((category) => (
                        <SelectItem key={category.id} value={category.label}>
                          {category.label}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem
                        key={parentCategory.id}
                        value={parentCategory.label}
                      >
                        {parentCategory.label}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </>
            )}
          </>
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
