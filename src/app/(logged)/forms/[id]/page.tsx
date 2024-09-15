'use client'

import { useQuery } from '@tanstack/react-query'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { getForm } from '@/src/api/get-form'
import { FormDTO } from '@/src/DTOs/form'

import { PageHeader, PageWrapper } from '../../layout'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function FormAnalyticsPage({
  params,
}: {
  params: { id: string }
}) {
  const {
    data: form,
    isLoading,
    isError,
  } = useQuery<FormDTO>({
    queryKey: ['form', params.id],
    queryFn: () => getForm(params.id),
  })

  if (isLoading) return <div>Carregando...</div>
  if (isError) return <div>Erro ao carregar os dados do formulário</div>
  if (!form) return <div>Formulário não encontrado</div>

  const questionTypeData = form.questions.reduce(
    (acc, question) => {
      const type = question.questionType.name
      acc[type] = (acc[type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const questionTypeChartData = Object.entries(questionTypeData).map(
    ([name, value]) => ({ name, value }),
  )

  const responseData = form?.questions.map((question) => ({
    name: question.text.slice(0, 20) + '...',
    respostas: question._count.responses,
  }))

  return (
    <>
      <PageHeader>Analytics do Formulário: {form?.name}</PageHeader>
      <PageWrapper>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-4 text-xl font-semibold">Informações Gerais</h2>
            <p>Total de Questões: {form?._count.questions}</p>
            <p>Total de Sessões: {form?._count.sessions}</p>
            <p>Status: {form?.active ? 'Ativo' : 'Inativo'}</p>
            <p>Público: {form?.isPublic ? 'Sim' : 'Não'}</p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-4 text-xl font-semibold">Tipos de Questões</h2>
            <PieChart width={300} height={300}>
              <Pie
                data={questionTypeChartData}
                cx={150}
                cy={150}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {questionTypeChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="col-span-1 rounded-lg bg-white p-4 shadow md:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">
              Respostas por Questão
            </h2>
            <BarChart width={600} height={300} data={responseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="respostas" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
