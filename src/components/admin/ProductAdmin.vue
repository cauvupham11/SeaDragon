<template>
    <div class="admin-product">
      <h1>Quản lý sản phẩm</h1>
    <button class="btn-add" @click="showAddProductForm">Thêm sản phẩm</button>
    <div class="category-filter">
      <label for="category-filter">Chọn danh mục:</label>
      <select id="category-filter" v-model="selectedCategoryId" @change="filterByCategory">
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      <button class="btn-filter" @click="filterByCategory">Lọc sản phẩm</button>
    </div>
    <table class="product-table">
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td>
              <img v-if="product.image" :src="getImageUrl(product.image)" class="product-image" alt="Product image">
              <span v-else>Không có ảnh</span>
            </td>
            <td>{{ product.title || product.name }}</td>
            <td>{{ product.category?.name || product.category_id }}</td>
            <td>{{ formatPrice(product.price) }} VNĐ</td>
            <td>
              <span :class="{'status-active': !product.isDeleted, 'status-inactive': product.isDeleted}">
                {{ product.isDeleted ? 'Đã xóa' : 'Còn hàng' }}
              </span>
            </td>
            <td class="action-buttons">
              <button class="btn-edit" @click="editProduct(product)">Sửa</button>
              <button class="btn-delete" @click="confirmDeleteProduct(product.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="showProductForm" class="modal-overlay">
        <div class="product-form-dialog">
          <div class="form-header">
            <h2>{{ formTitle }}</h2>
            <button class="btn-close" @click="closeForm">×</button>
          </div>
          <div class="form-content">
            <form @submit.prevent="saveProduct">
              <div class="form-group">
                <!-- <label for="category_id">Danh mục:</label> -->
                <label for="category_id">Chọn danh mục:</label>
                  <select v-model="productForm.categoryId" id="category_id" name="category_id" required>
                    <option disabled value="">-- Chọn danh mục --</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                <!-- <input type="text" v-model="productForm.category_id" id="category_id" required> -->
              </div>
              <div class="form-group">
                <label for="name">Tên sản phẩm:</label>
                <input type="text" v-model="productForm.title" id="name" required>
              </div>
              
              <div class="form-group">
                <label>Hình ảnh:</label>
                <div 
                  class="image-upload-container"
                  @dragover.prevent="dragOver"
                  @dragleave.prevent="dragLeave"
                  @drop.prevent="dropFile"
                  :class="{'drag-active': isDragging}"
                >
                  <div v-if="!previewImage && !productForm.image" class="upload-area">
                    <span class="upload-icon">+</span>
                    <p>Kéo thả ảnh vào đây hoặc</p>
                    <input 
                      type="file" 
                      id="image-upload" 
                      accept="image/*" 
                      @change="handleFileSelect"
                      hidden
                    >
                    <label for="image-upload" class="btn-upload">Chọn ảnh từ máy</label>
                  </div>
                  <div v-else class="preview-area">
                    <img :src="previewImage || getImageUrl(productForm.image)" alt="product image" />
                    <button type="button" class="btn-remove-image" @click="removeImage">×</button>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label for="price">Giá:</label>
                <input type="number" v-model="productForm.price" id="price" required>
              </div>
              
              <div class="form-group">
                <label for="description">Mô tả:</label>
                <textarea v-model="productForm.description" id="description" required></textarea>
              </div>
              
              <!-- <div class="form-group">
                <label for="isDeleted">Trạng thái:</label>
                <select v-model="productForm.isDeleted" id="isDeleted" required>
                  <option :value="false">Còn hàng</option>
                  <option :value="true">Đã xóa</option>
                </select>
              </div> -->
              
              <div class="form-actions">
                <button type="submit" class="btn-submit">Create</button>
                <button type="button" class="btn-cancel" @click="closeForm">Hủy</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Confirmation Dialog for Delete -->
      <div v-if="showDeleteConfirm" class="modal-overlay">
        <div class="confirm-dialog">
          <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
          <div class="confirm-actions">
            <button class="btn-confirm" @click="deleteProduct">Có</button>
            <button class="btn-cancel" @click="cancelDelete">Không</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import ProductService from '@/api/productService'
import apiService from '@/api/apiService'

// Data states
const products = ref([])
const categories = ref([])
const filteredProducts = ref([]) 
const selectedCategoryId = ref('')

const productForm = reactive({
  id: null,
  title: '',
  description: '',
  price: 0,
  categoryId: 0,
  image: null,
  isDeleted: false
})

// UI states
const formTitle = ref('Thêm mới sản phẩm')
const formSubmitButton = ref('Thêm sản phẩm')
const showProductForm = ref(false)
const showDeleteConfirm = ref(false)
const deleteProductId = ref(null)
const previewImage = ref(null)
const isDragging = ref(false)
const selectedFile = ref(null)
const isLoading = ref(false)

onMounted(async () => {
  await fetchCategories()
  fetchProducts(selectedCategoryId.value)
})

const fetchProducts = async (categoryId = '') => {
  try {
    isLoading.value = true
    const response = await apiService.get(`/v1/products?categoryId=${categoryId}`)
    console.log('API trả về sản phẩm:', response.data || response)
    products.value = response.data.data || [] // Đảm bảo lấy dữ liệu từ trường "data" trong API
    filteredProducts.value = [...products.value]
  } catch (error) {
    console.error('Lỗi lấy sản phẩm:', error)
  } finally {
    isLoading.value = false
  }
}

const filterByCategory =async () => {
  filteredProducts.value = []
  console.log('--- Bắt đầu lọc sản phẩm ---')
  console.log('ID danh mục được chọn:', selectedCategoryId.value)

  if (selectedCategoryId.value) {
    var res = await  ProductService.getAllProducts(selectedCategoryId.value) 
    console.log("kieu du leiu",typeof(res)),
    console.log(res)
    for (const item of res){
      filteredProducts.value.push(item)
    }
    
    console.log('Hiển thị tất cả sản phẩm:', filteredProducts.value)
    return
  }
  console.log('Danh sách sản phẩm:', products.value)
  filteredProducts.value = products.value.filter(product => {
    const categoryId = product.category?.id || product.category_id || ''
    console.log(`→ So sánh: sản phẩm ${product.title} có categoryId=${categoryId} với selected=${selectedCategoryId.value}`)
    return categoryId == selectedCategoryId.value
  })
  console.log('Sản phẩm sau khi lọc:', filteredProducts.value)
}

const fetchCategories = async () => {
  try {
    const response = await apiService.get('/v1/categories')
    console.log('Dữ liệu từ API:', response.data)
    categories.value = response.data.data || []
    
    if (categories.value.length > 0) {
      selectedCategoryId.value = categories.value[0].id
      fetchProducts(selectedCategoryId.value)
    } else {
      console.log('Không có danh mục')
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh mục:', error)
  }
}

const getProductDetail = async (id) => {
  try {
    return await ProductService.getProductById(id)
  } catch (error) {
    console.error('Failed to fetch product details:', error)
    throw error
  }
}
const showAddProductForm = () => {
  resetForm()
  showProductForm.value = true
}

const editProduct = async (product) => {
  try {
    const productDetail = await getProductDetail(product.id)
    Object.assign(productForm, {
      ...productDetail,
      categoryId: productDetail.category?.id || productDetail.category_id || '',
      title: productDetail.title || productDetail.name,
      image: productDetail.image || null
    })
    previewImage.value = productDetail.image ? getImageUrl(productDetail.image) : null
    formTitle.value = 'Sửa sản phẩm'
    formSubmitButton.value = 'Cập nhật sản phẩm'
    showProductForm.value = true
  } catch (error) {
    console.error('Không thể tải thông tin sản phẩm:', error)
    alert('Không thể tải thông tin sản phẩm')
  }
}
const saveProduct = async () => {
  try {
    isLoading.value = true;
    const formData = new FormData();
    
    // Thêm các trường dữ liệu vào formData
    formData.append('title', productForm.title);
    formData.append('description', productForm.description);
    formData.append('price', productForm.price.toString());
    formData.append('categoryId', productForm.categoryId.toString());
    
    // Xử lý file ảnh đúng cách
    if (productForm.image instanceof File) {
      formData.append('image', productForm.image, productForm.image.name);
    } else if (productForm.image) {
      // Nếu image là đường dẫn (khi edit), không gửi lại
      console.log('Image is a path, not sending again');
    }

    const response = await apiService.post('/v1/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    await fetchProducts(selectedCategoryId.value);
    closeForm();
    alert('Sản phẩm đã được lưu thành công!');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lưu sản phẩm:', error);
    alert(`Lỗi khi lưu sản phẩm: ${error.response?.data?.message || error.message}`);
    throw error;
  } finally {
    isLoading.value = false;
  }
};

const confirmDeleteProduct = (id) => {
  deleteProductId.value = id
  showDeleteConfirm.value = true
}

const deleteProduct = async () => {
  try {
    isLoading.value = true;
    // Hiển thị loading hoặc disable nút trong lúc xử lý
    
    const productId = deleteProductId.value;
    await ProductService.deleteProducts([productId]);
    
    // Cập nhật UI ngay lập tức mà không cần gọi API lại
    filteredProducts.value = filteredProducts.value.filter(p => p.id !== productId);
    products.value = products.value.filter(p => p.id !== productId);
    
    // Hoặc nếu muốn chắc chắn dữ liệu mới nhất từ server:
    // await fetchProducts(selectedCategoryId.value);
    
    alert('Xóa sản phẩm thành công!');
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    alert(`Lỗi khi xóa sản phẩm: ${error.response?.data?.message || error.message}`);
  } finally {
    showDeleteConfirm.value = false;
    deleteProductId.value = null;
    isLoading.value = false;
  }
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  deleteProductId.value = null
}

const closeForm = () => {
  showProductForm.value = false
  previewImage.value = null
  selectedFile.value = null
}

const resetForm = () => {
  productForm.value = { 
    id: null, 
    categoryId: '', 
    title: '', 
    image: null, 
    price: '', 
    description: '', 
    isDeleted: false 
  }
  formTitle.value = 'Thêm mới sản phẩm'
  formSubmitButton.value = 'Thêm sản phẩm'
  previewImage.value = null
  selectedFile.value = null
}


const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  
  // Kiểm tra nếu imagePath là File object (khi upload ảnh mới)
  if (imagePath instanceof File) {
    return URL.createObjectURL(imagePath)
  }
  
  // Kiểm tra nếu imagePath là object có thuộc tính path
  if (typeof imagePath === 'object' && imagePath.path) {
    imagePath = imagePath.path
  }
  
  // Đảm bảo imagePath là string trước khi gọi startsWith
  imagePath = String(imagePath)
  
  return imagePath.startsWith('http') ? imagePath : `${process.env.VUE_APP_BACKEND_API}${imagePath}`
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

const dragOver = (e) => {
  e.preventDefault()
  isDragging.value = true
}

const dragLeave = () => {
  isDragging.value = false
}

const dropFile = (e) => {
  e.preventDefault()
  isDragging.value = false
  const files = e.dataTransfer.files
  if (files.length) {
    handleFile(files[0])
  }
}

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    productForm.image = file;
    handleFile(file);
  }
};

const handleFile = (file) => {
  if (!file.type.match('image.*')) {
    alert('Vui lòng chọn file ảnh!')
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    alert('Kích thước ảnh không được vượt quá 2MB')
    return
  }

  selectedFile.value = file
  productForm.image = file

  const reader = new FileReader()
  reader.onload = (e) => {
    previewImage.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  previewImage.value = null
  selectedFile.value = null
  productForm.image = null
}
</script>

<style scoped>
.admin-product {
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f0 100%);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
}

.btn-add {
  background: linear-gradient(45deg, #2ecc71, #27ae60);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: 30px;
  display: inline-block;
}
/* Phần lọc danh mục */
.category-filter {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.category-filter label {
  font-size: 16px;
  margin-right: 10px;
}

.category-filter select {
  padding: 5px 10px;
  font-size: 16px;
  margin-right: 10px;
}

.btn-filter {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

.btn-filter:hover {
  background-color: #0056b3;
}

/* Bảng sản phẩm */
.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.product-table th,
.product-table td {
  padding: 12px 15px;
  text-align: left;
  border: 1px solid #ddd;
}

.product-table th {
  background-color: #f8f9fa;
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.status-active {
  color: green;
}

.status-inactive {
  color: red;
}

.action-buttons button {
  padding: 6px 12px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.action-buttons button:hover {
  background-color: #0056b3;
}

.btn-delete {
  background-color: #dc3545;
}

.btn-delete:hover {
  background-color: #c82333;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(46, 204, 113, 0.3);
}

.product-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.product-table th,
.product-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.product-table th {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.product-table tr {
  transition: background 0.2s;
}

.product-table tr:hover {
  background-color: #f8f9fa;
}

.status-active {
  color: #27ae60;
  font-weight: 600;
  background: rgba(46, 204, 113, 0.1);
  padding: 4px 8px;
  border-radius: 12px;
}

.status-inactive {
  color: #e74c3c;
  font-weight: 600;
  background: rgba(231, 76, 60, 0.1);
  padding: 4px 8px;
  border-radius: 12px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.btn-edit {
  background: linear-gradient(45deg, #f1c40f, #e67e22);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: transform 0.2s;
}

.btn-edit:hover {
  transform: translateY(-2px);
}

.btn-delete {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: transform 0.2s;
}

.btn-delete:hover {
  transform: translateY(-2px);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(44, 62, 80, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.product-form-dialog {
  background: white;
  border-radius: 16px;
  width: 600px;
  max-width: 95%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.form-header {
  padding: 20px 30px;
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  border-radius: 16px 16px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-content {
  padding: 30px;
  overflow-y: auto;
}

.form-header h2 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
}

.btn-close {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: white;
  transition: transform 0.2s;
}

.btn-close:hover {
  transform: rotate(90deg);
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  display: block;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #dfe6e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
  outline: none;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding-top: 20px;
  border-top: 1px solid #dfe6e9;
}

.btn-submit {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
}

.btn-cancel {
  background: linear-gradient(45deg, #95a5a6, #7f8c8d);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-cancel:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(149, 165, 166, 0.3);
}

.confirm-dialog {
  background: white;
  border-radius: 16px;
  padding: 30px;
  width: 450px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

.confirm-dialog p {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 30px;
}

.confirm-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn-confirm {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
}

.btn-confirm:hover {
  transform: translateY(-2px);
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.image-upload-container {
  border: 2px dashed #b2bec3;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  background: #f9f9f9;
}

.image-upload-container.drag-active {
  border-color: #2ecc71;
  background: rgba(46, 204, 113, 0.1);
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.upload-icon {
  font-size: 48px;
  color: #7f8c8d;
  transition: color 0.2s;
}

.image-upload-container.drag-active .upload-icon {
  color: #2ecc71;
}

.btn-upload {
  background: linear-gradient(45deg, #2ecc71, #27ae60);
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
}

.btn-upload:hover {
  transform: translateY(-2px);
}

.preview-area {
  position: relative;
  width: 100%;
  height: 100%;
}

.preview-image {
  max-width: 100%;
  max-height: 250px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.btn-remove-image {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s;
}

.btn-remove-image:hover {
  transform: scale(1.1);
}
</style>