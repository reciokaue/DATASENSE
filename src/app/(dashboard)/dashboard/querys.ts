import { api } from '@/src/lib/api'

export const userForms = () => ({
  queryKey: ['user-forms'],
  queryFn: async () => {
    const response = await api.get(`/forms`)
    return response.data
  },
})
export const searchForms = (query: string) => ({
  queryKey: ['query-user-forms'],
  queryFn: async () => {
    const response = await api.get(`/forms`, {
      params: {
        query,
      },
    })
    return response.data
  },
  enabled: false,
})
