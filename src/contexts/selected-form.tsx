'use client'

import { createContext, ReactNode, useContext } from 'react'

interface SelectedFormProviderProps {
  children: ReactNode
}

interface SelectedFormContextData {}

const SelectedFormContext = createContext({} as SelectedFormContextData)

export function SelectedFormProvider({ children }: SelectedFormProviderProps) {
  return (
    <SelectedFormContext.Provider value={{}}>
      {children}
    </SelectedFormContext.Provider>
  )
}

export const useSelectedForm = () => useContext(SelectedFormContext)
