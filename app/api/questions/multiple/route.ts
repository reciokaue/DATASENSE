import { NextRequest } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { QuestionSchema } from '@/utils/schemas/form'

const multipleQuestionSchema = z.array(QuestionSchema)

export async function POST(req: NextRequest) {
  const questions = await req.json()

  if (questions.length === 0)
    return Response.json({ message: 'missing data' }, { status: 400 })

  const validated = multipleQuestionSchema.safeParse(questions)
  if (!validated.success) {
    return Response.json({ message: 'Data invalid' }, { status: 400 })
  }

  async function addQuestion(question: any) {
    try {
      await prisma.question.create({
        data: question as any,
      })
    } catch (e) {
      console.log(e)
    }
  }

  await Promise.all(
    validated.data.map((question: any) => {
      return addQuestion(question)
    }),
  )

  return Response.json({ status: 201 })
}
