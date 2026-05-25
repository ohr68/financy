import { Outlet, Navigate } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import { useAuthContext } from '../contexts/auth-context'

export function AppLayout() {
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
