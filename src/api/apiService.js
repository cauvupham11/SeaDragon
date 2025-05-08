import axios from 'axios'
import { BASE_URL } from './config'  // Import BASE_URL từ config.js

const apiService = axios.create({
  baseURL: BASE_URL,  // Sử dụng BASE_URL đã import từ config
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor cho request
apiService.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// Interceptor cho response
apiService.interceptors.response.use(response => {
  return response
}, async error => {
  // Xử lý khi token hết hạn (401 Unauthorized)
  if (error.response?.status === 401) {
    // Có thể thêm logic refresh token ở đây nếu cần
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  return Promise.reject(error)
})

export default apiService
