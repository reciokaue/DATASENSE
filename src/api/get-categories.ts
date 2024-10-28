import { api } from '../lib/api'
import { Category } from '../models/Category'

interface GetCategoriesProps {
  page?: number
  pageSize?: number
  query?: string
  parentId?: number
}

interface GetCategoriesData {
  categories: Category[]
  meta: {
    page: number
    pageSize: number
    totalCount: number
  }
}

export async function getCategories({
  page = 0,
  pageSize = 10,
  query,
  parentId,
}: GetCategoriesProps): Promise<GetCategoriesData> {
  const response = await api.get('/category', {
    params: { page, pageSize, query, categoryId: parentId },
  })
  return response.data as GetCategoriesData
}
