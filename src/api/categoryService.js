import apiService from '@/api/apiService'

const getCategories = async () => {
  try {
    const res = await apiService.get('/v1/categories')
    return res.data.data || []
  } catch (err) {
    console.error('Lỗi khi tải danh sách phân loại:', err)
    return []
  }
}

const getDeletedCategories = async () => {
  try {
    const res = await apiService.get('/v1/categories/temporary')
    return res.data.data || []
  } catch (err) {
    console.error('Lỗi khi tải danh sách phân loại đã xóa:', err)
    return []
  }
}

const saveCategory = async (categoryForm) => {
  try {
    if (categoryForm.id) {
      await apiService.put(`/v1/categories/${categoryForm.id}`, categoryForm)
    } else {
      await apiService.post('/v1/categories', categoryForm)
    }
  } catch (err) {
    console.error('Lỗi khi lưu phân loại:', err)
  }
}

const deleteCategory = async (id) => {
  try {
    await apiService.delete('/v1/categories/temporary', {
      data: { ids: [id] }
    })
  } catch (err) {
    console.error('Lỗi khi xóa phân loại:', err)
  }
}

const deletePermanentCategory = async (id) => {
  try {
    await apiService.delete('/v1/categories/', {
      data: { ids: [id] }
    })
  } catch (err) {
    console.error('Lỗi khi xóa vĩnh viễn phân loại:', err)
  }
}

const restoreCategory = async (id) => {
  try {
    await apiService.put(`/v1/categories/temporary/${id}`)
  } catch (err) {
    console.error('Lỗi khi khôi phục phân loại:', err)
  }
}

export default {
  getCategories,
  getDeletedCategories,
  saveCategory,
  deleteCategory,
  deletePermanentCategory,
  restoreCategory
}
