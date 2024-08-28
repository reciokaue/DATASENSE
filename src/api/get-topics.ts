import { TopicDTO } from '../DTOs/topic'
import { api } from '../lib/api'

export async function getTopics(page?: number, pageSize?: number) {
  const response = await api.get(`/topics`, {
    params: {
      page: page || 0,
      pageSize: pageSize || 10,
    },
  })
  return response.data as TopicDTO[]
}
