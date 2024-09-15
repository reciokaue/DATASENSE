import Link from 'next/link'

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <nav className="flex gap-4">
        <Link href="/community/forms">Forms</Link>
        <Link href="/community/questions">Questions</Link>
      </nav>
      {children}
    </div>
  )
}
