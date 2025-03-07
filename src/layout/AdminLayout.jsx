import SidebarWithHeader from '../components/Sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const AdminLayout = () => {
  const token = Cookies.get('token')

  if (!token) {
    return <Navigate to='/auth/login' replace />
  }

  return (
    <SidebarWithHeader>
      <Outlet />
    </SidebarWithHeader>
  )
}

export default AdminLayout
