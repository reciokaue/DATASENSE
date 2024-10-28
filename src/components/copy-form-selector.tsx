import { useQuery } from '@tanstack/react-query'

import { getForms } from '../api/get-forms'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface CopyFormSelectorProps {
  setCopyForm: (formId: number) => void
}

export function CopyFormSelector({ setCopyForm }: CopyFormSelectorProps) {
  const { data: result } = useQuery({
    queryKey: ['user-forms'],
    queryFn: () => getForms({ pageSize: 20 }),
  })

  return (
    <div className="col-span-2 flex flex-col space-y-2">
      <Label>Copiar formulário</Label>
      <Label className="text-xs text-secondary-foreground">
        As questões do formularão antigo serão copiadas para o novo formulário
      </Label>
      <Select onValueChange={(formId) => setCopyForm(+formId)}>
        <SelectTrigger defaultValue={0} id="category" className="w-[280px]">
          <SelectValue placeholder="Selecionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'0'}>Não copiar</SelectItem>
          {result &&
            result.forms.map((form) => (
              <SelectItem key={form.id} value={String(form.id)}>
                {form.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}
