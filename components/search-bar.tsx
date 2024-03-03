import { LayoutGrid, List, Plus, Search } from 'lucide-react'

import { NewFormButton } from './new-form-button'
import { Button } from './ui/button'
import { Input } from './ui/input'

// interface SearchBarProps {}

export function SearchBar() {
  return (
    <div className="flex w-full items-center space-x-3">
      <Button variant="outline" size="icon" className="shrink-0">
        <Search className="h-4 w-6" />
      </Button>
      <div className="w-full">
        <Input type="email" placeholder="Search..." className="w-full" />
      </div>
      <Button variant="outline" size="icon" className="shrink-0">
        <List className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="shrink-0">
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <NewFormButton />
      {/* <Button>
        Novo
        <Plus size={24} />
      </Button> */}
    </div>
  )
}
