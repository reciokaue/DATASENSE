import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonPage() {
  return (
    <>
      <nav className="flex items-center justify-between px-4 py-3 sm:px-6 md:px-10">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
          DATASENSE
        </h1>
      </nav>
      <Skeleton className="flex h-96 w-full rounded-xl border border-border" />
      <header className="flex flex-col space-y-2 px-4 py-3 text-start sm:px-6 md:px-10">
        <Skeleton className="my-2 h-3 w-2/5 rounded-sm" />
        <Skeleton className="h-3 w-full rounded-sm" />
        <Skeleton className="h-3 w-full rounded-sm" />
        <Skeleton className="h-3 w-full rounded-sm" />
        <Badge variant="secondary" className="my-2 text-sm sm:text-base">
          Enviamos suas respostas anonimamente
        </Badge>
      </header>
      <div className="flex h-full flex-1 flex-col items-start gap-10 px-4 py-3 sm:px-6 md:px-10">
        <Skeleton className="h-60 w-full" />
        <Skeleton className="h-60 w-full" />
        <Skeleton className="h-60 w-full" />
      </div>
      <footer className="flex w-full  px-4 py-3 sm:px-6 md:px-10">
        <Skeleton className="h-12 w-full " />
      </footer>
    </>
  )
}
