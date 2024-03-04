// import { jwtDecode } from 'jwt-decode'
// import { cookies } from 'next/headers'
import Link from 'next/link'

import { Button } from './ui/button'

// interface userToken {
//   name: string
//   email: string
//   value: string
// }

// function nameImagePreview(name: string) {
//   const nameSplited = name.split(' ')
//   let initials = ''
//   for (let i = 0; i < nameSplited.length; i++) {
//     initials += nameSplited[i][0].toUpperCase()
//   }
//   return initials
// }

export function Nav() {
  // const cookieStore = cookies()
  // const token = cookieStore.get('@feedback.view:auth-token')
  // const user: userToken | undefined = token && jwtDecode(token.value)

  return (
    <nav className="flex max-w-6xl py-4">
      <Link href="/profile" className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm">
          {/* {nameImagePreview(user?.name || '')} */}
        </div>
        {/* <label>{user?.name}</label> */}
      </Link>
      <section className="flex flex-1 items-center justify-end">
        <Button variant="outline">Dashboard</Button>
      </section>
    </nav>
  )
}
