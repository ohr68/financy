import { LogoHeader } from "../components/logo-header"

export function LoginPage() {
  return (
    <div className='flex min-h-0 px-6'>
      <div className='flex flex-col items-center gap-5'>
        <div className='flex w-full justify-center'>
          <LogoHeader />
        </div>
        <div className="flex flex-col w-full items-center justify-center p-6">
          <h2 className="font-bold text-lg text-gray-800">Fazer login</h2>
          <span className="text-gray-600">Entre na sua conta para continuar</span>

          <div className="flex-1 flex-col w-full">
            <div className="flex flex-col">
              <label className="mt-4 text-gray-700 text-sm">
                E-mail
              </label>
              <input
                type="email"
                className="border border-gray-300 
                rounded px-3 py-2 mt-1 focus:outline-none"
                placeholder="mail@exemplo.com" />
            </div>
            <div className="flex flex-col">
              <label className="mt-4 text-gray-700 text-sm">
                Senha
              </label>
              <input
                type="password"
                className="border border-gray-300 
                rounded px-3 py-2 mt-1 focus:outline-none"
                placeholder="Digite sua senha" />
            </div>
            <div className="flex w-full items-center justify-between mt-4">
              <div className="px-2">
                <input type="checkbox" />
                Lembrar-me
              </div>
              <span>Recuperar senha</span>
            </div>
            <button className="bg-brand-base 
                text-neutral-white  
                hover:bg-brand-dark">
              Entrar
            </button>
          </div>
          <div className="divide-x-4 divide-indigo-500">
            ou
          </div>
        </div>
      </div>
    </div>
  );
}