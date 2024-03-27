import { NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'
import { paramsToObject } from '@/utils/paramsToObject'
import { paginationSchema } from '@/utils/schemas/pagination'

export async function GET(req: NextRequest) {
  const { page, pageSize, query } = paginationSchema.parse(paramsToObject(req))

  const users = await prisma.user.findMany({
    where: {
      ...(query && {
        name: { contains: query },
      }),
    },
    take: pageSize,
    skip: pageSize * page,
  })

  return Response.json(users, { status: 200 })
}
