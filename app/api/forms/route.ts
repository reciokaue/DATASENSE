import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'
import { paramsToObject } from '@/utils/paramsToObject'
import { FormSchema } from '@/utils/schemas/form'
import { paginationSchema } from '@/utils/schemas/pagination'

export async function GET(req: NextRequest) {
  const { page, pageSize, query, isPublic } = paginationSchema.parse(
    paramsToObject(req),
  )

  const forms = await prisma.form.findMany({
    where: {
      userId: '2a9aabf6-8e7a-4be8-92fc-3c0f373d8230',
      ...(query && {
        name: { contains: query },
        about: { contains: query },
      }),
      ...(isPublic && {
        isPublic: true,
      }),
    },
    take: pageSize,
    skip: pageSize * page,
    include: { _count: true },
  })

  return Response.json(forms, { status: 200 })
}

export async function POST(req: NextRequest) {
  const token = cookies().get('@feedback.view:auth-token')
  const decoded = token && jwt.verify(token?.value, 'B9S1G094LXL')

  const validated = FormSchema.safeParse(await req.json())
  if (!validated.success) {
    return Response.json({ message: 'Data invalid' }, { status: 400 })
  }

  validated.data.userId = String(decoded?.sub)

  try {
    const form = await prisma.form.create({
      data: validated.data as any,
    })
    return Response.json(form, { status: 200 })
  } catch (e) {
    console.log(e)
    return Response.json({ error: e, data: validated.data }, { status: 400 })
  }
}

// {"name":"Formulário de Pesquisa 123","about":"Este formulário tem o objetivo de coletar dados sobre...","active":true,"isPublic":true,"topics":{"create":[{"name":"Teste"}]},"questions":{"create":[{"text":"Qual é a sua idade?","type":"multiple-choice","topics":{},"options":{"create":[{"text":"Menos de 18 anos","value":1},{"text":"18-24 anos","value":2},{"text":"25-34 anos","value":3},{"text":"35-44 anos","value":4},{"text":"45-54 anos","value":5},{"text":"55-64 anos","value":6},{"text":"65 anos ou mais","value":7}]}},{"text":"Você possui experiência prévia com pesquisa de mercado?","type":"multiple-choice","topics":{},"options":{"create":[{"text":"Sim","value":1},{"text":"Não","value":2}]}}]}}
