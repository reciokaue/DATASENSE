import { Button } from '@/src/components/ui/button'

export function Initial() {
  return (
    <div className="flex h-full flex-col items-center justify-between">
      <h1 className="pt-10 text-2xl font-bold text-gray-900 dark:text-white">
        DATASENSE
      </h1>
      <p className=" p-10 text-center text-2xl leading-relaxed">
        Bem-vindo ao Datasense! Aqui, suas respostas são 100% anônimas. Nosso
        compromisso é garantir que seus dados pessoais permaneçam privados.
        Sinta-se à vontade para compartilhar suas respostas com total segurança.
      </p>
      <footer className="flex w-full flex-col space-y-4 p-8">
        <h2 className="invisible text-base font-medium">Obrigado</h2>
        <Button className="h-14 text-xl">Continuar</Button>
      </footer>
    </div>
  )
}
