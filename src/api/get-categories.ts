import { api } from '../lib/api'
import { Category } from '../models/Category'

interface GetCategoriesProps {
  page?: number
  pageSize?: number
  query?: string
  parentId?: number | null | string
}

interface GetCategoriesData {
  categories: Category[]
  meta: {
    page: number
    pageSize: number
    totalCount: number
    parentId: number
  }
}

export async function getCategories({
  page = 0,
  pageSize = 10,
  query,
  parentId,
}: GetCategoriesProps): Promise<GetCategoriesData> {
  const params: any = {}

  if (page) params.page = page
  if (pageSize) params.pageSize = pageSize
  if (query) params.query = query
  if (parentId) params.parentId = parentId

  const response = await api.get(`/categories`, {
    params,
  })
  return response.data as GetCategoriesData
}
