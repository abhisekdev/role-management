import axiosInstance from './axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

// Fetch all users
export const getRoles = async () => {
  try {
    const response = await axiosInstance.get('/roles', {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching roles:', error)
    throw error
  }
}

// Fetch single users
export const getRole = async (roleId) => {
  try {
    const response = await axiosInstance.get(`/roles/${roleId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching role:', error)
    throw error
  }
}

// Create a new user
export const createRoles = async (userData) => {
  try {
    const response = await axiosInstance.post('/roles', userData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    return { status: error?.status, message: error.response?.data?.message }
  }
}

// Update a user
export const updateRoles = async (userData) => {
  try {
    const response = await axiosInstance.put(`/roles`, userData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    return { status: error?.status, message: error.response?.data?.message }
  }
}

// Delete a user
export const deleteRoles = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/roles/${userId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    return { status: error?.status, message: error.response?.data?.message }
  }
}
