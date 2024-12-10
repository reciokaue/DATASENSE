import { ArrowRight, ArrowUp } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

export function FirstTime() {
  const [done, setDone] = useState(false)
  const firstTime = localStorage.getItem('datasense@firstTime') !== 'false'

  if (!firstTime || done) return

  function setViewed() {
    localStorage.setItem('datasense@firstTime', 'false')
    setDone(true)
  }

  return (
    <div className="fixed inset-0 z-20  h-screen w-screen bg-primary/50 p-10">
      <div className="relative mx-auto mt-3 flex max-w-7xl gap-8 text-white">
        <h1 className="invisible text-2xl font-bold text-gray-900 dark:text-white">
          DATASENSE
        </h1>
        <div className="flex space-x-1">
          <div className="flex max-w-[140px] flex-col items-center text-center">
            <ArrowUp />
            Aqui ficam seus formulários
          </div>
          <div className="flex max-w-[150px] flex-col items-center text-center">
            <ArrowUp />
            Aqui fica a comunidade cheia de formulários de exemplo que você pode
            usar
          </div>
          <div className="flex max-w-[130px] flex-col items-center text-center">
            <ArrowUp />
            Aqui ficam posts para te ajudar a criar seus formulários
          </div>
          <div className="flex max-w-[100px] flex-col items-center text-center">
            <ArrowUp />
            Planos premium
          </div>
        </div>
        <div className="absolute right-10 mt-24 flex max-w-[100px] flex-col items-center pl-10 text-center">
          <ArrowUp />
          Aqui você cria novos formulários
        </div>
        <div className="absolute -top-8 right-20 flex items-center gap-2 pl-10 text-center">
          Aqui fica seu perfil
          <ArrowRight />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-10">
        <Button variant="secondary" onClick={setViewed}>
          Entendi
        </Button>
      </div>
    </div>
  )
}
