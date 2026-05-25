import type { ReactNode } from 'react'
import { LogoHeader } from '../components/logo-header'

type Props = {
  children: ReactNode
}

export function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100 px-6">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex justify-center">
          <LogoHeader />
        </div>

        {children}
      </div>
    </div>
  )
}