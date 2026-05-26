import { useState, type InputHTMLAttributes } from 'react'
import { Eye, EyeClosed, Lock } from 'lucide-react'
import { TextField } from '../text-field'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function PasswordField(
  {
    label,
    ...inputProps
  }: Props) {
  const [show, setShow] = useState(false)

  return (
    <TextField
      {...inputProps}
      label={label}
      type={show ? 'text' : 'password'}
      icon={<Lock size={18} />}
      rightIcon={
        <button
          type="button"
          onClick={() => setShow(prev => !prev)}
          className="text-gray-400 hover:text-gray-600 hover:cursor-pointer transition"
        >
          {show ? <Eye size={18} /> : <EyeClosed size={18} />}
        </button>
      }
    />
  )
}