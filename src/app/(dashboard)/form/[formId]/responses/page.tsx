import { useQuery } from '@tanstack/react-query'

import { api } from '@/src/lib/api'

export default function AnswersPage(params) {
  const { formId } = params

  // const { data: form } = useQuery({
  //   queryKey: ['userforms'],
  //   queryFn: async () => {
  //     const response = await api.get(`/form/`)
  //     return response.data
  //   },
  // })

  return <div className="flex">responses {formId}</div>
}
