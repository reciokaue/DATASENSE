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
    include: { questions: { include: { topics: true, options: true } } },
  })
  const formatedForm = {
    ...form,
    questions: form?.questions.map((question) => ({
      ...question,
      topics: question.topics.map((topic) => topic.name),
    })),
  }

  return Response.json(formatedForm, { status: 200 })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { formId: string } },
) {
  const { formId } = params

  await prisma.form.delete({
    where: {
      id: formId,
    },
    include: { questions: { include: { options: true } } },
  })

  return Response.json('deleted', { status: 200 })
}
