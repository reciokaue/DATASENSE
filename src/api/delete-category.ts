import { api } from '../lib/api'

export async function deleteCategories(categoryIds: number[]): Promise<void> {
  if (categoryIds.length === 0) {
    throw new Error('Dados insuficientes')
  }

  await api.delete('/category', {
    data: categoryIds,
  })
}
