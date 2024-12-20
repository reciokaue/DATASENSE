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
import { renderCustomizedLabel } from '@/components/form/custom-label'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { COLORS } from '@/styles/colors'

import { CardTable } from './card-table'

interface ResponseCardProps {
  question: QuestionResult
}

const staticsLabels = ['Média', 'Mínimo', 'Máximo', 'Mediana']

export function ResponseCard({ question }: ResponseCardProps) {
  return (
    <Card className="flex flex-col p-6">
      <h3 className="mb-2 break-words text-xl font-semibold">
        {question.text}
      </h3>
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
              <p className="text-lg font-medium">{statistic}</p>
            </Card>
          ))}
        </header>
      )}
      {question.hasNumericValues && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={question.chartData} className="-ml-6 mt-2">
            <XAxis dataKey="label" />
            <YAxis interval={1} />
            <Tooltip content={CustomTooltip} />
            <Bar dataKey="value" fill="#8884d8">
              {question.chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
      {question.isMultipleChoice && (
        <div className="flex flex-col items-start">
          <ResponsiveContainer
            className="col-span-3"
            width="100%"
            // height="100%"
            height={300}
          >
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
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2">
            {question.chartData.map((option, index) => (
              <Button
                className="justify-between overflow-hidden"
                variant="secondary"
                key={option.label}
              >
                {option.label}
                <span>
                  {option.percentage.toFixed(1)}% {option.value}
                </span>
                <span
                  className={`absolute left-0 h-full w-2 bg-chart-${index}`}
                />
              </Button>
            ))}
          </div>
        </div>
      )}

      {question.responses && <CardTable question={question} />}
    </Card>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-primary/20 p-2 text-white">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    )
  }

  return null
}
