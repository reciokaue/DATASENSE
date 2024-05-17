'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/src/components/ui/button'
import { Checkbox } from '@/src/components/ui/checkbox'
import { Input } from '@/src/components/ui/input'
import { useToast } from '@/src/components/ui/use-toast'
import { useAuth } from '@/src/contexts/Auth'

import { treatError } from './erros'

export default function Login() {
  const { toast } = useToast()
  const { login } = useAuth()

  const schema = z.object({
    email: z.string().email('Deve ser um email valido'),
    password: z.string().min(6, 'Deve ter no mínimo 6 caracteres').trim(),
    rememberMe: z.boolean().nullable(),
  })
  type Props = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<Props>({
    resolver: zodResolver(schema),
  })

  async function handleSign(data: Props) {
    try {
      await login(data.email, data.password, data.rememberMe || false)
    } catch (e: any) {
      toast(treatError(e))
    }
  }

  useEffect(() => {
    async function getLoginInfo() {
      const email = localStorage.getItem('datasense_email')
      if (email !== '') setValue('rememberMe', true)
      setValue('email', email || '')
    }

    getLoginInfo()
  }, [setValue])

  return (
    <section
      suppressHydrationWarning
      className="flex min-h-screen items-center justify-center bg-background"
    >
      <form
        onSubmit={handleSubmit(handleSign)}
        className="flex max-w-md flex-1 flex-col gap-6 rounded-md border p-6"
      >
        <header className="mb-4 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-medium text-primary">Bem vindo</h1>
          <p className="text-muted-foreground">
            Informe seus dados para entrar
          </p>
        </header>
        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-base text-primary/90">Email</h2>
            <Input
              type="email"
              id="email"
              placeholder="Seu email"
              {...register('email')}
            />
            <span className="text-sm text-red-500">
              {errors.email?.message}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-base text-primary/90">Senha</h2>
            <Input
              type="password"
              id="password"
              placeholder="• • • • • • • • • • "
              {...register('password')}
            />
            <span className="text-sm text-red-500">
              {errors.password?.message}
            </span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <Controller
              control={control}
              name="rememberMe"
              render={(checkbox) => (
                <>
                  <Checkbox
                    checked={checkbox.field.value || false}
                    onCheckedChange={(checked) => {
                      checkbox.field.onChange(checked === true)
                    }}
                    id="remember"
                  />
                  <label
                    htmlFor="remember"
                    className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Lembrar de mim
                  </label>
                </>
              )}
            />
          </div>
        </section>
        <Button className="mt-4 w-full py-6 font-bold" disabled={isSubmitting}>
          Login
        </Button>
        <Link href="/register">
          <p className="text-center text-sm text-muted-foreground">
            Não possui conta ainda?{' '}
            <span className="text-blue-500 underline underline-offset-2">
              {' '}
              criar conta
            </span>
          </p>
        </Link>
      </form>
    </section>
  )
}
