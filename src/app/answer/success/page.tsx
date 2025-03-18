import Image from 'next/image'

import { Button } from '@/components/ui/button'

export default function SuccessPage() {
  return (
    <main className="mx-auto flex h-screen max-w-screen-sm flex-col items-center justify-between">
      <div className="flex w-full flex-1 flex-col p-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
          DATASENSE
        </h1>
        <Image
          width="600"
          height="600"
          src="/images/app/high-five.png"
          alt="Ilustração de agradecimento"
          className="w-full"
        />
        <div>
          <h2 className="text-center text-3xl font-bold text-primary sm:text-4xl">
            Obrigado por responder!
          </h2>
          <p className="mt-4 text-center text-lg text-gray-700 dark:text-gray-300 sm:text-xl">
            Suas respostas foram enviadas com sucesso. Estamos gratos por sua
            contribuição!
          </p>
        </div>
      </div>
      <div className="bg w-full px-4 pb-32">
        <Button
          type="button"
          className="h-12 w-full text-lg sm:h-14 sm:text-xl"
          link="/"
        >
          Crie seu próprio formulário
        </Button>
      </div>
    </main>
  )
}
