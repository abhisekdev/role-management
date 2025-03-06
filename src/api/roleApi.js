import axiosInstance from './axios'

// Fetch all users
export const getRoles = async () => {
  try {
    const response = await axiosInstance.get('/roles')
    return response.data
  } catch (error) {
    console.error('Error fetching roles:', error)
    throw error
  }
}

// Create a new user
export const createRoles = async (userData) => {
  try {
    const response = await axiosInstance.post('/roles', userData)
    return response.data
  } catch (error) {
    console.error('Error creating roles:', error)
    throw error
  }
}

// Update a user
export const updateRoles = async (userData) => {
  try {
    const response = await axiosInstance.put(`/roles`, userData)
    return response.data
  } catch (error) {
    console.error('Error updating roles:', error)
    throw error
  }
}

// Delete a user
export const deleteRoles = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/roles/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting roles:', error)
    throw error
  }
}
