'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { TagInput } from '@/components/ui/tag-input'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'

import { Textarea } from './ui/textarea'

const FormSchema = z.object({
  topics: z.array(z.string()).optional(),
  textarea: z
    .string()
    .transform((values) => {
      return values.split(',').map((topic) => topic.trim())
    })
    .optional(),
})

export default function TopicInput() {
  const [manual, setManual] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [tags, setTags] = React.useState<string[]>([])

  const { setValue, register } = form

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await api.post('/topic', {
      data: manual ? data.textarea : data.topics,
    })

    toast({
      title: 'Você criou os seguintes tópicos',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(
              manual ? { ...data.textarea } : { ...data.topics },
              null,
              2,
            )}
          </code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start space-y-6"
      >
        <FormField
          control={form.control}
          name="topics"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-left">Tópicos</FormLabel>
              <FormControl>
                <TagInput
                  {...field}
                  disabled={manual}
                  placeholder="digite um tópico"
                  tags={tags}
                  className="sm:min-w-[450px]"
                  setTags={(newTags) => {
                    setTags(newTags)
                    setValue('topics', newTags)
                  }}
                />
              </FormControl>
              <FormDescription>
                Estes são os tópicos nos quais você está interessado.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {manual && (
          <Textarea
            className="h-32 resize-none"
            placeholder='Digite os valores separados por virgula, ex: "tópico1, tópico2"'
            {...register('textarea')}
          />
        )}
        <div className="flex w-full justify-end gap-2">
          <Button type="submit">Salvar</Button>
          <Button
            type="button"
            onClick={() => setManual(!manual)}
            variant="secondary"
          >
            Manual
          </Button>
        </div>
      </form>
    </Form>
  )
}
