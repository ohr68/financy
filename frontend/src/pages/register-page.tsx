import { LogIn, Mail, User } from "lucide-react";
import { AuthLayout } from "../_layouts/auth-layout";
import { AuthCard } from "../components/auth/auth-card";
import { TextField } from "../components/text-field";
import { PasswordField } from "../components/auth/password-field";
import { Divider } from "../components/divider";
import { AuthFooter } from "../components/auth/auth-footer";
import { useState } from "react";
import { useAuthStore } from "../stores/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


export function RegisterPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const signUp = useAuthStore((state) => state.register)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const signUpMutate = await signUp({
        name,
        email,
        password
      })

      if (signUpMutate) {
        toast.success('Cadastro realizado com sucesso!')
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
          <h2 className="text-3xl font-bold text-gray-800">
            Criar conta
          </h2>

          <span className="mt-2 text-sm text-gray-500">
            Comece a controlar suas finanças ainda hoje
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <TextField
              label="Nome completo"
              type="text"
              placeholder="Seu nome completo"
              icon={<User size={18} />}
              onChange={(e) => setName(e.target.value)}
            />

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

            <button className="
            mt-2 h-12 rounded-lg bg-brand
            text-sm font-semibold text-white
            transition
            hover:bg-brand-dark
            hover:cursor-pointer 
          ">
              Cadastrar
            </button>
          </form>
          <Divider />

          <AuthFooter
            question='Já tem uma conta?'
            buttonLabel='Fazer login'
            buttonIcon={<LogIn size={18} />}
            onClick={() => navigate('/login')}
          />
        </div>
      </AuthCard>
    </AuthLayout>
  )
}