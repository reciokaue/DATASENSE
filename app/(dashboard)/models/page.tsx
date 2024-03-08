import { Search, X } from 'lucide-react'
import { Suspense } from 'react'

import { FormCard } from '@/components/form-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'

export default async function Page() {
  const forms = await api.get('/form', {
    params: {
      isDefault: true,
    },
  })
  // const topics = await api.get('/form')

  return (
    <div className="screen:px-0 mx-auto flex max-w-6xl flex-col px-10">
      <header className="flex items-center justify-between py-4">
        <h1 className="text-3xl font-semibold text-primary">Modelos</h1>
        <Button size="icon" variant="ghost">
          <X className="h-4 w-4 text-primary" />
        </Button>
      </header>
      <section>
        <div className="mt-4 flex gap-2">
          {/* {[{ name: 'Todas' }, ...topics.data].map((tag) => (
            <Badge
              variant={tag.name === 'Todas' ? 'default' : 'ghost'}
              key={tag.name}
            >
              {tag.name}
            </Badge>
          ))} */}
        </div>
        <div className="relative mt-4 w-full">
          <span className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center">
            <Search className="text-primary/60" size={20} />
          </span>
          <Input
            type="email"
            placeholder="Procurar..."
            className="w-full pl-10"
          />
        </div>
        <h1 className="mt-8 text-xl font-semibold">Todas</h1>
        <section className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {forms.data?.map((form: any) => (
            <FormCard data={form} key={form.id} />
          ))}
        </section>
      </section>
    </div>
  )
}
