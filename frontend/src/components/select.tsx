import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import type { SelectOption } from '../@types/select-option'

interface Props {
  label?: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
}

export function Select({ label, value, options, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find(o => o.value === value)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="h-12 w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 text-sm"
      >
        <div className="flex items-center gap-2">
          {selected?.icon && (
            <selected.icon size={18} />
          )}
          <span>{selected?.label || 'Selecione'}</span>
        </div>

        <ChevronDown size={18} className="text-gray-500" />
      </button>

      {open && (
        <div className="mt-1 max-h-60 overflow-auto rounded-lg border bg-white shadow-lg">
          {options.map((opt) => {
            const isSelected = opt.value === value

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
                className="flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">                
                  <span>{opt.label}</span>
                </div>

                {isSelected && (
                  <Check size={16} className="text-green-600" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}