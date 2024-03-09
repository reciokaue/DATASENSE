import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const bodySchema = z.object({
    password: z.string().min(6).max(30),
    email: z.string().email(),
    name: z.string().max(50),
  })
  const { password, email, name } = bodySchema.parse(await req.json())

  const userExists = await prisma.user.findUnique({
    where: { email },
  })
  if (userExists)
    return Response.json({ message: 'User already exists.' }, { status: 400 })

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })

  const token = jwt.sign(
    { name: user.name, email, sub: user.id },
    'B9S1G094LXL',
    { expiresIn: '30 days' },
  )
  cookies().set('@feedback.view:auth-token', token)

  return Response.json(token, { status: 201 })
}
