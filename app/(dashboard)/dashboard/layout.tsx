import type { Metadata } from 'next'
import { ReactNode } from 'react'

// import { getCookie } from '@/actions/getCookie'
// import { api } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Feedback-view',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  // // const token = await getCookie('@feedback.view:auth-token')
  // // api.defaults.headers.common.Authorization = `Bearer ${token}`
  // api.defaults.headers.common.Authorization = `Bearer AAAAAAAAAAaaaaa`

  return <>{children}</>
}
