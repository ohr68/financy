import { LogIn, Mail, User } from "lucide-react";
import { AuthLayout } from "../components/_layout/auth-layout";
import { AuthCard } from "../components/auth/auth-card";
import { TextField } from "../components/text-field";
import { PasswordField } from "../components/auth/password-field";
import { Divider } from "../components/divider";
import { AuthFooter } from "../components/auth/auth-footer";

export function RegisterPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Criar conta
          </h2>

          <span className="mt-2 text-sm text-gray-500">
            Comece a controlar suas finanças ainda hoje
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-5">
          <TextField
            label="Nome completo"
            type="text"
            placeholder="Seu nome completo"
            icon={<User size={18} />}
          />

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

          <button className="
            mt-2 h-12 rounded-lg bg-brand
            text-sm font-semibold text-white
            transition
            hover:bg-brand-dark
            hover:cursor-pointer 
          ">
            Cadastrar
          </button>

          <Divider />

          <AuthFooter
            question='Já tem uma conta?'
            buttonLabel='Fazer login'
            buttonIcon={<LogIn size={18} />}
          />
        </div>
      </AuthCard>
    </AuthLayout>
  )
}