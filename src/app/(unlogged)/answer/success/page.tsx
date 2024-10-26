import { Handshake } from 'lucide-react'

export default function Success() {
  return (
    <main className="mx-auto flex h-screen max-w-xl flex-col items-center justify-center overflow-hidden rounded-2xl p-10">
      <h1 className="text-5xl font-bold text-gray-800">Obrigado!</h1>
      <div className="my-10 flex items-center justify-center rounded-full bg-primary p-10">
        <Handshake className="size-40 text-primary-foreground" />
      </div>
      <p className="mb-6 text-center text-xl text-gray-600">
        Obrigado por preencher o formulário! Suas respostas foram enviadas com
        sucesso e são muito importantes para nós
      </p>
    </main>
  )
}
