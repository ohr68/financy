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
import { useForm } from 'react-hook-form'

type LoginForm = {
  email: string
  password: string
  rememberMe: boolean
}

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)

    try {
      const ok = await login({
        email: data.email,
        password: data.password,
      })

      if (ok) {
        toast.success('Login realizado com sucesso!')
        navigate('/dashboard')
      }
    } catch {
      toast.error(
        'Ocorreu um erro ao fazer login. Verifique suas credenciais e tente novamente.'
      )
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
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            <TextField
              label="E-mail"
              type="email"
              placeholder="mail@exemplo.com"            
              error={!!errors.password}
              icon={<Mail size={18} />}
              {...register('email', { required: true })}
            />

            <PasswordField
              label="Senha"
              placeholder="Digite sua senha"
              error={!!errors.password}
              {...register('password', { required: true })}
            />

            <div className="flex items-center justify-between text-sm">
              <CheckboxField
                label="Lembrar-me"
                {...register('rememberMe')}
              />

              <button
                type="button"
                className="text-brand hover:underline transition"
              >
                Recuperar senha
              </button>
            </div>

            <button
              disabled={loading}
              className={`
                mt-2 h-12 rounded-lg text-sm font-semibold text-white transition
                ${loading
                  ? 'bg-brand/60 cursor-not-allowed'
                  : 'bg-brand hover:bg-brand-dark cursor-pointer'
                }
              `}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <Divider />

          <AuthFooter
            question="Ainda não tem uma conta?"
            buttonLabel="Criar conta"
            buttonIcon={<UserPlus size={18} />}
            onClick={() => navigate('/register')}
          />
        </div>
      </AuthCard>
    </AuthLayout>
  )
}