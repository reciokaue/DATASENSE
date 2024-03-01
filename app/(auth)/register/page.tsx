'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { setCookie } from '@/actions/setCookie'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'

export default function Login() {
  const router = useRouter()
  const { toast } = useToast()

  const schema = z.object({
    name: z.string().min(3, 'Deve ter no mínimo 3 caracteres'),
    email: z.string().email('Deve ser um email valido'),
    password: z.string().min(3, 'Deve ter no mínimo 3 caracteres').trim(),
  })
  type Props = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Props>({
    resolver: zodResolver(schema),
  })

  async function handleSign(data: Props) {
    try {
      const { email, password, name } = data
      const response = await api.post('/register', {
        email,
        password,
        name,
      })
      const authToken = response.data
      setCookie('authToken', authToken)
      router.push('/dashboard')
    } catch (e: any) {
      const message = e?.response.data.message
      console.log(message)
      if (message === 'This email already existis, please use another')
        toast({
          title: 'Email já cadastrado',
          description: 'Cadastre outro email ou faça login',
          variant: 'destructive',
        })
    }
  }

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
