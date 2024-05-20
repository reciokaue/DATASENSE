'use client'

import { useQuery } from '@tanstack/react-query'

import { FormDTO } from '@/src/DTOs/form'
import { api } from '@/src/lib/api'

export default function Edit() {
  const { data: form } = useQuery({
    queryKey: ['form', 8],
    queryFn: async () => {
      const response = await api.get(`/form/${8}`)
      return response.data as FormDTO
    },
  })

  return (
    <div>
      <div className="flex flex-col space-y-1">
        <input type="text" value={form?.id} />
        <input type="text" value={form?.name} />
        <input type="text" value={form?.about} />
        <input type="text" value={String(form?.active)} />
        <input type="text" value={form?.logoUrl} />
        <input type="text" value={String(form?.isPublic)} />
        <input type="text" value={form?.createdAt} />
        <div className="ml-4 flex flex-col space-y-4 pt-4">
          {form?.questions.map((question) => (
            <div
              key={`question-${question.id}`}
              className="flex flex-col space-y-1 border-l-2 pl-2"
            >
              <input type="text" value={question?.id} />
              <input type="text" value={question?.text} />
              <input type="text" value={question?.questionType.name} />
              {question.options.map((options) => (
                <div
                  key={`options-${options.id}`}
                  className="ml-4 flex justify-start space-x-1 border-l-2 pl-2"
                >
                  <input className="w-20" type="text" value={options?.id} />
                  <input className="w-20" type="text" value={options?.index} />
                  <input className="w-20" type="text" value={options.text} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
