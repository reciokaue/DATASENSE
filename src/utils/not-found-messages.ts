export const notFoundMessages = [
  'Eita, nenhum formulário por aqui... Devem ter saído pra tomar um café! ☕',
  'Nada de formulários por enquanto... Será que fugiram com a última atualização? 🤔',
  'Nenhum formulário encontrado. Talvez estejam escondidos jogando esconde-esconde! 🤭',
  'Formulários não encontrados. Hora de acionar o Sherlock Holmes! 🔍',
  'Cadê os formulários? Será que foram abduzidos? 👽',
  'Sem formulários hoje... Talvez estejam tirando uma soneca! 🛌',
  'Nenhum formulário por aqui. Parece que eles estão de férias! 🌴',
  'Oops! Formulários desaparecidos... Deixaram só o rastro de um ponto e vírgula. ;)',
  'Nada de formulários... Acho que eles decidiram virar código legado! 💾',
  'Formulários não encontrados. Mas ei, aproveite a chance pra respirar fundo! 😌',
]

export const pickMessage = () => {
  return notFoundMessages[Math.round(Math.random() * notFoundMessages.length)]
}
