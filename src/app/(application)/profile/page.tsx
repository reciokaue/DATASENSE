'use client'

import { Upload } from 'lucide-react'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface User {
  name: string
  email: string
  password: string
  profileImage?: File | string // Suporte para upload de imagem
}

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '',
      profileImage: '',
    },
  })

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data)
    setIsEditing(false)
  }

  const handleEdit = () => setIsEditing((prev) => !prev)

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]
  //   if (file) setValue('profileImage', file)
  // }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col">
      <header className="flex flex-col space-y-1.5 text-center sm:text-left">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          Meu Perfil
        </h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-4">
        <div className="flex gap-6">
          <div className="flex items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex aspect-square size-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <Upload />
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
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
              <Label htmlFor="password">Senha *</Label>
              <Input
                id="password"
                type="password"
                disabled={!isEditing}
                placeholder="Senha"
                {...register('password', { required: 'Senha é obrigatória' })}
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
          <Button variant="outline" onClick={handleEdit}>
            {isEditing ? 'Cancelar' : 'Editar'}
          </Button>
          {isEditing && <Button type="submit">Salvar Alterações</Button>}
        </footer>
      </form>
    </div>
  )
}
