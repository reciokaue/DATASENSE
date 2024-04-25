# DATASENSE

Sistema de captação e analise de dados através de formulários online

Grupo:  

- Kauê Recio Carpim Sala.  
- Leonardo Marcel Hyppolito.  

## Tecnologias: 

- React. 
- Node. 

O objetivo do projeto é disponibilizar uma forma apurada e precisa de coletar e analisar dados de pesquisas de mercado em geral, sem a necessidade de experiencia previa na area, disponibilizando modelos testados e aprovados, por um preço acessível

## Público alvo 

- Gerentes de empresas de pequeno e médio porte que desejam conhecer melhor seu cliente
- Gerentes de empresas de pequeno e médio porte que desejam conhecer seus próprios funcionários e aplicar questionários internos

## Principais dores que o projeto resolve 

A incapacidade do gerente de conhecer seu cliente e suas necessidades
O custo elevado para se contratar agências de publicidade e marketing

## Formas de Monetização

- Cobrança por pesquisa respondida
- Anúncios
- Planos

## Requisitos da primeira versão (MVP):
 
- O gerente deve conseguir selecionar questões/formulários prontos para criar seu formulário. 
- O gerente deve conseguir ativar e desativar formulários. 
- O gerente deve conseguir criar as questões do seu formulário. 
- O gerente deve selecionar uma data limite para formulários. 
- O usuário deve conseguir responder os formulários. 
- O administrador deve conseguir visualizar os gerentes e seus formulários. 
- O administrador deve conseguir criar e editar questões.
- O administrador deve conseguir criar e editar tópicos.
- O sistema deve salvar formulários inativos. 
- O sistema deve apresentar os resultados dos formulários. 
- O sistema deve gerar um qrCode e um link de acesso à formulário. 

## Observações:

- O gerente só pode alterar questões de um formulário se este não tiver respostas. 
- O sistema deve armazenar as datas e os horários das respostas dos usuários. 
- O gerente pode escolher a ordem das perguntas. 

## Perfis:

#### Usuário
  Permite responder os formulários

#### gerente:
  Permite criar e finalizar formulários
  Permite visualizar dados dos formulários
  Permite personalizar perguntas do formulário

#### Administrador.
  Permite visualizar usuários
  Permite visualizar formulários
  Permite criar e editar tópicos
  Permite criar e editar questões

## Casos de uso

![Casos de uso](./docs/useCases.drawio.png)

Manager
  -Auth
    -login
    -register
    -forgot password
  -Crud Forms
    -create
    -read
    -delete
    -change
    +add public questions
    +use models
    +toggle active
    +toggle public
    +generate qrcode/link

Admin
  -Crud Public Forms
    -create
    -read
    -delete
    -change
  -Crud Public Questions
    -create
    -read
    -delete
  -Crud Topics
    -create
    -read
    -delete
  -View users
    -list users w/ pagination
      -show (name, email, number of forms, plan)

User
  - responder formulário


Possíveis rotas
  Manager [
    - POST "/auth/login" request: {
      email: string
      password: string
    }
    response: {token: string}

    - Post "/auth/register" request: {
      name: string
      email: string
      password: string
    }
    response: {token: string}

    - POST "/auth/forgot-password" request:  {
      "email": "example@example.com"
    }
  ]



## Modelo de entidade e relacionamento ER

![Diagrama ER](./docs/conceitual.drawio.png)

## Modelo de entidade e relacionamento ER

![Diagrama de Classes](./docs/class.diagram.drawio.png)


## Modelo ERD

![Diagrama ERD](./docs/ERD.svg)
