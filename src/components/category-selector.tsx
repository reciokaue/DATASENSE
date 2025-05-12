'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

import { getCategories } from '../api/get-categories'
import { Category } from '../models'
import { Label } from './ui/label'
import { Dropdown } from './ui/select'

interface CategorySelectorProps {
  control: any
  name: string
  error?: string
}

export function CategorySelector({
  control,
  name,
  error,
}: CategorySelectorProps) {
  const [parent, setParent] = useState<Category | null>()

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories({ pageSize: 100, parentId: null }),
  })

  const findCategoriesByParent = (category) => {
    return data?.categories?.find((parent) => parent.id === category?.parentId)
  }

  return (
    <div className="col-span-2 flex max-w-sm flex-col space-y-2">
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const category = field.value
          if (category?.parentId) setParent(findCategoriesByParent(category))

          return (
            <>
              <Label htmlFor="category">Categoria *</Label>
              <Dropdown
                options={data?.categories}
                placeholder={parent?.label || 'Selecionar'}
                listTitle="Categorias"
                name="categories"
                setSelected={(cat) => {
                  setParent(cat)
                  field.onChange({
                    id: cat.id,
                    label: cat.label,
                    name: cat.name,
                    icon: cat.icon,
                  })
                }}
              />
              {(category || parent) && (
                <>
                  <Label htmlFor="category">Subcategoria</Label>
                  <Dropdown
                    options={parent?.subcategories}
                    placeholder={category?.label || 'Selecionar'}
                    setSelected={(cat) =>
                      field.onChange({
                        id: cat.id,
                        label: cat.label,
                        name: cat.name,
                        icon: cat.icon,
                      })
                    }
                    listTitle="Subcategorias"
                  />
                </>
              )}
            </>
          )
        }}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
