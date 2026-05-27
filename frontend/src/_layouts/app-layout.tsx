import { Outlet, Navigate } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import { useAuthStore } from '../stores/auth'

export function AppLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-2 py-8">
        <Outlet />
      </main>
    </div>
  )
}
