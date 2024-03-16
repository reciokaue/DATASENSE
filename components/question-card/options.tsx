import { Plus, Trash2 } from 'lucide-react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { LabelDiv } from '../ui/label-div'

interface OptionsProps {}

export function Options() {
  return (
    <LabelDiv title="Opções" styles="space-y-3 pr-8">
      {['Sim', 'Não', 'Talvez'].map((option) => (
        <li
          key={option}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <button className="hover:text-red-500">
            <Trash2 />
          </button>
          <Input value={option} placeholder="Option text" styles="flex-1" />
        </li>
      ))}
      <Button size="sm" variant="link">
        <Plus size={20} /> Opção
      </Button>
    </LabelDiv>
  )
}
