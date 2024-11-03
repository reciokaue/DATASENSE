import { api } from '../lib/api'
import { Category } from '../models/Category'

export async function getCategoryByName(
  categoryName: string,
): Promise<Category | null> {
  const response = await api.get(`/category/${categoryName}`)
  return response.data as Category
}
