import { useState } from 'react'
import { Eye, EyeClosed, Lock } from 'lucide-react'
import { TextField } from '../text-field'

type Props = {
  label: string
  placeholder?: string
}

export function PasswordField({ label, placeholder }: Props) {
  const [show, setShow] = useState(false)

  return (
    <TextField
      label={label}
      type={show ? 'text' : 'password'}
      placeholder={placeholder}
      icon={<Lock size={18} />}
      rightIcon={
        <button
          type="button"
          onClick={() => setShow(prev => !prev)}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          {show ? <Eye size={18} /> : <EyeClosed size={18} />}
        </button>
      }
    />
  )
}