import apiService from './apiService'
import { classToPlain } from 'class-transformer'

const API_URL = 'http://your-api-url/api/v1/blogs'

class BlogService {
  // Lấy tất cả blog đang hoạt động
  async getAllBlogs() {
    try {
      const response = await apiService.get(API_URL)
      return { data: classToPlain(response.data) }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Lấy blog đã xóa tạm thời
  async getDeletedBlogs() {
    try {
      const response = await apiService.get(`${API_URL}/temporary`)
      return { data: classToPlain(response.data) }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Tạo blog mới
  async createBlog(blogData) {
    try {
      const formData = new FormData()
      formData.append('userId', blogData.userId)
      formData.append('title', blogData.title)
      formData.append('body', blogData.body)
      if (blogData.image) {
        formData.append('image', blogData.image)
      }

      const response = await apiService.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return { data: classToPlain(response.data) }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Cập nhật blog
  async updateBlog(id, blogData) {
    try {
      const formData = new FormData()
      formData.append('title', blogData.title)
      formData.append('body', blogData.body)
      if (blogData.image) {
        formData.append('image', blogData.image)
      }

      const response = await apiService.put(`${API_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return { data: classToPlain(response.data) }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Xóa tạm thời (soft delete)
  async softDeleteBlogs(ids) {
    try {
      const response = await apiService.delete(API_URL, { data: { ids } })
      return { data: classToPlain(response.data) }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Khôi phục blog đã xóa tạm
  async restoreBlogs(ids) {
    try {
      const response = await apiService.put(`${API_URL}/temporary`, { ids })
      return { data: classToPlain(response.data) }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Xóa vĩnh viễn (hard delete)
  async hardDeleteBlogs(ids) {
    try {
      const response = await apiService.delete(`${API_URL}/temporary`, { data: { ids } })
      return { data: classToPlain(response.data) }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Xử lý lỗi
  handleError(error) {
    if (error.response) {
      // Lỗi từ server
      const message = error.response.data?.message || 'Đã xảy ra lỗi'
      return new Error(message)
    } else if (error.request) {
      // Không nhận được phản hồi
      return new Error('Không thể kết nối đến server')
    } else {
      // Lỗi khi thiết lập request
      return new Error('Đã xảy ra lỗi khi thiết lập yêu cầu')
    }
  }
}

export default new BlogService()