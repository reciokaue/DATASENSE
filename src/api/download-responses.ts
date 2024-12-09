import { api } from '@/lib/api'

interface DownloadProps {
  formId: string | number
  formName: string
  format: 'csv' | 'excel'
}

export async function downloadResponses({
  formId,
  format,
  formName,
}: DownloadProps) {
  const response = await api.get(`/responses/form/${formId}/download`, {
    params: { format: format || 'excel' },
    responseType: 'blob',
  })
  const filename = `${formName}-${new Date().toISOString().split('T')[0]}`

  const blob = new Blob([response.data], {
    type: response.headers['content-type'],
  })

  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url

  link.download = `${filename}.${format === 'csv' ? 'csv' : 'xlsx'}`
  document.body.appendChild(link)
  link.click()

  link.remove()
  window.URL.revokeObjectURL(url)
}
