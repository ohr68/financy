import { LogIn, Mail, User } from 'lucide-react'
import { AuthLayout } from '../_layouts/auth-layout'
import { AuthCard } from '../components/auth/auth-card'
import { TextField } from '../components/text-field'
import { PasswordField } from '../components/auth/password-field'
import { Divider } from '../components/divider'
import { AuthFooter } from '../components/auth/auth-footer'
import { useAuthStore } from '../stores/auth'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

type RegisterForm = {
  name: string
  email: string
  password: string
}

export function RegisterPage() {
  const navigate = useNavigate()
  const signUp = useAuthStore((state) => state.register)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true)
    try {
      const ok = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if (ok) {
        toast.success('Cadastro realizado com sucesso!')
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Erro ao criar conta:', error)
      toast.error('Erro ao realizar o cadastro.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-800">Criar conta</h2>
          <span className="mt-2 text-sm text-gray-500">
            Comece a controlar suas finanças ainda hoje
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-5">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <TextField
              label="Nome completo"
              type="text"
              placeholder="Seu nome completo"
              icon={<User size={18} />}
              error={!!errors.name}
              helperText={errors.name ? 'Nome é obrigatório' : undefined}
              {...register('name', { required: true })}
            />

            <TextField
              label="E-mail"
              type="email"
              placeholder="mail@exemplo.com"
              icon={<Mail size={18} />}
              error={!!errors.email}
              helperText={errors.email ? 'E-mail é obrigatório' : undefined}
              {...register('email', { required: true })}
            />

            <PasswordField
              label="Senha"
              placeholder="Digite sua senha"
              error={!!errors.password}
              {...register('password', { required: true })}
            />

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
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <Divider />

          <AuthFooter
            question="Já tem uma conta?"
            buttonLabel="Fazer login"
            buttonIcon={<LogIn size={18} />}
            onClick={() => navigate('/login')}
          />
        </div>
      </AuthCard>
    </AuthLayout>
  )
}