/* eslint-disable no-empty-pattern */
import { Textarea } from '@/src/components/ui/textarea'

interface TextProps {}

export function Text({}: TextProps) {
  return (
    <Textarea
      className="h-40 resize-none border-0 p-4"
      placeholder="Fale sobre..."
    />
  )
}
