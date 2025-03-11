import axiosInstance from './axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

// Fetch all users
export const getFeatures = async () => {
  try {
    const response = await axiosInstance.get('/features', {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching features:', error)
    throw error
  }
}

// Create a new user
export const createFeatures = async (userData) => {
  try {
    const response = await axiosInstance.post('/features', userData, {
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
export const updateFeatures = async (userData) => {
  try {
    const response = await axiosInstance.put(`/features`, userData, {
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
export const deleteFeatures = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/features/${userId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    return { status: error?.status, message: error.response?.data?.message }
  }
}
