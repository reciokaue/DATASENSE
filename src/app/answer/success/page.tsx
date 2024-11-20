import Image from 'next/image'

import { Button } from '@/components/ui/button'

export default function SuccessPage() {
  return (
    <main className="mx-auto h-full min-h-screen w-full max-w-md flex-col px-4 py-3 sm:px-6 md:px-10">
      <nav className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
          DATASENSE
        </h1>
      </nav>
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center py-10">
        <Image
          width="600"
          height="400"
          src="/images/blog/blog-post-1.jpg"
          alt="Ilustração de agradecimento"
          className="image aspect-auto w-full max-w-md object-contain"
        />
        <h2 className="text-3xl font-bold text-primary sm:text-4xl">
          Obrigado por responder!
        </h2>
        <p className="mt-4 text-center text-lg text-gray-700 dark:text-gray-300 sm:text-xl">
          Suas respostas foram enviadas com sucesso. Estamos gratos por sua
          contribuição!
        </p>
      </div>
      <div className="mt-10 w-full max-w-md">
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
