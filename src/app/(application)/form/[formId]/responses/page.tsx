'use client'

import { useQueryParams } from '@/utils/useQueryParams'

import { Cards } from './cards'
import { Filters } from './filters'
import { Summary } from './summary'
import { Table } from './table'

export default function ResponsesPage({
  params,
}: {
  params: { formId: string }
}) {
  const { searchParams } = useQueryParams()
  const { formId } = params

  const viewType = searchParams.get('view') || 'cards'

  return (
    <div className="mx-auto flex h-full w-full max-w-screen-lg flex-col items-center space-y-6 pb-10">
      <Summary formId={formId} />
      <Filters formId={formId} />

      {viewType === 'cards' && <Cards formId={formId} />}
      {viewType === 'table' && <Table formId={formId} />}
    </div>
  )
}
