import { icons } from 'lucide-react'

interface IconProps {
  name: string
  color?: string
  size?: number
}

const Icon = ({ name, color = 'currentColor', size = 20 }: IconProps) => {
  const LucideIcon = (icons as any)[name]

  return <LucideIcon color={color} size={size} />
}

export default Icon
