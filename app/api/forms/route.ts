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
      ...(query && {
        name: { contains: query },
        about: { contains: query },
      }),
      ...(isPublic
        ? { isPublic: true }
        : { userId: '2a9aabf6-8e7a-4be8-92fc-3c0f373d8230' }),
    },
    take: pageSize,
    skip: pageSize * page,
    include: { _count: true },
  })

  return Response.json(forms || [], { status: 200 })
}

export async function POST(req: NextRequest) {
  const token = cookies().get('@feedback.view:auth-token')
  const decoded = token && jwt.verify(token?.value, 'B9S1G094LXL')

  const validated = FormSchema.safeParse(await req.json())
  if (!validated.success) {
    return Response.json({ message: 'Data invalid' }, { status: 400 })
  }

  validated.data.userId = !validated.data.isPublic ? String(decoded?.sub) : null

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
