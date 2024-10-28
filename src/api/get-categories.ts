import { api } from '../lib/api'
import { Category } from '../models/Category'

interface GetCategoriesProps {
  page?: number
  pageSize?: number
  query?: string
  parentId?: number | null
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
  const response = await api.get(`/categories`, {
    params: { page, pageSize, query, parentId },
  })
  return response.data as GetCategoriesData
}
