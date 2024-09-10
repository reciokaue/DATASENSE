import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useQueryParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Função para modificar ou adicionar um parâmetro na query string
  const setQueryParam = useCallback(
    (name: string, value: string | number | null) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value === null || value === undefined) {
        // Remove o parâmetro se o valor for null ou undefined
        params.delete(name)
      } else {
        // Define ou atualiza o valor do parâmetro
        params.set(name, String(value))
      }

      // Atualiza a URL com os novos parâmetros, mantendo os existentes
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  // Função para remover um ou mais parâmetros da query string
  const removeQueryParam = useCallback(
    (names: string | string[]) => {
      const params = new URLSearchParams(searchParams.toString())

      if (Array.isArray(names)) {
        names.forEach((name) => params.delete(name))
      } else {
        params.delete(names)
      }

      // Atualiza a URL após remover o parâmetro
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  // Função para adicionar múltiplos parâmetros à query string
  const setMultipleQueryParams = useCallback(
    (newParams: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.keys(newParams).forEach((key) => {
        const value = newParams[key]
        if (value === null || value === undefined) {
          params.delete(key)
        } else {
          params.set(key, String(value))
        }
      })

      // Atualiza a URL com os parâmetros novos/modificados
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  return {
    setQueryParam,
    removeQueryParam,
    setMultipleQueryParams,
  }
}
