import { useEffect, useState } from 'react'
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

// import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
// import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface FormSummary {
  totalSessions: number
  totalResponses: number
  totalQuestions: number
  averageResponsesPerSession: number
  completionRate: number
}

interface QuestionResult {
  id: number
  text: string
  type: string
  index: number
  required: boolean
  isMultipleChoice: boolean
  hasNumericValues: boolean
  totalResponses: number
  chartData?: Array<{ label: string; value: number; percentage: number }>
  statistics?: {
    average: number
    min: number
    max: number
    median: number
  }
  responses?: Array<{ text: string; count: number }>
}

interface QuestionsResults {
  formId: number
  totalQuestions: number
  questions: QuestionResult[]
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#82ca9d',
]

export function Responses() {
  const [summary, setSummary] = useState<FormSummary | null>(null)
  const [results, setResults] = useState<QuestionsResults | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formId = '1' // Substitua pelo ID do formulário atual
        const [summaryData, resultsData] = await Promise.all([
          fetch(`/api/analytics/forms/${formId}/summary`).then((res) =>
            res.json(),
          ),
          fetch(`/api/analytics/forms/${formId}/questions-results`).then(
            (res) => res.json(),
          ),
        ])
        setSummary(summaryData)
        setResults(resultsData)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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

  if (loading) {
    return (
      <div className="p-8">
        <Skeleton className="h-[400px]" />
      </div>
    )
  }

  return (
    <div className="flex flex-col pb-10">
      <header className="flex items-center justify-center gap-3 pt-6">
        <Card className="flex w-fit flex-col p-6">
          <span className="text-4xl font-semibold text-primary">
            {summary?.totalSessions}
          </span>
          <p className="text-sm text-secondary-foreground">Total de sessões</p>
        </Card>
        <Card className="flex w-fit flex-col p-6">
          <span className="text-4xl font-semibold text-primary">
            {summary?.totalResponses}
          </span>
          <p className="text-sm text-secondary-foreground">
            Total de respostas
          </p>
        </Card>
        <Card className="flex w-fit flex-col p-6">
          <span className="text-4xl font-semibold text-primary">
            {summary?.completionRate.toFixed(1)}%
          </span>
          <p className="text-sm text-secondary-foreground">Taxa de conclusão</p>
        </Card>
      </header>

      <div className="mx-auto mt-8 w-full max-w-screen-lg px-4">
        {/* <ScrollArea className="rounded-md border"> */}
        {results?.questions.map((question) => (
          <Card key={question.id} className="mb-6 p-6">
            <h3 className="mb-4 text-xl font-semibold">{question.text}</h3>

            {question.statistics && (
              <div className="mb-4 grid grid-cols-4 gap-4">
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

            {renderChart(question)}

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
                      <TableCell>{response.text}</TableCell>
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
        {/* </ScrollArea> */}
      </div>
    </div>
  )
}
