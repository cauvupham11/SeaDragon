<template>
  <div class="orders-container">
    <h2 class="title">📦 Quản lý Đơn Hàng</h2>
    <table class="order-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Sản phẩm</th>
          <th>Khách hàng</th>
          <th>SĐT</th>
          <th>Email</th>
          <th>Ghi chú</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.product_id }}</td>
          <td>{{ order.customer_id }}</td>
          <td>{{ order.phone }}</td>
          <td>{{ order.email }}</td>
          <td>{{ order.note }}</td>
          <td>
            <select
              v-model="order.status"
              @change="updateStatus(order)"
              :class="statusClass(order.status)"
            >
              <option>Chờ xử lý</option>
              <option>Đã xác nhận</option>
              <option>Đang giao</option>
              <option>Hoàn tất</option>
              <option>Đã hủy</option>
            </select>
          </td>
          <td>
            <button class="btn-view" @click="viewOrder(order)" title="Xem chi tiết">
              👁
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const orders = ref([
  {
    id: 1,
    product_id: 101,
    customer_id: 201,
    phone: '0901234567',
    email: 'khachhang1@example.com',
    note: 'Giao buổi sáng',
    status: 'Chờ xử lý'
  },
  {
    id: 2,
    product_id: 102,
    customer_id: 202,
    phone: '0987654321',
    email: 'khachhang2@example.com',
    note: 'Thanh toán khi nhận hàng',
    status: 'Đã xác nhận'
  }
])

function updateStatus(order) {
  console.log(`Cập nhật trạng thái đơn hàng ${order.id} => ${order.status}`)
}

function viewOrder(order) {
  alert(`Chi tiết đơn hàng ID ${order.id}:
Sản phẩm: ${order.product_id}
Khách hàng: ${order.customer_id}
SĐT: ${order.phone}
Email: ${order.email}
Ghi chú: ${order.note}
Trạng thái: ${order.status}`)
}

function statusClass(status) {
  switch (status) {
    case 'Chờ xử lý':
      return 'status-pending'
    case 'Đã xác nhận':
      return 'status-confirmed'
    case 'Đang giao':
      return 'status-shipping'
    case 'Hoàn tất':
      return 'status-completed'
    case 'Đã hủy':
      return 'status-cancelled'
    default:
      return ''
  }
}
</script>

<style scoped>
.orders-container {
  padding: 20px;
  max-width: 1000px;
  margin: auto;
}

.title {
  text-align: center;
  color: #2c3e50;
  font-size: 24px;
  margin-bottom: 20px;
}

.order-table {
  width: 100%;
  border-spacing: 0;
  font-family: 'Segoe UI', sans-serif;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.order-table thead {
  background-color: #f0f4f8;
  color: #333;
}

.order-table th,
.order-table td {
  padding: 14px 16px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #e0e0e0;
}

.order-table tbody tr:hover {
  background-color: #f9fbfc;
}

.order-table select {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 13px;
  background-color: #fefefe;
  outline: none;
}

.order-table button.btn-view {
  padding: 6px 10px;
  font-size: 16px;
  border: none;
  background: #3498db;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.order-table button.btn-view:hover {
  background-color: #2980b9;
}

/* Trạng thái màu sắc */
.status-pending {
  background-color: #fff3cd;
  color: #856404;
}

.status-confirmed {
  background-color: #d1ecf1;
  color: #0c5460;
}

.status-shipping {
  background-color: #cce5ff;
  color: #004085;
}

.status-completed {
  background-color: #d4edda;
  color: #155724;
}

.status-cancelled {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
