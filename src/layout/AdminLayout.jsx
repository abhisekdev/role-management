import React from 'react'
import SidebarWithHeader from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <SidebarWithHeader>
      <Outlet />
    </SidebarWithHeader>
  )
}

export default AdminLayout
