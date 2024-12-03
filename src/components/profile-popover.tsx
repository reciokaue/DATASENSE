import { User2 } from 'lucide-react'
import Image from 'next/image'

import { useAuth } from '../contexts/Auth'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export function ProfilePopover() {
  const { user, logout } = useAuth()

  if (!user?.id)
    return (
      <div className="flex gap-3">
        <Button link="/register" variant="secondary">
          Criar conta
        </Button>
        <Button link="/login">Login</Button>
      </div>
    )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex aspect-square size-10 items-center justify-center rounded-full bg-gray-200">
          <Image
            src={user.profileImage}
            alt={user.name}
            width={80}
            height={80}
            className="h-full w-full"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="ml-10 flex w-56 flex-col gap-3" align="end">
        <div className="flex flex-col space-y-1">
          <Label>{user.name}</Label>
          <Label className="text-sm text-primary/70">{user.email}</Label>
        </div>
        <Button className="w-full" link="/profile" variant="secondary">
          Configurações
        </Button>
        <Button onClick={logout} variant="destructive">
          Sair
        </Button>
      </PopoverContent>
    </Popover>
  )
}
