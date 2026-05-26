import { Mail, UserPlus } from 'lucide-react'
import { AuthLayout } from '../_layouts/auth-layout'
import { AuthCard } from '../components/auth/auth-card'
import { TextField } from '../components/text-field'
import { PasswordField } from '../components/auth/password-field'
import { CheckboxField } from '../components/checkbox-field'
import { Divider } from '../components/divider'
import { AuthFooter } from '../components/auth/auth-footer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '../stores/auth'
import { toast } from 'sonner'


export function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const loginMutate = await login({ email, password })

      if (loginMutate) {
        toast.success('Login realizado com sucesso!')
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao fazer login. Verifique suas credenciais e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Fazer login
          </h2>

          <span className="mt-2 text-sm text-gray-500">
            Entre na sua conta para continuar
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <TextField
              label="E-mail"
              type="email"
              placeholder="mail@exemplo.com"
              icon={<Mail size={18} />}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordField
              label="Senha"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between text-sm">
              <CheckboxField label="Lembrar-me" />

              <button className="text-brand 
              hover:underline
              hover:cursor-pointer
              transition">
                Recuperar senha
              </button>
            </div>

            <button className="
            mt-2 h-12 rounded-lg bg-brand
            text-sm font-semibold text-white
            hover:bg-brand-dark
            hover:cursor-pointer
            transition
          ">
              Entrar
            </button>
          </form>

          <Divider />

          <AuthFooter
            question='Ainda não tem uma conta?'
            buttonLabel='Criar conta'
            buttonIcon={<UserPlus size={18} />}
            onClick={() => navigate('/register')}
          />
        </div>
      </AuthCard>
    </AuthLayout>
  )
}