import apiService from './api.service'

const OrderService = {
  async getAllOrders() {
    try {
      const response = await apiService.get('/orders')
      return response.data.data
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  },

  async createOrder(orderData) {
    try {
      const response = await apiService.post('/orders', orderData)
      return response.data
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  },

  async getOrderDetail(id) {
    try {
      const response = await apiService.get(`/orders/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching order detail:', error)
      throw error
    }
  },

  async updateOrder(id, orderData) {
    try {
      const response = await apiService.put(`/orders/${id}`, orderData)
      return response.data
    } catch (error) {
      console.error('Error updating order:', error)
      throw error
    }
  },

  async deleteOrder(id) {
    try {
      const response = await apiService.delete(`/orders/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting order:', error)
      throw error
    }
  },

  async updateOrderStatus(id, status) {
    try {
      const response = await apiService.put(`/orders/${id}/status`, { status })
      return response.data
    } catch (error) {
      console.error('Error updating order status:', error)
      throw error
    }
  },

  async getTemporaryOrders() {
    try {
      const response = await apiService.get('/orders/temporary')
      return response.data.data
    } catch (error) {
      console.error('Error fetching temporary orders:', error)
      throw error
    }
  },

  async restoreOrders(ids) {
    try {
      const response = await apiService.put('/orders/temporary', { ids })
      return response.data.data
    } catch (error) {
      console.error('Error restoring orders:', error)
      throw error
    }
  },

  async deleteTemporaryOrders(ids) {
    try {
      const response = await apiService.delete('/orders/temporary', { data: { ids } })
      return response.data.data
    } catch (error) {
      console.error('Error deleting temporary orders:', error)
      throw error
    }
  }
}

export default OrderService