import axiosInstance from './axios'

// register
export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData)
    return response.data
  } catch (error) {
    console.error('Registration error: ', error)
    throw error
  }
}

// login
export const login = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/login', userData)
    return response.data
  } catch (error) {
    console.error('Login error: ', error)
    throw error
  }
}
