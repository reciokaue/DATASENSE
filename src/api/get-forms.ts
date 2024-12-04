import { api } from '../lib/api'
import { Form } from '../models'

interface GetFormsProps {
  query?: string
  page?: number
  pageSize?: number
  isPublic?: boolean
  categoryId?: string | number
  form?: 'all' | 'datasense' | 'community' | string
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
  form,
}: GetFormsProps) {
  const params: any = {}

  if (query) params.query = query
  if (page) params.page = page
  if (pageSize) params.pageSize = pageSize
  if (isPublic !== undefined) params.isPublic = isPublic
  if (categoryId) params.categoryId = categoryId
  if (form) params.form = form

  const response = await api.get(`/forms`, { params })
  return response.data as GetFormsData
}
