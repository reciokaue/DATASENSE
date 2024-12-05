import { Navbar } from '@/components/navbar'

export default function CommunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto flex h-screen w-full flex-col overflow-x-hidden ">
      <Navbar />
      <main className="relative mx-auto flex h-full w-full max-w-screen-xl flex-col p-6">
        {children}
      </main>
    </div>
  )
}
