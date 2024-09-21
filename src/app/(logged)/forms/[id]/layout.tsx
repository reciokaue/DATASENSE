import { Sidebar } from '@/src/components/sidebar'

export default function FormLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return (
    <div className="mx-auto flex h-full w-full max-w-screen-xl ">
      <Sidebar formId={params.id} />
      <div className="flex w-full flex-col gap-3 bg-gray-50 p-6">
        {children}
      </div>
    </div>
  )
}
