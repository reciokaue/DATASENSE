import { Input } from '@/components/ui/input'
import { useQueryParams } from '@/utils/useQueryParams'

interface FiltersProps {
  title: string
}

export function Filters({ title }: FiltersProps) {
  const { setQueryParam, searchParams } = useQueryParams()

  const search = searchParams.get('s')

  return (
    <header className="mb-3 flex items-center justify-between">
      <h1 className="text-3xl font-semibold leading-relaxed text-primary">
        {title}
      </h1>

      <div className="flex gap-3">
        <Input
          search
          value={search}
          onChange={(e) => setQueryParam('s', e.target.value)}
          className="w-full"
          styles="focus:w-full"
          placeholder="Buscar"
        />
      </div>
    </header>
  )
}
