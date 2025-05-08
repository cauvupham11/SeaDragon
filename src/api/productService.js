import apiService from './apiService';

const ProductService = {
    async getAllProducts(categoryId = '') {
        try {
            const response = await apiService.get(`/v1/products?categoryId=${categoryId}`);
            console.log('Dữ liệu sản phẩm trả về từ API:', response?.data); 

            if (response && response.data && response.data.data) {
                return response.data.data;
            } else {
                console.warn('Dữ liệu sản phẩm không hợp lệ:', response);
                return [];
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            if (error.response) {
                console.error('Chi tiết lỗi:', error.response.data);
            }
            throw error;
        }
    },

    async getProductById(id) {
        try {
            const response = await apiService.get(`/products/${id}`);
            return response?.data?.data ?? null;
        } catch (error) {
            console.error('Error fetching product:', error);
            if (error.response) {
                console.error('Chi tiết lỗi:', error.response.data);
            }
            throw error;
        }
    },

    async createProduct(productData) {
        try {
            console.log("Produc neee",productData)
            const token = localStorage.getItem("token")
            console.log(token)
         
            const response = await apiService.post(`/v1/products`,productData,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response?.data?.data ?? null;
        } catch (error) {
            console.error('Error creating product:', error);
            if (error.response) {
                console.error('Chi tiết lỗi:', error.response.data);
            }
            throw error;
        }
    },

    async updateProduct(id, productData) {
        try {
            const formData = new FormData();
            Object.keys(productData).forEach(key => {
                if (key === 'image' && productData[key] instanceof File) {
                    formData.append('image', productData[key]);
                } else {
                    formData.append(key, productData[key]);
                }
            });

            const response = await apiService.put(`/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response?.data?.data ?? null;
        } catch (error) {
            console.error('Error updating product:', error);
            if (error.response) {
                console.error('Chi tiết lỗi:', error.response.data);
            }
            throw error;
        }
    },

    async softDeleteProducts(ids) {
        try {
            const response = await apiService.delete('/products/temporary', {
                data: { ids }
            });

            return response?.data?.data ?? null;
        } catch (error) {
            console.error('Error soft deleting products:', error);
            if (error.response) {
                console.error('Chi tiết lỗi:', error.response.data);
            }
            throw error;
        }
    },

    async restoreProduct(id) {
        try {
            const response = await apiService.put(`/products/temporary/${id}`);
            return response?.data?.data ?? null;
        } catch (error) {
            console.error('Error restoring product:', error);
            if (error.response) {
                console.error('Chi tiết lỗi:', error.response.data);
            }
            throw error;
        }
    },

    async deleteProducts(ids) {
        try {
            const response = await apiService.delete('/v1/products', {
                data: { ids }
            });

            return response?.data?.data ?? null;
        } catch (error) {
            console.error('Error deleting products:', error);
            if (error.response) {
                console.error('Chi tiết lỗi:', error.response.data);
            }
            throw error;
        }
    }
};

export default ProductService;
