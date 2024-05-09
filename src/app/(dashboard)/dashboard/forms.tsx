'use client'

import { useQuery } from '@tanstack/react-query'

import { FormCard } from '@/src/components/form-card'
import { api } from '@/src/lib/api'

export function Forms() {
  const { data: forms } = useQuery({
    queryKey: ['user-forms'],
    queryFn: async () => {
      const response = await api.get(`/forms`, {
        params: { pageSize: 6 },
      })
      return response.data
    },
  })
  return (
    <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
      {forms &&
        forms.map((form: any) => <FormCard data={form} key={form.id} />)}
    </div>
  )
}
