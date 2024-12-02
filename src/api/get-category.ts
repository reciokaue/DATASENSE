import { api } from '../lib/api'
import { Category } from '../models/Category'

export async function getCategory(
  categoryId: string,
): Promise<Category | null> {
  const response = await api.get(`/category/${categoryId}`)
  return response.data as Category
}
