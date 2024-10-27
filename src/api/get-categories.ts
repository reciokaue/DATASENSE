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
  return { categories: response.data as Category[] }
}
