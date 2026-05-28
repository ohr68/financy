import { useEffect, useRef, useState } from 'react'
import {
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

import type { SelectOption } from '../@types/select-option'

interface Props {
  label?: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
}

export function Select({
  label,
  value,
  options,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find(
    (o) => o.value === value
  )

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
  }, [])

  return (
    <div
      ref={ref}
      className="relative flex flex-col gap-1"
    >
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          h-12 w-full
          flex items-center justify-between
          rounded-lg border border-gray-300
          bg-white px-4 text-sm
          transition
          hover:border-gray-400
        "
      >
        <div className="flex items-center gap-2">
          {selected?.icon && (
            <selected.icon size={18} />
          )}

          <span>
            {selected?.label || 'Selecione'}
          </span>
        </div>

        {open ? (
          <ChevronUp
            size={18}
            className="text-gray-500"
          />
        ) : (
          <ChevronDown
            size={18}
            className="text-gray-500"
          />
        )}
      </button>

      {open && (
        <div
          className="
            absolute left-0 right-0 top-full z-50 mt-1
            max-h-60 overflow-auto
            rounded-lg border border-gray-200
            bg-white shadow-lg
          "
        >
          {options.map((opt) => {
            const isSelected =
              opt.value === value

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
                className="
                  flex w-full items-center justify-between
                  px-4 py-3 text-sm
                  transition
                  hover:bg-gray-100
                "
              >
                <div className="flex items-center gap-2">                
                  <span>{opt.label}</span>
                </div>

                {isSelected && (
                  <Check
                    size={16}
                    className="text-green-600"
                  />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}