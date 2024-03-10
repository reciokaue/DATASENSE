import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'
import { paramsToObject } from '@/utils/paramsToObject'
import { paginationSchema } from '@/utils/schemas/pagination'

import { FormSchema } from './schemas'

export async function GET(req: NextRequest) {
  const token = cookies().get('@feedback.view:auth-token')
  const decoded = jwt.verify(token?.value, 'B9S1G094LXL')

  const { page, pageSize, query } = paginationSchema.parse(paramsToObject(req))

  const forms = await prisma.form.findMany({
    where: {
      userId: decoded?.sub,
      ...(query && {
        name: { contains: query },
        about: { contains: query },
      }),
    },
    take: pageSize,
    skip: pageSize * page,
  })

  return Response.json(forms, { status: 200 })
}

export async function POST(req: NextRequest) {
  const token = cookies().get('@feedback.view:auth-token')
  const decoded = jwt.verify(token?.value, 'B9S1G094LXL')

  const validated = FormSchema.safeParse(await req.json())
  if (!validated.success) {
    return Response.json({ message: 'Data invalid' }, { status: 400 })
  }
  validated.data.userId = decoded.sub

  const topicExistis = await prisma.topic.findUnique({
    where: {
      name: validated.data.topic,
    },
  })
  if (!topicExistis)
    return Response.json({ message: 'Topic not found' }, { status: 404 })

  const form = await prisma.form.create({
    data: validated.data,
  })

  return Response.json(form, { status: 200 })
}
