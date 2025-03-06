import axiosInstance from './axios'

// Fetch all users
export const getLocations = async () => {
  try {
    const response = await axiosInstance.get('/locations')
    return response.data
  } catch (error) {
    console.error('Error fetching locations:', error)
    throw error
  }
}

// Create a new user
export const createLocations = async (userData) => {
  try {
    const response = await axiosInstance.post('/locations', userData)
    return response.data
  } catch (error) {
    console.error('Error creating locations:', error)
    throw error
  }
}

// Update a user
export const updateLocations = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`/locations/${userId}`, userData)
    return response.data
  } catch (error) {
    console.error('Error updating locations:', error)
    throw error
  }
}

// Delete a user
export const deleteLocations = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/locations/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting locations:', error)
    throw error
  }
}
