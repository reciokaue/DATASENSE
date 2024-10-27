'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { useAuth } from '@/src/contexts/Auth'

import { Props, schema } from './schema'

export default function RegisterPage() {
  const { createAccount } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Props>({
    resolver: zodResolver(schema),
  })

  type registerArgs = [string, string, string]
  const registerMutation = useMutation({
    mutationFn: (args: registerArgs) => createAccount(...args),
    onError: (err) => {
      console.log(err)
    },
  })

  function handleSignUp({ email, password, name }: Props) {
    registerMutation.mutateAsync([email, password, name])
  }
  return (
    <section
      suppressHydrationWarning
      className="flex min-h-screen items-center justify-center bg-background"
    >
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="flex max-w-md flex-1 flex-col gap-6 rounded-md border p-6"
      >
        <header className="mb-4 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-medium text-primary">Criar conta</h1>
        </header>
        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-base text-primary/90">Nome</h2>
            <Input
              type="name"
              id="name"
              placeholder="Seu nome"
              {...register('name')}
            />
            <span className="text-sm text-red-500">{errors.name?.message}</span>
          </div>
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
        </section>
        <Button className="mt-4 w-full py-6 font-bold" disabled={isSubmitting}>
          Criar conta
        </Button>
        <Link href="/login">
          <p className="text-center text-sm text-muted-foreground">
            Já possui conta?{' '}
            <span className="text-blue-500 underline underline-offset-2">
              {' '}
              fazer login
            </span>
          </p>
        </Link>
      </form>
    </section>
  )
}
