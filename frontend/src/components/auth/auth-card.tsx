import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function AuthCard({ children }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      {children}
    </div>
  )
}