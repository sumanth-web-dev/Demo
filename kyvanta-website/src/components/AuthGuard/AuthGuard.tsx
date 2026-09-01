import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '../../utils/auth'

export function AuthGuard() {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
