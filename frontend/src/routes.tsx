import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/login-page'
import { RegisterPage } from './pages/register-page'
import { AppLayout } from './_layouts/app-layout'
import { DashboardPage } from './pages/dashboard-page'
import { TransactionsPage } from './pages/transactions-page'
import { CategoriesPage } from './pages/categories-page'
import { AccountPage } from './pages/account-page'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/transactions',
        element: <TransactionsPage />,
      },
      {
        path: '/categories',
        element: <CategoriesPage />,
      },
      {
        path: '/account',
        element: <AccountPage />,
      },
    ],
  },
])
