import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={'https://github.com/reciokaue/DATASENSE'}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Acompanhe no GitHub
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Datasense: Sistema de Coleta e Análise de Dados por Formulários
            Online
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Um projeto para simplificar a coleta de dados e oferecer insights
            precisos, mesmo sem experiência prévia, a um custo acessível.
          </p>
          <div className="space-x-4">
            <Link
              href="/register"
              className={cn(buttonVariants({ size: 'lg' }))}
            >
              Comece Agora
            </Link>
            <Link
              href={'https://github.com/reciokaue/DATASENSE'}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="space-y-6 bg-stone-100 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Funcionalidades
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Um sistema completo para criar formulários, captar respostas e gerar
            análises de forma prática e acessível.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <FeatureCard
            title="Criação de Formulários"
            description="Escolha modelos prontos, edite perguntas e personalize seus formulários para coleta de dados."
          />
          <FeatureCard
            title="Análises Detalhadas"
            description="Acompanhe os resultados em tempo real e obtenha insights sobre clientes e colaboradores."
          />
          <FeatureCard
            title="QR Code e Link de Acesso"
            description="Distribua facilmente seus formulários por meio de QR codes e links diretos."
          />
          <FeatureCard
            title="Gerenciamento de Usuários"
            description="Controle total sobre os gerentes e formulários através de um painel administrativo."
          />
          <FeatureCard
            title="Resultados Visuais"
            description="Visualize gráficos e tabelas dos resultados coletados."
          />
          <FeatureCard
            title="Planos Flexíveis"
            description="Escolha o plano mais adequado para suas necessidades de coleta de dados."
          />
        </div>
      </section>
    </>
  )
}

function FeatureCard({ title, description }) {
  return (
    <div className="flex h-[150px] flex-col space-y-2 rounded-lg bg-background p-6 shadow-sm hover:shadow ">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
