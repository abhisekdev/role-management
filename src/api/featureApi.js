import axiosInstance from './axios'

// Fetch all users
export const getFeatures = async () => {
  try {
    const response = await axiosInstance.get('/features')
    return response.data
  } catch (error) {
    console.error('Error fetching features:', error)
    throw error
  }
}

// Create a new user
export const createFeatures = async (userData) => {
  try {
    const response = await axiosInstance.post('/features', userData)
    return response.data
  } catch (error) {
    console.error('Error creating features:', error)
    throw error
  }
}

// Update a user
export const updateFeatures = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`/features/${userId}`, userData)
    return response.data
  } catch (error) {
    console.error('Error updating features:', error)
    throw error
  }
}

// Delete a user
export const deleteFeatures = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/features/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting features:', error)
    throw error
  }
}
