type Props = {
  label: string
}

export function CheckboxField({ label }: Props) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-600">
      <input
        type="checkbox"
        className="rounded border-gray-300 accent-brand cursor-pointer"
      />
      <span>{label}</span>
    </label>
  )
}