import { Nav } from '@/components/nav'
import { SearchBar } from '@/components/search-bar'

export default function Dashboard() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col">
      <Nav />
      <SearchBar />
    </main>
  )
}
