// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Circle, LucideProps } from 'lucide-react'
// import dynamicIconImports from 'lucide-react/dynamicIconImports'
// import dynamic from 'next/dynamic'

interface IconProps extends LucideProps {
  name?: string
}

export const Icon = ({ name, ...props }: IconProps) => {
  // const LucideIcon = dynamic(dynamicIconImports[name])

  // return <LucideIcon {...props} />
  return <Circle {...props} />
}
Icon.displayName = 'Icon'
