import axiosInstance from './axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

// Fetch all users
export const getLocations = async () => {
  try {
    const response = await axiosInstance.get('/locations', {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching locations:', error)
    throw error
  }
}

// Fetch single users
export const getLocation = async (locationId) => {
  try {
    const response = await axiosInstance.get(`/locations/${locationId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching location: ', error)
    throw error
  }
}

// Create a new user
export const createLocations = async (userData) => {
  try {
    const response = await axiosInstance.post('/locations', userData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    console.error('Error creating locations:', error)
    throw error
  }
}

// Update a user
export const updateLocations = async (userData) => {
  try {
    const response = await axiosInstance.put(`/locations`, userData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    console.error('Error updating locations:', error)
    throw error
  }
}

// Delete a user
export const deleteLocations = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/locations/${userId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return response.data
  } catch (error) {
    console.error('Error deleting locations:', error)
    throw error
  }
}
