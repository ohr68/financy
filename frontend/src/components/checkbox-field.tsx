import type { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function CheckboxField({
  label,
  ...props
}: Props) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-600">
      <input
        {...props}
        type="checkbox"
        className="rounded border-gray-300 accent-brand cursor-pointer"
      />
      <span>{label}</span>
    </label>
  )
}