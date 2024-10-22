import { Sidebar } from '@/src/components/sidebar'

export default function FormLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return (
    <div className="mx-auto flex w-screen max-w-screen-xl flex-1 ">
      <Sidebar formId={params.id} />
      <div className="flex h-full w-full flex-col gap-3 bg-gray-50 p-6">
        {children}
      </div>
    </div>
  )
}
