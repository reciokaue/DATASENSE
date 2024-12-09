import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useQueryParams } from '@/utils/useQueryParams'

import { DownloadDialog } from '../config/download-dialog'

interface FiltersProps {
  formId: string | number
}

export function Filters({ formId }: FiltersProps) {
  const { setQueryParam, searchParams } = useQueryParams()

  const search = searchParams.get('s') || ''

  function setViewType(type) {
    setQueryParam('view', type)
  }
  function setSearch(text) {
    setQueryParam('s', text)
  }

  return (
    <nav className="flex w-full items-center justify-start gap-3">
      <DateRangePicker />
      <Select onValueChange={setViewType}>
        <SelectTrigger className="h-full w-fit">
          <SelectValue placeholder="Visualização" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cards">Cards</SelectItem>
          <SelectItem value="table">Tabela</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Filtrar"
        onChange={(e) => setSearch(e.target.value)}
        defaultValue={search}
      />

      <DownloadDialog formId={formId} />
    </nav>
  )
}
