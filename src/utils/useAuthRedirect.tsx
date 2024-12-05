import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuth } from '@/contexts/useAuth'

export function useAuthRedirect() {
  const { user, hydrate } = useAuth()
  const { push } = useRouter()

  useEffect(() => {
    hydrate()

    if (!user) {
      push('/')
    }
  }, [user, push])
}
