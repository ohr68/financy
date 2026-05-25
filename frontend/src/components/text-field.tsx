import type { ReactNode, InputHTMLAttributes } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  icon?: ReactNode
  rightIcon?: ReactNode
}

export function TextField({
  label,
  icon,
  rightIcon,
  className = '',
  ...props
}: TextFieldProps) {
  return (
    <div className="flex flex-col group">
      <label className="mb-2 text-sm font-medium text-gray-700 transition group-focus-within:text-brand!">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="
            absolute left-4 top-1/2 -translate-y-1/2
            text-gray-400 transition
            group-focus-within:text-brand
          ">
            {icon}
          </div>
        )}

        <input
          {...props}
          className={`
            h-12 w-full rounded-lg border border-gray-300
            text-sm outline-none transition
            ${icon ? 'pl-11' : 'pl-4'}
            ${rightIcon ? 'pr-11' : 'pr-4'}
            ${className}
          `}
        />

        {rightIcon && (
          <div className="
            absolute right-4 top-1/2 -translate-y-1/2
            text-gray-400 transition
            group-focus-within:text-brand
          ">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  )
}