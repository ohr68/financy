import { useEffect, useRef, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'

interface MonthPickerProps {
  label: string
  value: string
  placeholder?: string
  onChange: (date: string) => void
}

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril',
  'Maio', 'Junho', 'Julho', 'Agosto',
  'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

function format(value: string) {
  if (!value) return ''
  const [year, month] = value.split('-')
  return `${MONTHS[Number(month) - 1]} / ${year}`
}

function isFutureMonth(year: number, monthIndex: number) {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() // 0-based

  if (year > currentYear) return true
  if (year === currentYear && monthIndex > currentMonth) return true

  return false
}

export function MonthPicker({
  label,
  value,
  placeholder = 'Selecione um período',
  onChange,
}: MonthPickerProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const initialYear = value
    ? Number(value.split('-')[0])
    : new Date().getFullYear()

  const [year, setYear] = useState(initialYear)

  const isActive = open

  function selectMonth(monthIndex: number) {
    if (isFutureMonth(year, monthIndex)) return

    const formatted = `${year}-${String(monthIndex + 1).padStart(2, '0')}`
    onChange(formatted)
    setOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!wrapperRef.current) return
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={wrapperRef} className="flex flex-col relative z-0">
      <label
        className={`
          mb-2 text-sm font-medium transition
          ${isActive ? 'text-brand' : 'text-gray-700'}
        `}
      >
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          h-12 w-full rounded-lg border border-gray-300
          px-4 text-sm text-left
          flex items-center justify-between
          bg-white transition
          outline-none focus:outline-none focus:ring-0
        "
      >
        <span className={value ? 'text-gray-800' : 'text-gray-400'}>
          {value ? format(value) : placeholder}
        </span>

        <CalendarDays
          size={16}
          className={isActive ? 'text-brand' : 'text-gray-400'}
        />
      </button>

      {open && (
        <div
          className="
            absolute left-0 top-full mt-2 w-full
            z-50
            rounded-lg border border-gray-200 bg-white
            shadow-lg p-3
          "
        >
          <div className="
            flex items-center justify-between
            mb-3 text-sm font-medium text-gray-700
          ">
            <button
              type="button"
              onClick={() => setYear((y) => y - 1)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <ChevronLeft size={16} />
            </button>

            <span>{year}</span>

            <button
              type="button"
              onClick={() => setYear((y) => y + 1)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((m, i) => {
              const disabled = isFutureMonth(year, i)

              return (
                <button
                  key={m}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectMonth(i)}
                  className={`
                    text-sm rounded-md py-2 transition
                    ${
                      disabled
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  {m}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}