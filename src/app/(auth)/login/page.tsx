'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { LoaderIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/Auth'

import { loginSchema, loginSchemaProps } from './schema'

export default function LoginPage() {
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<loginSchemaProps>({
    resolver: zodResolver(loginSchema),
  })
  type loginArgs = [string, string, boolean]
  const loginMutation = useMutation({
    mutationFn: (args: loginArgs) => login(...args),
    onError: (err) => {
      console.log(err)
    },
  })

  function handleSignIn({ email, password, rememberMe }: loginSchemaProps) {
    loginMutation.mutateAsync([email, password, rememberMe])
  }

  useEffect(() => {
    const email = localStorage.getItem('datasense_email')
    reset({
      email: email || '',
      rememberMe: email !== '',
    })
  }, [reset])

  return (
    <section
      suppressHydrationWarning
      className="flex min-h-screen items-center justify-center bg-background"
    >
      <form
        onSubmit={handleSubmit(handleSignIn)}
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
                    onCheckedChange={(checked: boolean) => {
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
          {isSubmitting ? <LoaderIcon className="animate-spin" /> : 'Login'}
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
