import { FormCard } from '@/components/form-card'
import { Nav } from '@/components/nav'
import { SearchBar } from '@/components/search-bar'
import { api } from '@/lib/api'

export default async function Dashboard() {
  const forms = await api.get('/form')

  return (
    <main className="screen:px-0 mx-auto flex max-w-6xl flex-col px-10">
      <Nav />
      <SearchBar />
      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
        {forms.data.map((form: any) => (
          <FormCard data={form} key={form.id} />
        ))}
      </div>
    </main>
  )
}
