import { api } from '../lib/api'
import { Category } from '../models/Category'

export async function createCategories(
  categories: Partial<Category>[],
): Promise<void> {
  if (categories.length === 0) {
    throw new Error('Dados insuficientes')
  }

  await api.post('/category', categories)
}
