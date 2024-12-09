import { Navbar } from '@/components/navbar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto flex h-screen w-full flex-col ">
      <Navbar />
      {children}
    </div>
  )
}
