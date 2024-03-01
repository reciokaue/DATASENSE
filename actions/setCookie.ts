'use server'

import { cookies } from 'next/headers'

// 86400000 = 24 * 60 * 60 * 1000 = one Day

export async function setCookie(
  name: string,
  value: string,
  expires: number = 86400000,
) {
  cookies().set({
    name,
    value,
    expires,
    httpOnly: true,
    path: '/',
  })
}
