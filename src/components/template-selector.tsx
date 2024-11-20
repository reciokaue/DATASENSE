import { useQuery } from '@tanstack/react-query'
import { Controller } from 'react-hook-form'

import { getForms } from '../api/get-forms'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface TemplateSelectorProps {
  control: any
  name: string
}

export function TemplateSelector({ control, name }: TemplateSelectorProps) {
  const { data: result } = useQuery({
    queryKey: ['user-forms'],
    queryFn: () => getForms({ pageSize: 20 }),
  })

  return (
    <div className="col-span-2 flex flex-col space-y-2">
      <Label>Copiar formulário</Label>
      <Label className="text-xs text-secondary-foreground">
        As questões do formulário antigo serão copiadas para o novo formulário
      </Label>
      <Controller
        control={control}
        name={name}
        render={(templateId) => (
          <Select
            onValueChange={(value) =>
              templateId.field.onChange(value === 'null' ? null : +value)
            }
          >
            <SelectTrigger id="category" className="w-[280px]">
              <SelectValue placeholder="Selecionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'null'}>Não copiar</SelectItem>
              {result &&
                result.forms.map((form) => (
                  <SelectItem key={form.id} value={String(form.id)}>
                    {form.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  )
}
