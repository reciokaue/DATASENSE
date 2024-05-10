import { QuestionDTO } from '../DTOs/question'

interface QuestionCardProps {
  data: QuestionDTO
  responses: number
}

const colors = [
  'green-500',
  '#ff6384',
  '#36a3eb',
  '#ffce56',
  '#4bc0c0',
  '#9966ff',
  '#ff9f40',
]

export function QuestionCard({ data, responses }: QuestionCardProps) {
  const greater = data.options.reduce((acc, op) =>
    op.responses > acc.responses ? op : acc,
  )

  return (
    <div className="flex max-w-[50%] flex-col gap-2 rounded-md bg-muted">
      <header className="flex border-b ">
        <h1 className="w-full p-4 text-2xl font-medium text-primary/80">
          {data.text}
        </h1>
        <div className="flex flex-col items-center justify-center border-l  p-4">
          <h2 className="text-3xl">
            {Math.trunc((greater.responses / responses) * 100)}%
          </h2>
          <span className="text-sm text-primary">{greater.text}</span>
        </div>
      </header>
      <footer className="flex flex-col gap-1 p-4">
        {data.options.map((option, index) => {
          const size =
            option.responses !== 0
              ? Math.trunc((option.responses / responses) * 100) + '%'
              : '1%'

          return (
            <div className="flex gap-2" key={option.text + option.emoji}>
              <div className="h-5 w-full overflow-hidden rounded-sm bg-primary/5">
                <div
                  style={{ width: size, background: colors[index] }}
                  className="h-full bg-green-200"
                />
              </div>
              <div className="flex min-w-36 justify-end gap-2">
                <p className="text-primary/65">
                  {option.text} {option.emoji}
                </p>
                {option.responses}
              </div>
            </div>
          )
        })}
      </footer>
    </div>
  )
}
