<template>
  <div class="Categoriesadmin">
    <div class="header-actions">
      <h1>Quản lý phân loại</h1>
    </div>

    <div class="main-actions">
      <button class="btn-add" @click="showAddProductForm">Thêm phân loại</button>
      <button class="btn-trash" @click="toggleTrash">{{ showTrash ? 'Quay lại danh sách' : 'Xem thùng rác' }}</button>
    </div>

    <div v-if="!showTrash">
      <table class="product-table">
        <thead>
          <tr>
            <th>Phân loại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.name }}</td>
            <td class="action-buttons">
              <button class="btn-edit" @click="editCategory(category)">Sửa</button>
              <button class="btn-delete" @click="confirmDeleteCategory(category.id)">Xóa</button>
            </td>
          </tr>
          <tr v-if="categories.length === 0">
            <td colspan="2" class="no-data">Không có dữ liệu</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <h2>Thùng rác</h2>
      <table class="product-table">
        <thead>
          <tr>
            <th>Phân loại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in deletedCategories" :key="category.id">
            <td>{{ category.name }}</td>
            <td class="action-buttons">
              <button class="btn-restore" @click="restoreCategory(category.id)">Khôi phục</button>
              <button class="btn-delete-permanent" @click="confirmDeletePermanentCategory(category.id)">Xóa vĩnh viễn</button>
            </td>
          </tr>
          <tr v-if="deletedCategories.length === 0">
            <td colspan="2" class="no-data">Thùng rác trống</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form thêm/sửa phân loại -->
    <div v-if="showCategoryForm" class="modal-overlay">
      <div class="product-form-dialog">
        <div class="form-header">
          <h2>{{ formTitle }}</h2>
          <button class="btn-close" @click="closeForm">×</button>
        </div>
        <div class="form-content">
          <form @submit.prevent="saveCategory">
            <div class="form-group">
              <label for="name">Tên phân loại:</label>
              <input type="text" v-model="categoryForm.name" id="name" required>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-submit">{{ formSubmitButton }}</button>
              <button type="button" class="btn-cancel" @click="closeForm">Hủy</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Confirm dialog -->
    <div v-if="showDeleteConfirm" class="modal-overlay">
      <div class="confirm-dialog">
        <p>Bạn có chắc chắn muốn xóa phân loại này?</p>
        <div class="confirm-actions">
          <button class="btn-confirm" @click="deleteCategory">Có</button>
          <button class="btn-cancel" @click="cancelDelete">Không</button>
        </div>
      </div>
    </div>

    <!-- Confirm delete permanent dialog -->
    <div v-if="showDeletePermanentConfirm" class="modal-overlay">
      <div class="confirm-dialog warning">
        <p>Bạn có chắc chắn muốn xóa vĩnh viễn phân loại này?</p>
        <div class="confirm-actions">
          <button class="btn-confirm delete" @click="deletePermanentCategory">Xóa vĩnh viễn</button>
          <button class="btn-cancel" @click="cancelDeletePermanent">Không</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import categoryService from '@/api/categoryService'

const categories = ref([])
const deletedCategories = ref([])

const categoryForm = ref({ id: null, name: '' })
const formTitle = ref('Thêm mới phân loại')
const formSubmitButton = ref('Thêm phân loại')
const showCategoryForm = ref(false)
const showDeleteConfirm = ref(false)
const showDeletePermanentConfirm = ref(false)
const showTrash = ref(false)
const deleteCategoryId = ref(null)

const fetchCategories = async () => {
  categories.value = await categoryService.getCategories()
}

const fetchDeletedCategories = async () => {
  deletedCategories.value = await categoryService.getDeletedCategories()
}

onMounted(() => {
  fetchCategories()
})

const showAddProductForm = () => {
  resetForm()
  showCategoryForm.value = true
}

const editCategory = (category) => {
  categoryForm.value = { ...category }
  formTitle.value = 'Sửa phân loại'
  formSubmitButton.value = 'Cập nhật phân loại'
  showCategoryForm.value = true
}

const saveCategory = async () => {
  await categoryService.saveCategory(categoryForm.value)
  showCategoryForm.value = false
  await fetchCategories()
  resetForm()
}

const confirmDeleteCategory = (id) => {
  deleteCategoryId.value = id
  showDeleteConfirm.value = true
}

const deleteCategory = async () => {
  await categoryService.deleteCategory(deleteCategoryId.value)
  showDeleteConfirm.value = false
  deleteCategoryId.value = null
  await fetchCategories()
  if (showTrash.value) await fetchDeletedCategories()
}

const confirmDeletePermanentCategory = (id) => {
  deleteCategoryId.value = id
  showDeletePermanentConfirm.value = true
}

const deletePermanentCategory = async () => {
  await categoryService.deletePermanentCategory(deleteCategoryId.value)
  showDeletePermanentConfirm.value = false
  deleteCategoryId.value = null
  await fetchDeletedCategories()
}

const restoreCategory = async (id) => {
  await categoryService.restoreCategory(id)
  fetchCategories()
  fetchDeletedCategories()
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  deleteCategoryId.value = null
}

const cancelDeletePermanent = () => {
  showDeletePermanentConfirm.value = false
  deleteCategoryId.value = null
}

const closeForm = () => {
  showCategoryForm.value = false
}

const toggleTrash = () => {
  showTrash.value = !showTrash.value
  if (showTrash.value) fetchDeletedCategories()
  else fetchCategories()
}

const resetForm = () => {
  categoryForm.value = { id: null, name: '' }
  formTitle.value = 'Thêm mới phân loại'
  formSubmitButton.value = 'Thêm phân loại'
}
</script>
<style scoped>

.Categoriesadmin {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fc;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #eaedf3;
  padding-bottom: 20px;
}

h1 {
  color: #1e293b;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
}

h2 {
  color: #334155;
  font-size: 24px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 25px;
}

.main-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.btn-add,
.btn-trash {
  background-color: #3b82f6;
  color: white;
  padding: 12px 22px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.15);
}

.btn-add::before {
  content: "+";
  font-size: 18px;
  font-weight: 700;
}

.btn-trash {
  background-color: #f97316;
  box-shadow: 0 4px 6px rgba(249, 115, 22, 0.15);
}

.btn-add:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(59, 130, 246, 0.2);
}

.btn-trash:hover {
  background-color: #ea580c;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(249, 115, 22, 0.2);
}

.product-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 30px;
}

.product-table th,
.product-table td {
  padding: 16px 20px;
  text-align: left;
  border-bottom: 1px solid #eaedf3;
}

.product-table th {
  background-color: #f1f5f9;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 0.5px;
}

.product-table tr:last-child td {
  border-bottom: none;
}

.product-table tbody tr {
  transition: all 0.2s ease;
  background-color: #ffffff;
}

.product-table tbody tr:hover {
  background-color: #f8fafc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-buttons .btn-edit,
.action-buttons .btn-delete,
.action-buttons .btn-restore,
.action-buttons .btn-delete-permanent {
  padding: 8px 14px;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-buttons .btn-edit {
  background-color: #0ea5e9;
  color: white;
  box-shadow: 0 2px 4px rgba(14, 165, 233, 0.1);
}

.action-buttons .btn-edit:hover {
  background-color: #0284c7;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(14, 165, 233, 0.2);
}

.action-buttons .btn-delete,
.action-buttons .btn-delete-permanent {
  background-color: #ef4444;
  color: white;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.1);
}

.action-buttons .btn-delete:hover,
.action-buttons .btn-delete-permanent:hover {
  background-color: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(239, 68, 68, 0.2);
}

.action-buttons .btn-restore {
  background-color: #eab308;
  color: #1e293b;
  box-shadow: 0 2px 4px rgba(234, 179, 8, 0.1);
}

.action-buttons .btn-restore:hover {
  background-color: #ca8a04;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(234, 179, 8, 0.2);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.product-form-dialog,
.confirm-dialog {
  background-color: #fff;
  padding: 30px;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.form-header h2 {
  margin: 0;
  color: #1e293b;
}

.btn-close {
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background-color: #f1f5f9;
  color: #1e293b;
}

.form-content {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
  color: #334155;
  font-size: 15px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s ease;
  background-color: #f8fafc;
  color: #1e293b;
}

.form-group input:focus {
  border-color: #3b82f6;
  outline: none;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-actions {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-submit,
.btn-cancel,
.btn-confirm {
  padding: 12px 22px;
  font-size: 15px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-submit {
  background-color: #3b82f6;
  color: white;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.15);
}

.btn-submit:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(59, 130, 246, 0.2);
}

.btn-cancel {
  background-color: #f1f5f9;
  color: #475569;
}

.btn-cancel:hover {
  background-color: #e2e8f0;
  transform: translateY(-2px);
}

.btn-confirm {
  background-color: #ef4444;
  color: white;
  box-shadow: 0 4px 6px rgba(239, 68, 68, 0.15);
}

.btn-confirm:hover {
  background-color: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(239, 68, 68, 0.2);
}

.confirm-dialog {
  max-width: 450px;
  text-align: center;
}

.confirm-dialog p {
  font-size: 17px;
  color: #334155;
  margin-bottom: 30px;
  line-height: 1.6;
}

.confirm-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}

/* Thêm status badge cho trạng thái sản phẩm */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
}

.status-active {
  background-color: #dcfce7;
  color: #166534;
}

.status-deleted {
  background-color: #fee2e2;
  color: #991b1b;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .Categoriesadmin {
    padding: 25px 15px;
  }
  
  .header-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .main-actions {
    width: 100%;
  }
  
  .btn-add, .btn-trash {
    flex: 1;
    justify-content: center;
  }
  
  .product-table th,
  .product-table td {
    padding: 12px 10px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 8px;
  }
  
  .action-buttons button {
    width: 100%;
    justify-content: center;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn-submit, .btn-cancel, .btn-confirm {
    width: 100%;
  }
}

/* Thêm hiệu ứng đẹp mắt */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.btn-add:focus {
  animation: pulse 1.5s infinite;
}

</style>
