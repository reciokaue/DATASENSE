// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  Building,
  Circle,
  CircleHelp,
  Coffee,
  Gift,
  Home,
  LayoutDashboard,
  Leaf,
  Lightbulb,
  LucideProps,
  Package,
  Percent,
  Smile,
  Star,
  Tag,
  Truck,
  UserCheck,
  Users,
  Utensils,
} from 'lucide-react'

interface IconProps extends LucideProps {
  name?: string
}

const icons = {
  smile: Smile,
  'user-check': UserCheck,
  home: Home,
  star: Star,
  coffee: Coffee,
  building: Building,
  users: Users,
  utensils: Utensils,
  truck: Truck,
  tag: Tag,
  percent: Percent,
  gift: Gift,
  lightbulb: Lightbulb,
  leaf: Leaf,
  package: Package,
  'layout-template': LayoutDashboard,
  circle: Circle,
}

export const Icon = ({ name, ...props }: IconProps) => {
  const SelectedIcon = icons[name] || CircleHelp
  return <SelectedIcon {...props} />
}
Icon.displayName = 'Icon'
