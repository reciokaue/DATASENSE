import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useQueryParams } from '@/utils/useQueryParams'

interface FiltersProps {
  className: string
}

export function Filters({ className }: FiltersProps) {
  const { setMultipleQueryParams, setQueryParam, searchParams } =
    useQueryParams()

  const search = searchParams.get('s') || ''

  function handleTextChange(text: string) {
    setMultipleQueryParams({
      s: text,
      page: 1,
    })
  }
  function handleChangeFilter(type: string) {
    setQueryParam('form', type)
  }

  return (
    <div
      className={cn(['flex flex-col items-end justify-end gap-3 ', className])}
    >
      <Input
        search
        defaultValue={search}
        onChange={(e) => handleTextChange(e.target.value)}
        className="w-full"
        placeholder="Buscar"
      />
      <Select onValueChange={handleChangeFilter} defaultValue="all">
        <SelectTrigger className="h-10 w-fit">
          <SelectValue placeholder="Todos formulários"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Formulários</SelectLabel>
            <SelectItem value="all"> Todos</SelectItem>
            <SelectItem value="datasense">Datasense</SelectItem>
            <SelectItem value="community">Comunidade</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
