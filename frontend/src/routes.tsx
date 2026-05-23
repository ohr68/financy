import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from './pages/login-page'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  }
])