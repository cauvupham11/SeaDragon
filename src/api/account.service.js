import apiService from './apiService';

export const useAccountService = () => {
    
    const getAllAccounts = async () => {
        const token = localStorage.getItem("token");
        try {
            console.log("doing Get ALL");
            const response = await apiService.get('/v1/accounts/list', {}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thay yourToken bằng token thực tế
                },
            });
            console.log(response); // Kiểm tra xem phản hồi trả về có đúng như mong đợi không
            return response.data.data;
        } catch (error) {
            console.error('Error fetching accounts:', error);
            throw error;
        }
    };

    const getDeletedAccounts = async () => {
        try {
            const response = await apiService.get('/v1/accounts/list?deleted=true');
            return response.data;
        } catch (error) {
            console.error('Error fetching deleted accounts:', error);
            throw error;
        }
    };

    const getAccountById = async (id) => {
        try {
            const response = await apiService.get(`/v1/accounts?id=${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching account:', error);
            throw error;
        }
    };

    const createAccount = async (accountData) => {
        const token = localStorage.getItem("token")
        console.log(token);
        
        try {
            const response = await apiService.post('/v1/auth/register', accountData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Thay yourToken bằng token thực tế
                    },
                }

            );
            return response.data;
        } catch (error) {
            console.error('Error creating account:', error);
            throw error;
        }
    };

    const updateAccount = async (id, accountData) => {
        try {
            const response = await apiService.put(`/v1/accounts/${id}`, accountData);
            return response.data;
        } catch (error) {
            console.error('Error updating account:', error);
            throw error;
        }
    };

    const deleteAccount = async (id) => {
        try {
            const response = await apiService.delete(`/v1/accounts/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting account:', error);
            throw error;
        }
    };

    const restoreAccount = async (id) => {
        try {
            const response = await apiService.put(`/v1/accounts/${id}/restore`);
            return response.data;
        } catch (error) {
            console.error('Error restoring account:', error);
            throw error;
        }
    };

    const setAccountRoles = async (userId, roles) => {
        try {
            // Lấy token từ localStorage
            const token = localStorage.getItem("token");
    
            // Kiểm tra hợp lệ
            if (!token) {
                console.error("❌ Không tìm thấy token. Vui lòng đăng nhập lại.");
                return;
            }
    
            if (!userId || typeof userId !== 'number') {
                console.error("❌ userId không hợp lệ:", userId);
                return;
            }
    
            // Chuyển Proxy Array thành Array thuần và đảm bảo roles là mảng các chuỗi
            const rolesArray = Array.isArray(roles) ? Array.from(roles) : [];
            const rolesArrayAsString = rolesArray.map(role => String(role)); // Chuyển tất cả giá trị thành chuỗi
    
            if (rolesArrayAsString.length === 0 || !rolesArrayAsString.every(r => typeof r === 'string')) {
                console.error("❌ roles phải là mảng các chuỗi hợp lệ:", rolesArrayAsString);
                return;
            }
    
            // Log ra thông tin gửi lên server
            console.log("🚀 Gửi yêu cầu cập nhật roles:");
            console.log("✅ User ID:", userId);
            console.log("✅ Roles:", rolesArrayAsString);
    
            // Gọi API PUT
            const response = await apiService.put(`/v1/accounts`, {
                userId,
                roles: rolesArrayAsString
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            console.log("✅ Cập nhật roles thành công:", response.data);
            return response.data;
    
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật roles:", error.response?.data || error.message);
            throw error;
        }
    };    
    return {
        getAllAccounts,
        getDeletedAccounts,
        getAccountById,
        createAccount,
        updateAccount,
        deleteAccount,
        restoreAccount,
        setAccountRoles
    };
};