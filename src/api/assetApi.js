import axiosInstance from './axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

// Fetch all users
export const getAssets = async () => {
  try {
    const response = await axiosInstance.get('/assets', {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching assets:', error)
    throw error
  }
}

// Create a new user
export const createAssets = async (userData) => {
  try {
    const response = await axiosInstance.post('/assets', userData, {
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
export const updateAssets = async (userData) => {
  try {
    const response = await axiosInstance.put(`/assets`, userData, {
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
export const deleteAssets = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/assets/${userId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    return { status: error?.status, message: error.response?.data?.message }
  }
}
