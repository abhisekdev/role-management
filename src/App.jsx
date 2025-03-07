import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './layout/AdminLayout'
import Home from './pages/Home'
import AuthLayout from './layout/AuthLayout'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Users from './pages/Users'
import Features from './pages/Features'
import Locations from './pages/Locations'
import Assets from './pages/Assets'
import Roles from './pages/Roles'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

function App() {
  return (
    <Routes>
      <Route
        path='*'
        element={
          <Navigate to={token ? '/admin/home' : '/auth/login'} replace />
        }
      />
      <Route path='admin' element={<AdminLayout />}>
        <Route path='home' element={<Home />} />
        <Route path='users' element={<Users />} />
        <Route path='features' element={<Features />} />
        <Route path='locations' element={<Locations />} />
        <Route path='assets' element={<Assets />} />
        <Route path='roles' element={<Roles />} />
      </Route>
      <Route path='auth' element={<AuthLayout />}>
        <Route path='login' element={<Signin />} />
        <Route path='register' element={<Signup />} />
      </Route>
    </Routes>
  )
}

export default App
