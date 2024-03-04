'use server'

import { cookies } from 'next/headers'

export async function getCookie(cookieName: string) {
  const cookieStore = cookies()
  const cookie = cookieStore.get(cookieName)
  return cookie?.value
}
