import { api } from '@/lib/api'

import { QuestionList } from './question-list'

export default async function Page({ params }: { params: { formId: string } }) {
  const { data: form } = await api.get(`/form/${params.formId}`)

  return (
    <div>
      <section>
        <div className="max-w-[450px] space-y-2">
          <h1 className="text-2xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {form.name}
          </h1>
          <p className="text-md overflow-ellipsis text-muted-foreground">
            {form.about}
          </p>
        </div>
      </section>
      <QuestionList questions={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
    </div>
  )
}
