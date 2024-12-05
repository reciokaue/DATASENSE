import { useQuery } from '@tanstack/react-query'

import { getCategories } from '@/api/get-categories'
import { getQuestionTypes } from '@/api/get-question-types'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Dropdown } from '@/components/ui/select'
import { useQueryParams } from '@/utils/useQueryParams'

export function Filters() {
  const { searchParams, setMultipleQueryParams } = useQueryParams()
  const search = searchParams.get('s') || ''

  const { data: questionTypes } = useQuery({
    queryKey: ['questionTypes'],
    queryFn: async () => {
      const response = await getQuestionTypes()
      return [{ id: null, label: 'Todas' }, ...response]
    },
  })
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await getCategories({ page: 0, pageSize: 100 })
      return [{ id: null, label: 'Todas' }, ...response?.categories]
    },
  })

  const selectQuestionType = (questionType) => {
    setMultipleQueryParams({ page: 1, typeId: questionType.id })
  }
  const selectCategory = (category) => {
    setMultipleQueryParams({ page: 1, catId: category.id })
  }
  const handleTextChange = (text: string) => {
    setMultipleQueryParams({ s: text, page: 1 })
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Banco de Questões</DialogTitle>
      </DialogHeader>
      <header className="flex gap-3">
        <Input
          onChange={(e) => handleTextChange(e.target.value)}
          defaultValue={search}
          placeholder="Buscar questão"
          styles="w-full"
          search
        />
        <Dropdown
          setSelected={selectQuestionType}
          placeholder={'Tipo da questão'}
          options={questionTypes}
          listTitle="Tipo da questão"
          className="w-52"
        />
        <Dropdown
          setSelected={selectCategory}
          placeholder={'Categoria'}
          options={categories}
          listTitle="Categoria da questão"
          className="w-52"
        />
      </header>
    </>
  )
}
