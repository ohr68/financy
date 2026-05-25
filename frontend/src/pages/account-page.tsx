import { useState, useEffect } from 'react'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { useAuthContext } from '../contexts/auth-context'
import { AuthCard } from '../components/auth/auth-card'
import { TextField } from '../components/text-field'

export function AccountPage() {
  const { user, loading } = useUser()
  const { logout } = useAuthContext()
  const navigate = useNavigate()

  const [name, setName] = useState('')

  useEffect(() => {
    if (user?.name) setName(user.name)
  }, [user])

  const initials = user?.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() ?? '??'

  function handleLogout() {
    logout()
    navigate('/login')
  }

  function handleSave() {
    // TODO: wire up update user mutation when available in schema
    console.log('save', { name })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
        Carregando...
      </div>
    )
  }

  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-sm">
        <AuthCard>
          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl font-bold text-gray-700">
              {initials}
            </div>
            <p className="font-semibold text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>

          <div className="h-px bg-gray-100 mb-6" />

          <div className="flex flex-col gap-4">
            <TextField
              label="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<span className="text-sm">👤</span>}
            />

            <TextField
              label="E-mail"
              value={user?.email ?? ''}
              readOnly
              disabled
              helperText="O e-mail não pode ser alterado"
              icon={<span className="text-sm">✉️</span>}
            />

            <button
              onClick={handleSave}
              className="h-12 w-full rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition cursor-pointer"
            >
              Salvar alterações
            </button>

            <button
              onClick={handleLogout}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm font-medium text-danger hover:bg-red-light transition cursor-pointer"
            >
              <LogOut size={16} />
              Sair da conta
            </button>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}
