import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const AuthLayout = () => {
  const token = Cookies.get('token')

  if (token) {
    return <Navigate to='/admin/home' replace />
  }

  return <Outlet />
}

export default AuthLayout
