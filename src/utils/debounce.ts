export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId) // Limpa o timeout anterior
    }

    timeoutId = setTimeout(() => {
      func.apply(debounce, args) // Chama a função com os últimos argumentos fornecidos
    }, delay)
  }
}
