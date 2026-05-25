import { Mail, UserPen, UserPlus } from 'lucide-react'
import { AuthLayout } from '../components/_layout/auth-layout'
import { AuthCard } from '../components/auth/auth-card'
import { TextField } from '../components/text-field'
import { PasswordField } from '../components/auth/password-field'
import { CheckboxField } from '../components/checkbox-field'
import { Divider } from '../components/divider'
import { AuthFooter } from '../components/auth/auth-footer'


export function LoginPage() {
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
          <TextField
            label="E-mail"
            type="email"
            placeholder="mail@exemplo.com"
            icon={<Mail size={18} />}
          />

          <PasswordField
            label="Senha"
            placeholder="Digite sua senha"
          />

          <div className="flex items-center justify-between text-sm">
            <CheckboxField label="Lembrar-me" />

            <button className="text-brand hover:underline">
              Recuperar senha
            </button>
          </div>

          <button className="
            mt-2 h-12 rounded-lg bg-brand
            text-sm font-semibold text-white
            hover:bg-brand-dark transition
          ">
            Entrar
          </button>

          <Divider />

          <AuthFooter
            question='Ainda não tem uma conta?'
            buttonLabel='Criar conta'
            buttonIcon={<UserPlus size={18} />}
          />
        </div>
      </AuthCard>
    </AuthLayout>
  )
}