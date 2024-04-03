import { LayoutGrid, List, Plus, Search } from 'lucide-react'
import Link from 'next/link'

import { Button } from './ui/button'
import { Input } from './ui/input'

export function SearchBar() {
  return (
    <div className="flex w-full items-center space-x-3">
      <Button variant="outline" size="icon" className="shrink-0">
        <Search className="h-4 w-6" />
      </Button>
      <div className="w-full">
        <Input type="email" placeholder="Procurar..." className="w-full" />
      </div>
      <Button variant="outline" size="icon" className="shrink-0">
        <List className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="shrink-0">
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Link href="/form/new">
        <Button type="submit" className="gap-2">
          New
          <Plus className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}
