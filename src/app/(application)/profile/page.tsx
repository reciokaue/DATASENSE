'use client'

import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { updateUser } from '@/api/update-user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/Auth'

import { DeleteAccountDialog } from './delete-account-dialog'
import { UploadImage } from './image'

interface User {
  name: string
  email: string
  password: string
}

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const { user, setUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: '',
    },
  })

  const onSubmit: SubmitHandler<User> = async (data) => {
    await updateUserMutation.mutateAsync({
      id: user.id,
      name: data.name || user.name,
      email: data.email || user.email,
      ...(data?.password && { password: data.password }),
    })
    setIsEditing(false)
  }

  const updateUserMutation = useMutation({
    mutationFn: (user: any) => updateUser(user),
    onSuccess: (user) => {
      setUser(user)
    },
  })

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col">
      <header className="flex flex-col space-y-1.5 text-center sm:text-left">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          Meu Perfil
        </h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-4">
        <div className="flex gap-6">
          <UploadImage user={user} setUser={setUser} />
          <div className="flex w-full flex-col space-y-2">
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                type="text"
                disabled={!isEditing}
                placeholder="Nome"
                {...register('name', { required: 'Nome é obrigatório' })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                disabled={!isEditing}
                placeholder="Email"
                {...register('email', { required: 'Email é obrigatório' })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="password">Nova senha</Label>
              <Input
                id="password"
                type="password"
                disabled={!isEditing}
                placeholder="Senha"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <footer className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <DeleteAccountDialog />
          <Button type="button" variant="outline" onClick={handleEdit}>
            {isEditing ? 'Cancelar' : 'Editar'}
          </Button>
          {isEditing && <Button type="submit">Salvar Alterações</Button>}
        </footer>
      </form>
    </div>
  )
}
