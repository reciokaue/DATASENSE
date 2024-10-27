import { EyeIcon } from 'lucide-react'
import Link from 'next/link'

import { Card } from '@/src/components/ui/card'
import { FormDTO } from '@/src/DTOs/form'

interface ResponsesProps {
  form: FormDTO
}

export function Responses({ form }: ResponsesProps) {
  return (
    <>
      <Card className="mb-6 rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">Informações do Formulário</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              {new Date(form?.createdAt ?? '').getFullYear()}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-center">
            <p className="text-sm text-gray-400">Total de Questões</p>
            <p className="text-2xl font-medium text-gray-800">
              {form?._count.questions ?? 0}
            </p>
          </div>
          <div className="h-8 border-r border-gray-300"></div>
          <div className="flex items-center gap-4 text-center">
            <p className="text-sm text-gray-400">Total de Respostas</p>
            <p className="text-2xl font-medium text-gray-800">
              {form?._count.sessions * form?.questions.length || 0}
            </p>
          </div>
          <div className="h-8 border-r border-gray-300"></div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Status</p>
            <p className="text-2xl font-medium text-gray-800">
              {form?.active ? 'Ativo' : 'Inativo'}
            </p>
          </div>
        </div>
      </Card>

      <h2 className="mb-4 text-xl font-semibold">Lista de Perguntas</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Pergunta
              </th>
              <th scope="col" className="px-6 py-3">
                Tipo
              </th>
              <th scope="col" className="px-6 py-3">
                Respostas
              </th>
              <th scope="col" className="px-6 py-3">
                Obrigatória
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {form?.questions.map((question) => (
              <tr key={question.id} className="border-b bg-white">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {question.text}
                </td>
                <td className="px-6 py-4">{question.questionType.label}</td>
                <td className="px-6 py-4">{question._count?.responses ?? 0}</td>
                <td className="px-6 py-4">
                  {question?.required ? 'Sim' : 'Não'}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/forms/${form.id}/questions/${question.id}`}
                    className="flex items-center gap-2 hover:text-primary/80"
                  >
                    <EyeIcon className="h-4 w-4" />
                    Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
