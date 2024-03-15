import { Combobox } from '@/components/ui/combobox'
import { api } from '@/lib/api'

export default async function Page({ params }: { params: { formId: string } }) {
  const { data: form } = await api.get(`/form/${params.formId}`)

  return (
    <div>
      <section>
        <div className="max-w-[450px] space-y-2 bg-red-200">
          <h1 className="text-2xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {form.name}
          </h1>
          <p className="text-md overflow-ellipsis text-muted-foreground">
            {form.about}
          </p>
          <footer className="flex">
            <div></div>
            <Combobox frameworks={[]} defaultValue={form.topic} styles="" />
          </footer>
        </div>
        <div></div>
      </section>
      My Post: {params.formId}
    </div>
  )
}
