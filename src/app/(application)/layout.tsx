import { Navbar } from '@/components/navbar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto flex h-screen w-full flex-col ">
      <Navbar />
      <main className="mx-auto flex h-full w-full max-w-screen-xl flex-col p-6">
        {children}
      </main>
    </div>
  )
}
