import axiosInstance from './axios'

// register
export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData)
    return response.data
  } catch (error) {
    return { status: error?.status, message: error.response?.data?.message }
  }
}

// login
export const login = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/login', userData)
    return response.data
  } catch (error) {
    return { status: error?.status, message: error.response?.data?.message }
  }
}
