<template>
    <div class="admin-product">
      <h1>Quản lý sản phẩm</h1>
    <button class="btn-add" @click="showAddProductForm">Thêm sản phẩm</button>
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
          <tr v-for="product in products" :key="product.id">
            <td>
              <img v-if="product.image" :src="getImageUrl(product.image)" class="product-image" alt="Product image">
              <span v-else>Không có ảnh</span>
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.category_id }}</td>
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
                <label for="category_id">Danh mục:</label>
                <input type="text" v-model="productForm.category_id" id="category_id" required>
              </div>
              
              <div class="form-group">
                <label for="name">Tên sản phẩm:</label>
                <input type="text" v-model="productForm.name" id="name" required>
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
                    <img :src="previewImage || getImageUrl(productForm.image)" class="preview-image">
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
              
              <div class="form-group">
                <label for="isDeleted">Trạng thái:</label>
                <select v-model="productForm.isDeleted" id="isDeleted" required>
                  <option :value="false">Còn hàng</option>
                  <option :value="true">Đã xóa</option>
                </select>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn-submit">{{ formSubmitButton }}</button>
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
import { ref } from 'vue';

const products = ref([
  { id: 1, category_id: 'C001', name: 'Táo', price: 10000, description: 'Táo tươi', isDeleted: false, image: 'apple.jpg' },
  { id: 2, category_id: 'C002', name: 'Chuối', price: 8000, description: 'Chuối ngon', isDeleted: false, image: 'banana.jpg' },
]);

const productForm = ref({
  id: null,
  category_id: '',
  name: '',
  image: '',
  price: '',
  description: '',
  isDeleted: false,
});

const formTitle = ref('Thêm mới sản phẩm');
const formSubmitButton = ref('Thêm sản phẩm');
const showProductForm = ref(false);
const showDeleteConfirm = ref(false);
const deleteProductId = ref(null);
const previewImage = ref(null);
const isDragging = ref(false);
const selectedFile = ref(null);

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};

const getImageUrl = (imageName) => {
  return imageName.startsWith('http') ? imageName : `/images/${imageName}`;
};

const showAddProductForm = () => {
  resetForm();
  showProductForm.value = true;
};

const editProduct = (product) => {
  productForm.value = { ...product };
  previewImage.value = null;
  formTitle.value = 'Sửa sản phẩm';
  formSubmitButton.value = 'Cập nhật sản phẩm';
  showProductForm.value = true;
};

const saveProduct = () => {
  if (selectedFile.value) {
    productForm.value.image = selectedFile.value.name;
  }

  if (productForm.value.id) {
    const index = products.value.findIndex(p => p.id === productForm.value.id);
    products.value[index] = { ...productForm.value };
  } else {
    productForm.value.id = products.value.length + 1;
    products.value.push({ ...productForm.value });
  }
  resetForm();
  showProductForm.value = false;
};

const confirmDeleteProduct = (id) => {
  deleteProductId.value = id;
  showDeleteConfirm.value = true;
};

const deleteProduct = () => {
  const index = products.value.findIndex(p => p.id === deleteProductId.value);
  if (index !== -1) {
    products.value.splice(index, 1);
  }
  showDeleteConfirm.value = false;
  deleteProductId.value = null;
};

const cancelDelete = () => {
  showDeleteConfirm.value = false;
  deleteProductId.value = null;
};

const closeForm = () => {
  showProductForm.value = false;
  previewImage.value = null;
  selectedFile.value = null;
};

const resetForm = () => {
  productForm.value = { id: null, category_id: '', name: '', image: '', price: '', description: '', isDeleted: false };
  formTitle.value = 'Thêm mới sản phẩm';
  formSubmitButton.value = 'Thêm sản phẩm';
  previewImage.value = null;
  selectedFile.value = null;
};

const dragOver = () => {
  isDragging.value = true;
};

const dragLeave = () => {
  isDragging.value = false;
};

const dropFile = (e) => {
  isDragging.value = false;
  const files = e.dataTransfer.files;
  if (files.length) {
    handleFile(files[0]);
  }
};

const handleFileSelect = (e) => {
  const files = e.target.files;
  if (files.length) {
    handleFile(files[0]);
  }
};

const handleFile = (file) => {
  if (!file.type.match('image.*')) {
    alert('Vui lòng chọn file ảnh!');
    return;
  }

  selectedFile.value = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const removeImage = () => {
  previewImage.value = null;
  selectedFile.value = null;
  productForm.value.image = '';
};
</script>

<style scoped>
.admin-product {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.btn-add {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: bold;
}

.btn-add:hover {
  background-color: #45a049;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  box-shadow: 0 2px 3px rgba(0,0,0,0.1);
}
.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.product-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #333;
}
.product-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.product-table tr:hover {
  background-color: #f1f1f1;
}

.status-active {
  color: #28a745;
  font-weight: bold;
}

.status-inactive {
  color: #dc3545;
  font-weight: bold;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-edit {
  background-color: #ffc107;
  color: #212529;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit:hover {
  background-color: #e0a800;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #c82333;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.product-form-dialog {
  background-color: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.form-header {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  flex-shrink: 0;
}

.form-content {
  overflow-y: auto;
  padding: 0 20px;
  flex-grow: 1;
}

.form-header h2 {
  margin: 0;
  color: #333;
}

.btn-close {
  position: absolute; 
  left: 980px;
  top: 50px; 
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  padding: 0;
  line-height: 1;
  z-index: 1000; 
}

.btn-close:hover {
  color: #666;
}

form {
  padding: 15px 0;
}

.form-group textarea {
  min-height: 100px;
  max-height: 200px;
  resize: vertical;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-actions {
  position: sticky;
  bottom: 0;
  background: white;
  padding: 15px 0;
  margin-top: 15px;
  border-top: 1px solid #eee;
}

.btn-submit {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-submit:hover {
  background-color: #0069d9;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel:hover {
  background-color: #5a6268;
}

.confirm-dialog {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  text-align: center;
}

.confirm-dialog p {
  margin-bottom: 20px;
  font-size: 16px;
}

.confirm-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.btn-confirm {
  background-color: #dc3545;
  color: white;
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-confirm:hover {
  background-color: #c82333;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.image-upload-container {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-upload-container.drag-active {
  border-color: #4CAF50;
  background-color: rgba(76, 175, 80, 0.1);
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.upload-icon {
  font-size: 36px;
  color: #666;
}

.btn-upload {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-upload:hover {
  background-color: #45a049;
}

.preview-area {
  position: relative;
  width: 100%;
  height: 100%;
}

.preview-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
}

.btn-remove-image {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 30px;
  height: 30px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-remove-image:hover {
  background-color: #c82333;
}
</style>