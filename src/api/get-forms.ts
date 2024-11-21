import { api } from '../lib/api'
import { Form } from '../models'

interface GetFormsProps {
  query?: string
  page?: number
  pageSize?: number
  isPublic?: boolean
  topics?: string
}

export interface GetFormsData {
  meta: {
    page: number
    pageSize: number
    totalCount: number
  }
  forms: Form[]
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
