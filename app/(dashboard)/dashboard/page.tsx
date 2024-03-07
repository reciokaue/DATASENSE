'use client'

import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

import { FormCard } from '@/components/form-card'
import { Nav } from '@/components/nav'
import { SearchBar } from '@/components/search-bar'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'

export default function Dashboard() {
  const token = getCookie('@feedback.view:auth-token')

  const { data: formsData } = useQuery({
    queryKey: ['forms-data'],
    queryFn: async () => {
      try {
        const response = await api.get('/form', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return response.data
      } catch (er) {
        console.log(er)
      }
    },
    enabled: !!token,
  })

  return (
    <main className="screen:px-0 mx-auto flex max-w-6xl flex-col px-10">
      <Nav />
      <SearchBar />
      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
        {formsData
          ? formsData.map((form: any) => <FormCard data={form} key={form.id} />)
          : [0, 1, 2].map((i) => (
              <Skeleton key={`skeleton-${i}`} className="h-52" />
            ))}
      </div>
    </main>
  )
}
