import { NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { formId: string } },
) {
  const { formId } = params

  const form = await prisma.form.findUnique({
    where: {
      id: formId,
    },
    include: { questions: { include: { options: true } } },
  })

  return Response.json(form, { status: 200 })
}
