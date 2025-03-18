'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { login } from '@/api/login'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/useAuth'

import { loginSchema, loginSchemaProps } from './schema'

export default function LoginPage() {
  const { setUser } = useAuth()
  const { push } = useRouter()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<loginSchemaProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: true,
    },
  })

  const { mutateAsync: signIn, isPending } = useMutation({
    mutationFn: login,
    onError: (e) => toast(e.message, { type: 'error' }),
    onSuccess: () => {
      push('/home')
      toast('Bem vindo', { type: 'info' })
    },
  })

  async function handleSignIn(data: loginSchemaProps) {
    const { email, password, rememberMe } = data

    try {
      const auth = await signIn({ email, password })
      setUser({ auth, rememberMe })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const invalidade = async () => {
      await queryClient.cancelQueries()
      queryClient.clear()
    }
    invalidade()
  }, [queryClient])

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
          <h1 className="text-2xl font-medium text-primary">Bem-vindo</h1>
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
            <span data-test="error-message" className="text-sm text-red-500">
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
            <span data-test="error-message" className="text-sm text-red-500">
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
                    checked={checkbox.field.value}
                    onCheckedChange={() => {
                      checkbox.field.onChange(!checkbox.field.value)
                    }}
                    id="remember"
                    data-test="checkbox-remember-me"
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
        <Button
          data-test="button-login"
          className="mt-4 w-full py-6 font-bold"
          isLoading={isPending}
        >
          Login
        </Button>
        <Link href="/register" data-test="create-account-link">
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
