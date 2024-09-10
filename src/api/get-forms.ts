import { FormDTO } from '../DTOs/form'
import { api } from '../lib/api'

interface GetFormsProps {
  query?: string
  page?: number
  pageSize?: number
  isPublic?: boolean
  topics?: string
}

interface GetFormsData {
  meta: {
    page: number
    pageSize: number
    totalCount: number
  }
  forms: FormDTO[]
}

export async function getForms({
  query,
  page,
  pageSize,
  isPublic,
  topics,
}: GetFormsProps) {
  const response = await api.get(`/forms`, {
    ...((query || page || pageSize || isPublic || topics) && {
      params: { query, page, pageSize, isPublic, topics },
    }),
  })
  return response.data as GetFormsData
}
