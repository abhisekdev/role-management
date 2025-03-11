import SidebarWithHeader from '../components/Sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import {
  fetchAssets,
  fetchFeatures,
  fetchLocations,
  fetchRoles,
  fetchUsers
} from '../actions/appActions'

const AdminLayout = () => {
  const token = Cookies.get('token')
  const { dispatch } = useAppContext()

  useEffect(() => {
    fetchUsers(dispatch)
    fetchFeatures(dispatch)
    fetchLocations(dispatch)
    fetchAssets(dispatch)
    fetchRoles(dispatch)
  }, [dispatch])

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
