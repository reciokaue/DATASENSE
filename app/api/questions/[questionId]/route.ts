import { NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { questionId: string } },
) {
  const { questionId } = params

  const question = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
    include: { options: true },
  })

  return Response.json(question, { status: 200 })
}
