import { NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'
import { paramsToObject } from '@/utils/paramsToObject'
import { QuestionSchema } from '@/utils/schemas/form'
import { paginationSchema } from '@/utils/schemas/pagination'

export async function GET(req: NextRequest) {
  const { page, pageSize, query, isPublic } = paginationSchema.parse(
    paramsToObject(req),
  )

  const questions = await prisma.question.findMany({
    where: {
      ...(query && {
        text: { contains: query },
      }),
      ...(isPublic && {
        isPublic: true,
      }),
    },
    take: pageSize,
    skip: pageSize * page,
    include: { _count: true },
  })

  return Response.json(questions, { status: 200 })
}

export async function POST(req: NextRequest) {
  // const token = cookies().get('@feedback.view:auth-token')
  // const decoded = token && jwt.verify(token?.value, 'B9S1G094LXL')

  const validated = QuestionSchema.safeParse(await req.json())
  if (!validated.success) {
    return Response.json({ message: 'Data invalid' }, { status: 400 })
  }

  const question = await prisma.question.create({
    data: validated.data as any,
  })

  return Response.json(question, { status: 200 })
}
