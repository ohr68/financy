import type { ReactNode, InputHTMLAttributes } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  icon?: ReactNode
  rightIcon?: ReactNode
  helperText?: string
}

export function TextField({
  label,
  icon,
  rightIcon,
  helperText,
  className = '',
  ...props
}: TextFieldProps) {
   const isDisabled = props.disabled

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
            group-focus-within:text-brand!
            group-focus-within:stroke-brand!
          ">
            {icon}
          </div>
        )}

        <input
          {...props}
          className={`
            h-12 w-full rounded-lg border
            text-sm outline-none transition
            ${isDisabled ? 'border-gray-200 bg-white cursor-not-allowed' : 'border-gray-300'}
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
      {helperText && (
        <span className="mt-1 text-xs text-gray-500">
          {helperText}
        </span>
      )}
    </div>
  )
}