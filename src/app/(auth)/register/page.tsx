'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { registerUser } from '@/api/sign-up'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/useAuth'

import { Props, schema } from './schema'

export default function RegisterPage() {
  const { setUser } = useAuth()
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Props>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync: signUp, isPending } = useMutation({
    mutationFn: registerUser,
    onError: (e) => toast(e.message, { type: 'error' }),
    onSuccess: () => {
      push('/home')
      toast('Bem vindo', { type: 'info' })
    },
  })

  async function handleSignUp(data: Props) {
    const { email, password, name, rememberMe } = data

    const auth = await signUp({ email, password, name })
    localStorage.setItem('datasense@firstTime', 'true')

    setUser({ auth, rememberMe })
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-background">
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
        <Button className="mt-4 w-full py-6 font-bold" isLoading={isPending}>
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
