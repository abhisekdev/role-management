import axiosInstance from './axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

// Fetch all users
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get('/users', {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

// Fetch single users
export const getUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/users', userData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

// Update a user
export const updateUser = async (userData) => {
  try {
    const response = await axiosInstance.put(`/users`, userData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}
