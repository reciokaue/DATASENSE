import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const bodySchema = z.object({
    password: z.string().min(6).max(30),
    email: z.string().email(),
  })
  const { password, email } = bodySchema.parse(await req.json())

  const user = await prisma.user.findUnique({
    where: { email },
  })
  if (!user)
    return Response.json({ message: 'User does not exist.' }, { status: 400 })

  const comparedPassword = await bcrypt.compare(password, user?.password)
  if (!comparedPassword)
    return Response.json({ message: 'Invalid Password.' }, { status: 400 })

  const token = jwt.sign(
    { name: user.name, email, sub: user.id },
    'B9S1G094LXL',
    { expiresIn: '30 days' },
  )

  return Response.json(token, { status: 200 })
}
