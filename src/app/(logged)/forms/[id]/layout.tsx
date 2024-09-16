import { Sidebar } from '@/src/components/sidebar'

export default function FormLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return (
    <div className="mx-auto flex h-full w-full max-w-screen-xl  p-6 ">
      <Sidebar formId={params.id} />
      <div className="flex w-full flex-col gap-3">{children}</div>
    </div>
  )
}
