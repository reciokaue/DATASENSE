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
import { getQuestionsResults } from '@/api/get-question-results'
import { Example, renderChart } from '@/components/chart'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatResponse } from '@/utils/formatResponse'

import { ResponseCard } from '../components/response-card'

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

const summaryTitles = [
  'Total de questões',
  'Total de sessões',
  'Total de respostas',
  'Taxa de conclusão',
  'Média de respostas por sessão',
]

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
      <div className="space-y-3">
        <header className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
        </header>
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-[300px]" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col  items-center space-y-6 pb-10">
      <header className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {summaryLoading ? (
          <>
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
          </>
        ) : (
          <>
            {Object.values(summary).map((summaryValue, index) => (
              <Card
                key={summaryTitles[index]}
                className="flex h-full w-full flex-col p-6"
              >
                <span className="text-4xl font-semibold text-primary">
                  {summaryValue}
                </span>
                <p className="text-sm text-secondary-foreground">
                  {summaryTitles[index]}
                </p>
              </Card>
            ))}
          </>
        )}
      </header>
      <nav>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione os gráficos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pizza">Pizza</SelectItem>
            <SelectItem value="waffle">Waffle</SelectItem>
          </SelectContent>
        </Select>
      </nav>
      <div className="grid grid-cols-2 gap-6">
        {questionLoading ? (
          <>
            <Skeleton className="h-[300px]" />
            <Skeleton className="h-[300px]" />
          </>
        ) : (
          questionResults?.questions.map((question) => (
            <ResponseCard key={question.id} question={question} />
          ))
        )}
      </div>
    </div>
  )
}
