'use server'

import { cookies } from 'next/headers'

export async function setCookie(name: string, value: string) {
  cookies().set(name, value, {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: '/',
    sameSite: true,
  })
}
