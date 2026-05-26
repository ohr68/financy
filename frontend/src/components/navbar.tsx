import { NavLink } from 'react-router-dom'
import logo from '../assets/Logo.png'
import { useAuthStore } from '../stores/auth'

export function Navbar() {
  const user = useAuthStore((state) => state.user)

  const initials = user?.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() ?? '??'

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition ${
      isActive ? 'text-brand font-semibold' : 'text-gray-600 hover:text-gray-800'
    }`

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/dashboard">
          <img src={logo} height={32} width={134} alt="Financy" />
        </NavLink>

        <nav className="flex items-center gap-6">
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/transactions" className={navLinkClass}>
            Transações
          </NavLink>
          <NavLink to="/categories" className={navLinkClass}>
            Categorias
          </NavLink>
        </nav>

        <NavLink to="/account">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-300 transition cursor-pointer">
            {initials}
          </div>
        </NavLink>
      </div>
    </header>
  )
}
