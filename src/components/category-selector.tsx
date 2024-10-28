import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

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
  setCategory: (category: Category | null) => void
}

export function CategorySelector({ setCategory }: CategorySelectorProps) {
  const [categoryIndex, setCategoryIndex] = useState<number>()

  const { data: result } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories({ pageSize: 100 }),
  })
  function selectCategory(categoryIndex: string) {
    setCategoryIndex(+categoryIndex)
    setCategory(null)
  }
  function selectSubCategory(category: string) {
    setCategory(JSON.parse(category))
  }

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="category">Categoria</Label>
      <Select onValueChange={selectCategory}>
        <SelectTrigger id="category" className="w-[280px]">
          <SelectValue placeholder="Selecionar" />
        </SelectTrigger>
        <SelectContent>
          {result &&
            result.categories.map((category, index) => (
              <SelectItem key={category.id} value={String(index)}>
                <p>{category.label}</p>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      {categoryIndex && (
        <>
          <Label htmlFor="sub-category" className="pt-2">
            Subcategoria
          </Label>
          <Select onValueChange={selectSubCategory}>
            <SelectTrigger id="sub-category" className="w-[280px]">
              <SelectValue placeholder="Selecionar" />
            </SelectTrigger>
            <SelectContent>
              {result &&
                result.categories[+categoryIndex].subcategories.map(
                  (category) => (
                    <SelectItem
                      key={category.id}
                      value={JSON.stringify(category)}
                    >
                      {category.label}
                    </SelectItem>
                  ),
                )}
            </SelectContent>
          </Select>
        </>
      )}
    </div>
  )
}
