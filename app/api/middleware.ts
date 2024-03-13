// import jwt from 'jsonwebtoken'
// import { cookies } from 'next/headers'
// import { NextRequest, NextResponse } from 'next/server'

// interface MiddlewareRequest extends NextRequest {
//   auth: string | jwt.JwtPayload | undefined
// }

// export function middleware(request: MiddlewareRequest) {
//   console.log('passou')
//   try {
//     const token = cookies().get('@feedback.view:auth-token')
//     console.log(token)
//     try {
//       const decoded = token && jwt.verify(token?.value, 'B9S1G094LXL')
//     } catch (e) {
//       console.log(e)
//       return NextResponse.json({ message: 'decoded error' }, { status: 401 })
//     }
//     request.auth = decoded
//     console.log(decoded)

//     // if (!decoded) throw new Error()

//     console.log('Verificado')

//     return NextResponse.next()
//   } catch (error) {
//     return NextResponse.json({ message: 'Token invalido' }, { status: 401 })
//   }
// }

// // Configuração da matcher para especificar as rotas a serem protegidas
// export const config = {
//   matcher: ['/api/topic/:path*', '/api/form/:path*'],
// }
