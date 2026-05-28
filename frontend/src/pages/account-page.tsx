import { useState, useEffect } from 'react'
import { LogOut, Mail, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/use-user'
import { AuthCard } from '../components/auth/auth-card'
import { TextField } from '../components/text-field'
import { useAuthStore } from '../stores/auth'
import { toast } from 'sonner'

export function AccountPage() {
  const { user, loading, updateUser } = useUser()

  const { logout, setUser } = useAuthStore()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user?.name) {
      setName(user.name)
    }
  }, [user])

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() ?? '??'

  function handleLogout() {
    logout()
    navigate('/login')
  }

  async function handleSave() {
    if (!name.trim()) return

    setSaving(true)

    try {
      await updateUser({
        name,
      })

      setUser({
        ...user!,
        name,
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Erro ao atualizar perfil')
    } finally {
      setSaving(false)
    }
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
            <div
              className="
                flex h-16 w-16 items-center justify-center
                rounded-full bg-gray-200 text-xl
                font-bold text-gray-700
              "
            >
              {initials}
            </div>

            <p className="font-semibold text-gray-800">
              {name}
            </p>

            <p className="text-sm text-gray-400">
              {user?.email}
            </p>
          </div>

          <div className="h-px bg-gray-100 mb-6" />

          <div className="flex flex-col gap-4">
            <TextField
              label="Nome completo"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User size={16} />}
            />

            <TextField
              label="E-mail"
              name="email"
              value={user?.email ?? ''}
              readOnly
              disabled
              helperText="O e-mail não pode ser alterado"
              icon={<Mail size={16} />}
            />

            <button
              onClick={handleSave}
              disabled={saving}
              className="
                h-12 w-full rounded-lg bg-brand text-white
                text-sm font-semibold
                hover:bg-brand-dark
                transition cursor-pointer
                disabled:opacity-60
              "
            >
              {saving
                ? 'Salvando...'
                : 'Salvar alterações'}
            </button>

            <button
              onClick={handleLogout}
              className="
                flex h-12 w-full items-center justify-center
                gap-2 rounded-lg border border-gray-200 text-sm
                text-gray-700
                font-medium
                hover:border-gray-200
                hover:bg-gray-300
                transition cursor-pointer
              "
            >
              <LogOut className="text-danger" size={16} />
              Sair da conta
            </button>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}