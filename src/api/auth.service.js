import apiService from './apiService'
import { ref } from 'vue'  // Thêm dòng này
import { useRouter } from 'vue-router'

export function useAuthService() {
  const router = useRouter()
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref(null)
  const user = ref(null)

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token')
    isAuthenticated.value = !!token
    return isAuthenticated.value
  }

  // Đăng nhập
  const login = async (credentials) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await apiService.post('/v1/auth/login', credentials)
      console.log(response);
      
      // Lưu token vào localStorage
      localStorage.setItem('token', response.data.data.token.accessToken)
      
      // Lưu thông tin user
      user.value = response.data.data.token.id
      isAuthenticated.value = true
      
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Đăng xuất
  const logout = () => {
    localStorage.removeItem('token')
    user.value = null
    isAuthenticated.value = false
    router.push('/admin')
  }

  // Lấy thông tin user hiện tại
  const getCurrentUser = async () => {
    if (user.value) return user.value
    
    try {
      const response = await apiService.get('/auth/me')
      user.value = response.data
      return user.value
    } catch (err) {
      if (err.response?.status === 401) {
        logout()
      }
      throw err
    }
  }

  return {
    isAuthenticated,
    isLoading,
    error,
    user,
    checkAuthStatus,
    login,
    logout,
    getCurrentUser
  }
}