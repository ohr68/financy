import { UserPlus } from 'lucide-react'
import type { InputHTMLAttributes, ReactNode } from 'react'

type AuthFooterProps = InputHTMLAttributes<HTMLInputElement> & {
  question: string
  buttonLabel: string
  buttonIcon?: ReactNode
}

export function AuthFooter({
  question,
  buttonLabel,
  buttonIcon
} : AuthFooterProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-sm text-gray-500">
        {question}
      </span>

      <button className="
        flex h-12 w-full items-center justify-center gap-2
        rounded-lg border border-gray-300 bg-white
        text-sm font-medium text-gray-700
        transition hover:bg-gray-200 cursor-pointer
      ">
        {buttonIcon}
        <span>{buttonLabel}</span>
      </button>
    </div>
  )
}