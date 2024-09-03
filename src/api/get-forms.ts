import { FormDTO } from '../DTOs/form'
import { api } from '../lib/api'

interface GetFormsProps {
  query?: string
  page?: number
  pageSize?: number
}

interface GetFormsData {
  meta: {
    page: number
    pageSize: number
    totalCount: number
  }
  forms: FormDTO[]
}

export async function getForms({ query, page, pageSize }: GetFormsProps) {
  const response = await api.get(`/forms`, {
    ...((query || page || pageSize) && {
      params: { query, page, pageSize },
    }),
  })
  return response.data as GetFormsData
}
