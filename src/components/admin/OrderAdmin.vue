<template>
  <div class="admin-order">
    <h1>Quản lý đơn hàng</h1>
  <button class="btn-add" @click="showAddOrderForm">Thêm đơn hàng</button>
  <table class="order-table">
      <thead>
        <tr>
          <th>Mã đơn hàng</th>
          <th>Khách hàng</th>
          <th>Ngày đặt</th>
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.orderCode }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ formatDate(order.orderDate) }}</td>
          <td>{{ formatPrice(order.totalAmount) }} VNĐ</td>
          <td>
            <span :class="getStatusClass(order.status)">
              {{ getStatusText(order.status) }}
            </span>
          </td>
          <td class="action-buttons">
            <button class="btn-view" @click="viewOrderDetail(order)">Chi tiết</button>
            <button class="btn-edit" @click="editOrder(order)">Sửa</button>
            <button class="btn-delete" @click="confirmDeleteOrder(order.id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showOrderForm" class="modal-overlay">
      <div class="order-form-dialog">
        <div class="form-header">
          <h2>{{ formTitle }}</h2>
          <button class="btn-close" @click="closeForm">×</button>
        </div>
        <div class="form-content">
          <form @submit.prevent="saveOrder">
            <div class="form-group">
              <label for="customerName">Tên khách hàng:</label>
              <input type="text" v-model="orderForm.customerName" id="customerName" required>
            </div>
            
            <div class="form-group">
              <label for="phone">Số điện thoại:</label>
              <input type="text" v-model="orderForm.phone" id="phone" required>
            </div>
            
            <div class="form-group">
              <label for="address">Địa chỉ giao hàng:</label>
              <textarea v-model="orderForm.address" id="address" required></textarea>
            </div>

            <div class="form-group">
              <label for="orderDate">Ngày đặt hàng:</label>
              <input type="date" v-model="orderForm.orderDate" id="orderDate" required>
            </div>
            
            <div class="form-group">
              <label>Sản phẩm đặt hàng:</label>
              <div class="order-items">
                <div v-for="(item, index) in orderForm.items" :key="index" class="order-item">
                  <div class="item-details">
                    <div class="item-detail">
                      <label>Sản phẩm:</label>
                      <input type="text" v-model="item.productName" required>
                    </div>
                    <div class="item-detail">
                      <label>Số lượng:</label>
                      <input type="number" v-model="item.quantity" min="1" required>
                    </div>
                    <div class="item-detail">
                      <label>Đơn giá:</label>
                      <input type="number" v-model="item.price" min="0" required>
                    </div>
                  </div>
                  <button type="button" class="btn-remove-item" @click="removeOrderItem(index)">×</button>
                </div>
                <button type="button" class="btn-add-item" @click="addOrderItem">+ Thêm sản phẩm</button>
              </div>
            </div>
            
            <div class="form-group">
              <label for="totalAmount">Tổng tiền:</label>
              <input type="number" v-model="orderForm.totalAmount" id="totalAmount" required>
            </div>
            
            <div class="form-group">
              <label for="status">Trạng thái đơn hàng:</label>
              <select v-model="orderForm.status" id="status" required>
                <option value="pending">Chờ xác nhận</option>
                <option value="processing">Đang xử lý</option>
                <option value="shipped">Đang giao hàng</option>
                <option value="delivered">Đã giao hàng</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="note">Ghi chú:</label>
              <textarea v-model="orderForm.note" id="note"></textarea>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn-submit">{{ formSubmitButton }}</button>
              <button type="button" class="btn-cancel" @click="closeForm">Hủy</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Order Detail Modal -->
    <div v-if="showOrderDetail" class="modal-overlay">
      <div class="order-detail-dialog">
        <div class="form-header">
          <h2>Chi tiết đơn hàng #{{ viewingOrder.orderCode }}</h2>
          <button class="btn-close" @click="closeOrderDetail">×</button>
        </div>
        <div class="form-content">
          <div class="order-info">
            <div class="order-section">
              <h3>Thông tin khách hàng</h3>
              <p><strong>Tên khách hàng:</strong> {{ viewingOrder.customerName }}</p>
              <p><strong>Số điện thoại:</strong> {{ viewingOrder.phone }}</p>
              <p><strong>Địa chỉ:</strong> {{ viewingOrder.address }}</p>
            </div>
            
            <div class="order-section">
              <h3>Thông tin đơn hàng</h3>
              <p><strong>Mã đơn hàng:</strong> {{ viewingOrder.orderCode }}</p>
              <p><strong>Ngày đặt:</strong> {{ formatDate(viewingOrder.orderDate) }}</p>
              <p><strong>Trạng thái:</strong> 
                <span :class="getStatusClass(viewingOrder.status)">
                  {{ getStatusText(viewingOrder.status) }}
                </span>
              </p>
              <p><strong>Ghi chú:</strong> {{ viewingOrder.note || 'Không có' }}</p>
            </div>
            
            <div class="order-section">
              <h3>Sản phẩm đặt hàng</h3>
              <table class="items-table">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in viewingOrder.items" :key="index">
                    <td>{{ item.productName }}</td>
                    <td>{{ formatPrice(item.price) }} VNĐ</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ formatPrice(item.price * item.quantity) }} VNĐ</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="total-label">Tổng tiền:</td>
                    <td class="total-value">{{ formatPrice(viewingOrder.totalAmount) }} VNĐ</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          <div class="detail-actions">
            <button class="btn-edit" @click="editFromDetail">Sửa đơn hàng</button>
            
            
            <button class="btn-cancel" @click="closeOrderDetail">Đóng</button>
          </div>
          
          <!-- Status Update Form -->
          <div v-if="showStatusForm" class="status-update-form">
            <h3>Cập nhật trạng thái</h3>
            <div class="form-group">
              <label for="updateStatus">Trạng thái mới:</label>
              <select v-model="statusUpdate" id="updateStatus" required>
                <option value="pending">Chờ xác nhận</option>
                <option value="processing">Đang xử lý</option>
                <option value="shipped">Đang giao hàng</option>
                <option value="delivered">Đã giao hàng</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
            <div class="status-actions">
              <button class="btn-submit" @click="updateOrderStatus">Cập nhật</button>
              <button class="btn-cancel" @click="showStatusForm = false">Hủy</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog for Delete -->
    <div v-if="showDeleteConfirm" class="modal-overlay">
      <div class="confirm-dialog">
        <p>Bạn có chắc chắn muốn xóa đơn hàng này?</p>
        <div class="confirm-actions">
          <button class="btn-confirm" @click="deleteOrder">Có</button>
          <button class="btn-cancel" @click="cancelDelete">Không</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const orders = ref([
{ 
  id: 1, 
  orderCode: 'DH001', 
  customerName: 'Nguyễn Văn A', 
  phone: '0987654321',
  address: '123 Đường Lê Lợi, Quận 1, TP HCM',
  orderDate: '2025-05-02', 
  totalAmount: 350000, 
  status: 'delivered',
  note: 'Giao hàng giờ hành chính',
  items: [
    { productName: 'Táo', price: 10000, quantity: 5 },
    { productName: 'Chuối', price: 8000, quantity: 10 },
    { productName: 'Cam', price: 15000, quantity: 10 }
  ]
},
{ 
  id: 2, 
  orderCode: 'DH002', 
  customerName: 'Trần Thị B', 
  phone: '0912345678',
  address: '456 Đường Nguyễn Huệ, Quận 3, TP HCM',
  orderDate: '2025-05-04', 
  totalAmount: 520000, 
  status: 'pending',
  note: '',
  items: [
    { productName: 'Nho', price: 50000, quantity: 2 },
    { productName: 'Dưa hấu', price: 70000, quantity: 6 }
  ]
},
{ 
  id: 3, 
  orderCode: 'DH003', 
  customerName: 'Lê Văn C', 
  phone: '0976543210',
  address: '789 Đường Võ Văn Tần, Quận 10, TP HCM',
  orderDate: '2025-05-06', 
  totalAmount: 870000, 
  status: 'shipped',
  note: 'Gọi trước khi giao',
  items: [
    { productName: 'Xoài', price: 25000, quantity: 3 },
    { productName: 'Bơ', price: 35000, quantity: 5 },
    { productName: 'Dâu tây', price: 120000, quantity: 5 }
  ]
},
]);

const orderForm = ref({
id: null,
orderCode: '',
customerName: '',
phone: '',
address: '',
orderDate: '',
totalAmount: 0,
status: 'pending',
note: '',
items: [
  { productName: '', price: 0, quantity: 1 }
]
});

const formTitle = ref('Thêm mới đơn hàng');
const formSubmitButton = ref('Thêm đơn hàng');
const showOrderForm = ref(false);
const showDeleteConfirm = ref(false);
const deleteOrderId = ref(null);
const showOrderDetail = ref(false);
const viewingOrder = ref({});
const showStatusForm = ref(false);
const statusUpdate = ref('');

const formatPrice = (price) => {
return new Intl.NumberFormat('vi-VN').format(price);
};

const formatDate = (dateString) => {
const date = new Date(dateString);
return new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
}).format(date);
};

const getStatusClass = (status) => {
switch(status) {
  case 'pending': return 'status-pending';
  case 'processing': return 'status-processing';
  case 'shipped': return 'status-shipped';
  case 'delivered': return 'status-delivered';
  case 'cancelled': return 'status-cancelled';
  default: return '';
}
};

const getStatusText = (status) => {
switch(status) {
  case 'pending': return 'Chờ xác nhận';
  case 'processing': return 'Đang xử lý';
  case 'shipped': return 'Đang giao hàng';
  case 'delivered': return 'Đã giao hàng';
  case 'cancelled': return 'Đã hủy';
  default: return '';
}
};

const showAddOrderForm = () => {
resetForm();
showOrderForm.value = true;
};

const editOrder = (order) => {
orderForm.value = JSON.parse(JSON.stringify(order)); // Deep copy
formTitle.value = 'Sửa đơn hàng';
formSubmitButton.value = 'Cập nhật đơn hàng';
showOrderForm.value = true;

if (showOrderDetail.value) {
  closeOrderDetail();
}
};

const editFromDetail = () => {
editOrder(viewingOrder.value);
};

const saveOrder = () => {
// Calculate total if needed
if (!orderForm.value.totalAmount) {
  orderForm.value.totalAmount = orderForm.value.items.reduce(
    (total, item) => total + (item.price * item.quantity), 0
  );
}

// Generate order code if it's a new order
if (!orderForm.value.orderCode) {
  const lastOrder = [...orders.value].sort((a, b) => b.id - a.id)[0];
  const lastId = lastOrder ? parseInt(lastOrder.orderCode.replace('DH', '')) : 0;
  orderForm.value.orderCode = `DH${String(lastId + 1).padStart(3, '0')}`;
}

if (orderForm.value.id) {
  const index = orders.value.findIndex(o => o.id === orderForm.value.id);
  orders.value[index] = { ...orderForm.value };
} else {
  orderForm.value.id = orders.value.length + 1;
  orders.value.push({ ...orderForm.value });
}
resetForm();
showOrderForm.value = false;
};

const confirmDeleteOrder = (id) => {
deleteOrderId.value = id;
showDeleteConfirm.value = true;
};

const deleteOrder = () => {
const index = orders.value.findIndex(o => o.id === deleteOrderId.value);
if (index !== -1) {
  orders.value.splice(index, 1);
}
showDeleteConfirm.value = false;
deleteOrderId.value = null;
};

const cancelDelete = () => {
showDeleteConfirm.value = false;
deleteOrderId.value = null;
};

const viewOrderDetail = (order) => {
viewingOrder.value = JSON.parse(JSON.stringify(order)); // Deep copy
showOrderDetail.value = true;
};

const closeOrderDetail = () => {
showOrderDetail.value = false;
showStatusForm.value = false;
};

const updateOrderStatus = () => {
// Update the status in the viewing order
viewingOrder.value.status = statusUpdate.value;

// Also update in the main orders array
const index = orders.value.findIndex(o => o.id === viewingOrder.value.id);
if (index !== -1) {
  orders.value[index].status = statusUpdate.value;
}

showStatusForm.value = false;
};

const addOrderItem = () => {
orderForm.value.items.push({ productName: '', price: 0, quantity: 1 });
};

const removeOrderItem = (index) => {
if (orderForm.value.items.length > 1) {
  orderForm.value.items.splice(index, 1);
}
};

const closeForm = () => {
showOrderForm.value = false;
};

const resetForm = () => {
orderForm.value = {
  id: null,
  orderCode: '',
  customerName: '',
  phone: '',
  address: '',
  orderDate: new Date().toISOString().split('T')[0], // Today's date
  totalAmount: 0,
  status: 'pending',
  note: '',
  items: [
    { productName: '', price: 0, quantity: 1 }
  ]
};
formTitle.value = 'Thêm mới đơn hàng';
formSubmitButton.value = 'Thêm đơn hàng';
};
</script>

<style scoped>
.admin-order {
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

.btn-add:hover {
transform: translateY(-2px);
box-shadow: 0 4px 10px rgba(46, 204, 113, 0.3);
}

.order-table {
width: 100%;
border-collapse: separate;
border-spacing: 0;
background: white;
border-radius: 12px;
overflow: hidden;
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.order-table th,
.order-table td {
padding: 15px;
text-align: left;
border-bottom: 1px solid #e9ecef;
}

.order-table th {
background: linear-gradient(45deg, #3498db, #2980b9);
color: white;
font-weight: 600;
text-transform: uppercase;
font-size: 0.9rem;
}

.order-table tr {
transition: background 0.2s;
}

.order-table tr:hover {
background-color: #f8f9fa;
}

.status-pending {
color: #f39c12;
font-weight: 600;
background: rgba(243, 156, 18, 0.1);
padding: 4px 8px;
border-radius: 12px;
}

.status-processing {
color: #3498db;
font-weight: 600;
background: rgba(52, 152, 219, 0.1);
padding: 4px 8px;
border-radius: 12px;
}

.status-shipped {
color: #9b59b6;
font-weight: 600;
background: rgba(155, 89, 182, 0.1);
padding: 4px 8px;
border-radius: 12px;
}

.status-delivered {
color: #27ae60;
font-weight: 600;
background: rgba(46, 204, 113, 0.1);
padding: 4px 8px;
border-radius: 12px;
}

.status-cancelled {
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

.btn-view {
background: linear-gradient(45deg, #3498db, #2980b9);
color: white;
padding: 8px 16px;
border: none;
border-radius: 50px;
cursor: pointer;
font-size: 0.9rem;
transition: transform 0.2s;
}

.btn-view:hover {
transform: translateY(-2px);
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

.order-form-dialog, .order-detail-dialog {
background: white;
border-radius: 16px;
width: 800px;
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
min-height: 80px;
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

/* Order Items */
.order-items {
display: flex;
flex-direction: column;
gap: 15px;
border: 1px solid #dfe6e9;
border-radius: 8px;
padding: 15px;
background: #f9f9f9;
}

/* Additional styles for order items */
.order-item {
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
}

.order-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-add-item {
  background: linear-gradient(45deg, #2ecc71, #27ae60);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  align-self: flex-start;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-add-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(46, 204, 113, 0.3);
}

.btn-remove-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: background 0.2s, transform 0.2s;
}

.btn-remove-item:hover {
  background: linear-gradient(45deg, #c0392b, #a93226);
  transform: scale(1.1);
}

/* Order Detail Modal Enhancements */
.order-detail-dialog {
  max-height: 95vh;
  overflow: hidden;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-section {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #dfe6e9;
}

.order-section h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 15px;
  font-weight: 600;
}

.order-section p {
  margin: 8px 0;
  color: #34495e;
  font-size: 1rem;
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.items-table th,
.items-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dfe6e9;
}

.items-table th {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.items-table td {
  background: white;
}

.items-table tfoot {
  font-weight: 600;
}

.total-label {
  text-align: right;
  color: #2c3e50;
}

.total-value {
  color: #e74c3c;
  font-weight: 700;
}

.detail-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding-top: 20px;
  border-top: 1px solid #dfe6e9;
}

.btn-status, .btn-print {
  background: linear-gradient(45deg, #9b59b6, #8e44ad);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-status:hover, .btn-print:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(155, 89, 182, 0.3);
}

/* Status Update Form */
.status-update-form {
  margin-top: 20px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #dfe6e9;
}

.status-update-form h3 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.status-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 15px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .admin-order {
    padding: 20px;
  }

  .order-table th,
  .order-table td {
    padding: 10px;
    font-size: 0.85rem;
  }

  .action-buttons {
    flex-direction: column;
    gap: 8px;
  }

  .order-form-dialog, .order-detail-dialog {
    width: 90%;
    max-height: 85vh;
  }

  .item-details {
    flex-direction: column;
  }

  .item-detail {
    min-width: 100%;
  }

  .form-header h2 {
    font-size: 1.4rem;
  }

  .form-content {
    padding: 20px;
  }

  .btn-add, .btn-submit, .btn-cancel, .btn-add-item {
    padding: 10px 18px;
    font-size: 0.9rem;
  }

  .confirm-dialog {
    width: 90%;
    padding: 20px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.8rem;
  }

  .order-table {
    font-size: 0.8rem;
  }

  .btn-view, .btn-edit, .btn-delete, .btn-status, .btn-print {
    padding: 8px 12px;
    font-size: 0.8rem;
  }

  .form-group label {
    font-size: 0.9rem;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 10px;
    font-size: 0.9rem;
  }
}

/* Scrollbar Styling */
.order-form-dialog::-webkit-scrollbar,
.order-detail-dialog::-webkit-scrollbar {
  width: 8px;
}

.order-form-dialog::-webkit-scrollbar-track,
.order-detail-dialog::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 8px;
}

.order-form-dialog::-webkit-scrollbar-thumb,
.order-detail-dialog::-webkit-scrollbar-thumb {
  background: #3498db;
  border-radius: 8px;
}

.order-form-dialog::-webkit-scrollbar-thumb:hover,
.order-detail-dialog::-webkit-scrollbar-thumb:hover {
  background: #2980b9;
}

/* Accessibility Enhancements */
button:focus,
input:focus,
select:focus,
textarea:focus {
  outline: 2px solid #3498db;
  outline-offset: 2px;
}

.btn-add:focus,
.btn-submit:focus,
.btn-cancel:focus,
.btn-confirm:focus,
.btn-add-item:focus,
.btn-remove-item:focus,
.btn-view:focus,
.btn-edit:focus,
.btn-delete:focus,
.btn-status:focus,
.btn-print:focus {
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
}
</style>