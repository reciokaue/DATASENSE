// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  BookOpen,
  Building,
  Calendar,
  Circle,
  CircleHelp,
  Clock,
  Coffee,
  Ellipsis,
  Gift,
  Home,
  LayoutDashboard,
  Leaf,
  Lightbulb,
  List,
  LucideProps,
  Mail,
  Minimize,
  Package,
  Percent,
  Phone,
  Smile,
  Star,
  Tag,
  Text,
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
  list: List,
  text: Text,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  calendar: Calendar,
  adjustments: Minimize,
  'document-text': BookOpen,
  ellipsis: Ellipsis,
}

export const Icon = ({ name, ...props }: IconProps) => {
  const SelectedIcon = icons[name] || CircleHelp
  return <SelectedIcon {...props} />
}
Icon.displayName = 'Icon'
