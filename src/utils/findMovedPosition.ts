export function findMovedPosition(
  arr1: number[],
  arr2: number[],
): { from: number; to: number } {
  // Verifica se os arrays têm o mesmo comprimento
  if (arr1.length !== arr2.length) {
    throw new Error('Os arrays devem ter o mesmo comprimento')
  }

  let from = -1
  let to = -1

  // Itera sobre os elementos dos arrays para encontrar a posição que mudou
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      from = i
      break
    }
  }

  // Encontra a nova posição do elemento que estava na posição original
  for (let j = 0; j < arr2.length; j++) {
    if (arr2[j] === arr1[from]) {
      to = j
      break
    }
  }

  // Retorna as posições original e nova
  return { from, to }
}
