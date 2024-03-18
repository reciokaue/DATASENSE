import { NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'
import { paramsToObject } from '@/utils/paramsToObject'
import { paginationSchema } from '@/utils/schemas/pagination'

export async function GET(req: NextRequest) {
  const { page, pageSize, query } = paginationSchema.parse(paramsToObject(req))

  const topics = await prisma.topic.findMany({
    where: {
      ...(query && {
        name: { contains: query },
      }),
    },
    take: pageSize,
    skip: pageSize * page,
  })
  const topicsFormated = topics.map((topic) => topic.name)

  return Response.json(topicsFormated, { status: 200 })
}

export async function POST(req: NextRequest) {
  const { topics } = await req.json()

  if (topics.length === 0)
    return Response.json({ message: 'missing data' }, { status: 400 })

  async function addTopic(topic: string) {
    try {
      await prisma.topic.create({
        data: {
          name: topic,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  await Promise.all(
    topics.map((topic: string) => {
      return addTopic(topic)
    }),
  )

  return Response.json({ status: 201 })
}

export async function DELETE(req: NextRequest) {
  const { topics } = await req.json()

  if (topics.length === 0)
    return Response.json({ message: 'missing data' }, { status: 400 })

  await prisma.topic.deleteMany({
    where: {
      name: { in: topics },
    },
  })

  return Response.json({ status: 200 })
}
