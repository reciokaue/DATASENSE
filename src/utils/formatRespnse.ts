// src/utils/formatResponse.ts
import { format } from 'date-fns'

// TODO Locate date fns e adicionar datas longas ao date
// algumas datas estão por inteiro outras nao eo time nao funciona corretamente
// 14:00	1
// 18:30	1
// 16:00	1
// 2024-11-07T12:30:55.339Z	1
// 20:00	1
// 2024-11-06T22:26:11.845Z	1
// 17:00	1
// 19:30
export function formatResponse(text: string, type: string): string {
  switch (type) {
    case 'date':
      return format(new Date(text), 'dd/MM/yyyy')
    case 'time':
      if (text.length === 5) return text
      else
        return format(
          new Date(text),
          "'Não respondido, horário da resposta: 'HH:mm",
        )
    case 'phone':
      return formatPhoneNumber(text)
    case 'email':
      return text.toLowerCase()
    case 'starRating':
      return `${text} ★`
    case 'list':
    case 'text':
    case 'longText':
      return text
    default:
      return text
  }
}

// Função auxiliar para formatar telefone
function formatPhoneNumber(phone: string): string {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}
