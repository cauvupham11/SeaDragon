<template>
  <div class="Categoriesadmin">
    <div class="header-actions">
      <h1>Quản lý phân loại</h1>
    </div>

    <div class="main-actions">
      <button class="btn-add" @click="showAddProductForm">Thêm sản phẩm</button>
      <button class="btn-trash" @click="toggleTrash">{{ showTrash ? 'Quay lại danh sách' : 'Xem thùng rác' }}</button>
    </div>

    <!-- Danh sách sản phẩm -->
    <div v-if="!showTrash">
      <table class="product-table">
        <thead>
          <tr>
            <th>Danh mục</th>
            <th>Phân loại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.category_id }}</td>
            <td>{{ product.category }}</td>
            <td class="action-buttons">
              <button class="btn-edit" @click="editProduct(product)">Sửa</button>
              <button class="btn-delete" @click="confirmDeleteProduct(product.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Thùng rác -->
    <div v-if="showTrash">
      <h2>Thùng rác</h2>
      <table class="product-table">
        <thead>
          <tr>
            <th>Danh mục</th>
            <th>Phân loại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in deletedProducts" :key="product.id">
            <td>{{ product.category_id }}</td>
            <td>{{ product.category }}</td>
            <td class="action-buttons">
              <button class="btn-restore" @click="restoreProduct(product.id)">Khôi phục</button>
              <button class="btn-delete-permanent" @click="confirmDeletePermanentProduct(product.id)">Xóa vĩnh viễn</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form thêm/sửa sản phẩm -->
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
              <label for="category">Phân loại:</label>
              <input type="text" v-model="productForm.category" id="category" required>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-submit">{{ formSubmitButton }}</button>
              <button type="button" class="btn-cancel" @click="closeForm">Hủy</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Xác nhận xóa -->
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
  { id: 1, category_id: 'C001', category: 'Gói Thiết Kế Website', isDeleted: false },
  { id: 2, category_id: 'C002', category: 'Gói Thiết Kế App', isDeleted: false },
  { id: 3, category_id: 'C003', category: 'Gói Thiết Kế Agency', isDeleted: false },
]);

const deletedProducts = ref([]);

const productForm = ref({
  id: null,
  category_id: '',
  category: '',
  isDeleted: false,
});

const formTitle = ref('Thêm mới sản phẩm');
const formSubmitButton = ref('Thêm sản phẩm');
const showProductForm = ref(false);
const showDeleteConfirm = ref(false);
const showTrash = ref(false);
const deleteProductId = ref(null);

const showAddProductForm = () => {
  resetForm();
  showProductForm.value = true;
};

const editProduct = (product) => {
  productForm.value = { ...product };
  formTitle.value = 'Sửa sản phẩm';
  formSubmitButton.value = 'Cập nhật sản phẩm';
  showProductForm.value = true;
};

const saveProduct = () => {
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
    const product = products.value.splice(index, 1)[0];
    product.isDeleted = true;
    deletedProducts.value.push(product);
  }
  showDeleteConfirm.value = false;
  deleteProductId.value = null;
};

const confirmDeletePermanentProduct = (id) => {
  const index = deletedProducts.value.findIndex(p => p.id === id);
  if (index !== -1) {
    deletedProducts.value.splice(index, 1);
  }
};

const restoreProduct = (id) => {
  const index = deletedProducts.value.findIndex(p => p.id === id);
  if (index !== -1) {
    const product = deletedProducts.value.splice(index, 1)[0];
    product.isDeleted = false;
    products.value.push(product);
  }
};

const cancelDelete = () => {
  showDeleteConfirm.value = false;
  deleteProductId.value = null;
};

const closeForm = () => {
  showProductForm.value = false;
};

const toggleTrash = () => {
  showTrash.value = !showTrash.value;
};

const resetForm = () => {
  productForm.value = { id: null, category_id: '', category: '', isDeleted: false };
  formTitle.value = 'Thêm mới sản phẩm';
  formSubmitButton.value = 'Thêm sản phẩm';
};
</script>

<style scoped>
.Categoriesadmin {
  padding: 30px;
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fdfdfd;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.main-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
}

h1 {
  color: #222;
  font-size: 28px;
  margin: 0;
}

.btn-add,
.btn-trash {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.btn-trash {
  background-color: #fd7e14;
}

.btn-add:hover {
  background-color: #218838;
}

.btn-trash:hover {
  background-color: #e8590c;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

.product-table th,
.product-table td {
  border: 1px solid #e0e0e0;
  padding: 12px 15px;
  text-align: left;
}

.product-table th {
  background-color: #f1f3f5;
  font-weight: 600;
  color: #333;
}

.product-table tr:nth-child(even) {
  background-color: #fafafa;
}

.product-table tr:hover {
  background-color: #f5f5f5;
}

.action-buttons .btn-edit,
.action-buttons .btn-delete,
.action-buttons .btn-restore,
.action-buttons .btn-delete-permanent {
  padding: 6px 12px;
  margin: 0 4px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  font-size: 13px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.action-buttons .btn-edit {
  background-color: #17a2b8;
  color: white;
}
.action-buttons .btn-edit:hover {
  background-color: #138496;
}

.action-buttons .btn-delete,
.action-buttons .btn-delete-permanent {
  background-color: #dc3545;
  color: white;
}
.action-buttons .btn-delete:hover,
.action-buttons .btn-delete-permanent:hover {
  background-color: #c82333;
}

.action-buttons .btn-restore {
  background-color: #ffc107;
  color: #212529;
}
.action-buttons .btn-restore:hover {
  background-color: #e0a800;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.product-form-dialog,
.confirm-dialog {
  background-color: #fff;
  padding: 25px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-close {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #999;
  transition: color 0.3s ease;
}
.btn-close:hover {
  color: #333;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: border 0.3s ease;
}
.form-group input:focus {
  border-color: #4CAF50;
  outline: none;
}

.form-actions {
  margin-top: 25px;
  text-align: right;
}

.btn-submit,
.btn-cancel,
.btn-confirm {
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  margin-left: 10px;
  transition: background-color 0.3s ease;
}

.btn-submit {
  background-color: #28a745;
  color: white;
}
.btn-submit:hover {
  background-color: #218838;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
}
.btn-cancel:hover {
  background-color: #5a6268;
}

.btn-confirm {
  background-color: #dc3545;
  color: white;
}
.btn-confirm:hover {
  background-color: #c82333;
}

.confirm-dialog {
  max-width: 420px;
  text-align: center;
}

.confirm-actions {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

</style>
