import { api } from '../lib/api'
import { Form } from '../models'

interface GetFormsProps {
  query?: string
  page?: number
  pageSize?: number
  isPublic?: boolean
  categoryId?: string | number
  datasense?: boolean
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
  categoryId,
  datasense,
}: GetFormsProps) {
  const params: any = {}

  if (query) params.query = query
  if (page) params.page = page
  if (pageSize) params.pageSize = pageSize
  if (isPublic !== undefined) params.isPublic = isPublic
  if (categoryId) params.categoryId = categoryId
  if (datasense) params.datasense = datasense

  const response = await api.get(`/forms`, { params })
  return response.data as GetFormsData
}
