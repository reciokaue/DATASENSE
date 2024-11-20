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

import { QuestionResult } from '@/api/get-question-results'
import { renderCustomizedLabel } from '@/components/custom-label'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { COLORS } from '@/styles/colors'

import { ResponsesTable } from './responses-table'

interface ResponseCardProps {
  question: QuestionResult
}

const staticsLabels = ['Média', 'Mediana', 'Mínimo', 'Máximo']

export function ResponseCard({ question }: ResponseCardProps) {
  return (
    <Card className="flex flex-col p-6">
      <h3 className="mb-2 text-xl font-semibold">{question.text}</h3>
      <div className="mb-4 text-sm text-secondary-foreground">
        Total de respostas: {question.totalResponses}
      </div>
      {question.statistics && (
        <header className="mb-10 grid grid-cols-4 gap-2">
          {Object.values(question.statistics).map((statistic, index) => (
            <Card key={staticsLabels[index]} className="p-4">
              <p className="text-sm text-secondary-foreground">
                {staticsLabels[index]}
              </p>
              <p className="text-lg font-medium">{statistic?.toFixed(1)}</p>
            </Card>
          ))}
        </header>
      )}

      {question.hasNumericValues && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={question.chartData}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
      {question.isMultipleChoice && (
        <div className="grid grid-cols-5 items-start">
          <div className="col-span-2 flex flex-col space-y-2">
            {question.chartData.map((option, index) => (
              <Button
                className="justify-between overflow-hidden"
                variant="secondary"
                key={option.label}
              >
                {option.label}
                <span>{option.percentage.toFixed(0)}%</span>
                <span
                  className={`absolute left-0 h-full w-2 bg-chart-${index}`}
                />
              </Button>
            ))}
          </div>
          <ResponsiveContainer className="col-span-3" width="100%" height={200}>
            <PieChart>
              <Pie
                data={question.chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
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
        </div>
      )}

      {question.responses && <ResponsesTable question={question} />}
    </Card>
  )
}
