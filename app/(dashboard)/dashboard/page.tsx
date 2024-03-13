import { FormCard } from '@/components/form-card'
import { SearchBar } from '@/components/search-bar'
import { api } from '@/lib/api'

export default async function Dashboard() {
  const forms = await api.get('/form')

  return (
    <>
      <SearchBar />
      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
        {forms.data.map((form: any) => (
          <FormCard data={form} key={form.id} />
        ))}
      </div>
    </>
  )
}
