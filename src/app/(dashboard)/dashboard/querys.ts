import { api } from '@/src/lib/api'

export const userForms = () => ({
  queryKey: ['user-forms'],
  queryFn: async () => {
    const response = await api.get(`/forms`)
    return response.data
  },
})
export const searchForms = (query: string, publicForm?: boolean) => ({
  queryKey: ['query-user-forms'],
  queryFn: async () => {
    const response = await api.get(`/forms`, {
      params: {
        query,
        public: publicForm || false,
      },
    })
    return response.data
  },
  enabled: false,
})
