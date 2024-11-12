import { useQuery } from '@tanstack/react-query'
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { getFormSummary } from '@/api/get-form-sumary'
import { getQuestionsResults, QuestionResult } from '@/api/get-question-results'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatResponse } from '@/utils/formatRespnse'

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#82ca9d',
]

interface ResponsesProps {
  formId: number | string
}

export function Responses({ formId }: ResponsesProps) {
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['formSummary', formId],
    queryFn: () => getFormSummary(formId),
  })
  const { data: questionResults, isLoading: questionLoading } = useQuery({
    queryKey: ['questionsResults', formId],
    queryFn: () => getQuestionsResults(formId),
  })

  const renderChart = (question: QuestionResult) => {
    if (!question.chartData) return null

    if (question.isMultipleChoice) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={question.chartData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ label, percentage }) =>
                `${label}: ${percentage.toFixed(1)}%`
              }
            >
              {question.chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )
    }

    if (question.hasNumericValues) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={question.chartData}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )
    }
  }

  if (summaryLoading || questionLoading) {
    return (
      <div className="p-8">
        <Skeleton className="h-[400px]" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col  items-center space-y-6 pb-10">
      <header className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Card className="flex h-full w-full flex-col p-6">
          <span className="text-4xl font-semibold text-primary">
            {summary?.totalQuestions}
          </span>
          <p className="text-sm text-secondary-foreground">Total de questões</p>
        </Card>
        <Card className="flex h-full w-full flex-col p-6">
          <span className="text-4xl font-semibold text-primary">
            {summary?.totalSessions}
          </span>
          <p className="text-sm text-secondary-foreground">Total de sessões</p>
        </Card>
        <Card className="flex h-full w-full flex-col p-6">
          <span className="text-4xl font-semibold text-primary">
            {summary?.totalResponses}
          </span>
          <p className="text-sm text-secondary-foreground">
            Total de respostas
          </p>
        </Card>
        <Card className="flex h-full w-full flex-col p-6">
          <span className="text-4xl font-semibold text-primary">
            {summary?.completionRate.toFixed(1)}%
          </span>
          <p className="text-sm text-secondary-foreground">Taxa de conclusão</p>
        </Card>
        <Card className="flex h-full w-full flex-col p-6">
          <span className="text-4xl font-semibold text-primary">
            {summary?.averageResponsesPerSession}
          </span>
          <p className="text-sm text-secondary-foreground">
            Média de respostas por sessão
          </p>
        </Card>
      </header>
      <div className="flex w-full flex-col space-y-6">
        {questionResults?.questions.map((question) => (
          <Card key={question.id} className="p-6">
            <h3 className="mb-4 text-xl font-semibold">{question.text}</h3>

            {question.statistics && (
              <div className="mb-6 grid grid-cols-4 gap-4">
                <Card className="p-4">
                  <p className="text-sm text-secondary-foreground">Média</p>
                  <p className="text-lg font-medium">
                    {question.statistics.average.toFixed(1)}
                  </p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-secondary-foreground">Mediana</p>
                  <p className="text-lg font-medium">
                    {question.statistics.median.toFixed(1)}
                  </p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-secondary-foreground">Mínimo</p>
                  <p className="text-lg font-medium">
                    {question.statistics.min.toFixed(1)}
                  </p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-secondary-foreground">Máximo</p>
                  <p className="text-lg font-medium">
                    {question.statistics.max.toFixed(1)}
                  </p>
                </Card>
              </div>
            )}
            {question.totalResponses > 0 && renderChart(question)}

            {question.responses && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resposta</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {question.responses.map((response, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {formatResponse(response.text, question.type)}
                      </TableCell>
                      <TableCell className="text-right">
                        {response.count}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <div className="mt-4 text-sm text-secondary-foreground">
              Total de respostas: {question.totalResponses}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
