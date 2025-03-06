import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor (optional)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Add authorization token or other headers here
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// Add response interceptor (optional)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors globally
//     if (error.response.status === 401) {
//       // Redirect to login if unauthorized
//       window.location.href = '/auth/login'
//     }
//     return Promise.reject(error)
//   }
// )

export default axiosInstance
