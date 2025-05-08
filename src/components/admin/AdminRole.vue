<template>
  <div class="admin-role">
    <h1>Quản lý phân quyền</h1>
    <button class="btn-add" @click="showAddRoleForm">Thêm quyền cho tài khoản</button>
    <table class="role-table">
      <thead>
        <tr>
          <th>Tên tài khoản</th>
          <th>Email</th>
          <th>Vai trò</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <div class="role-badges">
              <span v-for="role in user.roles" :key="role.id" class="role-badge" :class="getRoleClass(role.name)">
                {{ role.name }}
              </span>
            </div>
          </td>
          <td class="action-buttons">
            <button class="btn-edit" @click="editUserRoles(user)">Sửa </button>
            <button class="btn-delete" @click="confirmRemoveAllRoles(user.id)">Xóa </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showRoleForm" class="modal-overlay">
      <div class="role-form-dialog">
        <div class="form-header">
          <h2>{{ formTitle }}</h2>
          <button class="btn-close" @click="closeForm">×</button>
        </div>
        <div class="form-content">
          <form @submit.prevent="saveUserRoles">
            <div class="form-group">
              <label for="user_id">Tài khoản:</label>
              <select v-model="roleForm.user_id" id="user_id" required>
                <option value="" disabled>Chọn tài khoản</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.username }} ({{ user.email }})
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Vai trò:</label>
              <div class="role-selection">
                <div v-for="role in ROLE_CONSTANT" :key="role.id" class="role-option"
                  :class="{ 'selected': selectedRoles.includes(role.id) }" @click="toggleRole(role.id)">
                  <div class="role-checkbox">
                    <input type="checkbox" :id="`role_${role.id}`" :checked="selectedRoles.includes(role.id)">
                    <label :for="`role_${role.id}`"></label>
                  </div>
                  <div class="role-info">
                    <div class="role-name">{{ role.name }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-submit">{{ formSubmitButton }}</button>
              <button type="button" class="btn-cancel" @click="closeForm">Hủy</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="showDeleteConfirm" class="modal-overlay">
      <div class="confirm-dialog">
        <p>Bạn có chắc chắn muốn xóa tất cả quyền của người dùng này?</p>
        <div class="confirm-actions">
          <button class="btn-confirm" @click="removeAllRoles">Có</button>
          <button class="btn-cancel" @click="cancelDelete">Không</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useAccountService } from '../../api/account.service.js'
import { ROLE_CONSTANT } from '../../constant/role.constant.js'

const accountService = useAccountService(); // Đặt ở đầu script setup rồi tái sử dụng

let users = ref([]);
onMounted(async () => {
  users.value = await accountService.getAllAccounts();
  console.log('Dữ liệu người dùng:', users.value);
});

const roleForm = ref({
  id: '',
  isActive: true,
});

const selectedRoles = ref([]);  // Đảm bảo selectedRoles là một mảng
const formTitle = ref('Thêm quyền cho tài khoản');
const formSubmitButton = ref('Thêm quyền');
const showRoleForm = ref(false);
const showDeleteConfirm = ref(false);
const deleteUserId = ref(null);

const getRoleClass = (roleName) => {
  const roleClasses = {
    'Admin': 'role-admin',
    'Editor': 'role-editor',
    'User': 'role-user',
    'Moderator': 'role-moderator',
    'Guest': 'role-guest',
  };
  return roleClasses[roleName] || '';
};

const showAddRoleForm = () => {
  resetForm();
  roleForm.value.user_id = '';
  showRoleForm.value = true;
};

const editUserRoles = (user) => {
  roleForm.value.user_id = user.id;
  roleForm.value.isActive = user.isActive;

  if (!Array.isArray(user.roles)) {
    console.warn("User roles is not an array:", user.roles);
    selectedRoles.value = [];
  } else {
    selectedRoles.value = user.roles
      .filter(role => role && (role.id || role.name))
      .map(role => role.id); // hoặc role.id nếu bạn muốn dùng id
  }

  formTitle.value = 'Sửa quyền người dùng';
  formSubmitButton.value = 'Cập nhật quyền';
  showRoleForm.value = true;
};

const toggleRole = (roleName) => {
  const index = selectedRoles.value.indexOf(roleName);
  if (index === -1) {
    selectedRoles.value.push(roleName);
  } else {
    selectedRoles.value.splice(index, 1);
  }
};

const saveUserRoles = async () => {
  const userId = parseInt(roleForm.value.user_id);
  const userIndex = users.value.findIndex(u => u.id === userId);

  // Chuyển Proxy Array thành Array thuần trước khi xử lý
  const selectedRolesArray = Array.isArray(selectedRoles.value) ? Array.from(selectedRoles.value) : [];

  // Chuyển ID vai trò thành tên vai trò
  const updatedRoles = selectedRolesArray
    .map(roleId => {
      const role = ROLE_CONSTANT.find(r => r.id === roleId); // Lấy đối tượng vai trò từ ROLE_CONSTANT
      if (!role) {
        console.warn(`Không tìm thấy role với id '${roleId}' trong ROLE_CONSTANT`);
        return null;
      }
      return { id: role.id, name: role.name }; // Sử dụng tên vai trò thay vì id
    })
    .filter(role => role !== null);

  // Lấy tên các vai trò từ mảng updatedRoles
  const roleNames = updatedRoles.map(role => role.name); // Lấy tên vai trò

  // In dữ liệu gửi về backend
  console.log("Đang gửi dữ liệu lên backend:");
  console.log("User ID:", userId);
  console.log("Role Names:", roleNames); // In tên vai trò

  try {
    // Gửi yêu cầu PUT với tên vai trò
    await accountService.setAccountRoles(userId, roleNames);

    // Cập nhật lại nếu thành công
    if (userIndex !== -1) {
      users.value[userIndex].roles = updatedRoles;
      users.value[userIndex].isActive = roleForm.value.isActive;
    }

    closeForm();
  } catch (error) {
    console.error("Lỗi khi cập nhật quyền:", error);
    alert("Cập nhật quyền thất bại. Vui lòng thử lại.");
  }
  closeForm();
};
const confirmRemoveAllRoles = (userId) => {
  deleteUserId.value = userId;
  showDeleteConfirm.value = true;
};

const removeAllRoles = () => {
  const userIndex = users.value.findIndex(u => u.id === deleteUserId.value);
  if (userIndex !== -1) {
    users.value[userIndex].roles = [];
  }

  showDeleteConfirm.value = false;
  deleteUserId.value = null;
};

const cancelDelete = () => {
  showDeleteConfirm.value = false;
  deleteUserId.value = null;
};

const closeForm = () => {
  showRoleForm.value = false;
  resetForm();
};

const resetForm = () => {
  roleForm.value = { user_id: '', isActive: true };
  selectedRoles.value = [];
  formTitle.value = 'Thêm quyền cho tài khoản';
  formSubmitButton.value = 'Thêm quyền';
};

</script>

<style scoped>
.admin-role {
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

.role-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.role-table th,
.role-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.role-table th {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.role-table tr {
  transition: background 0.2s;
}

.role-table tr:hover {
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

.role-form-dialog {
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
  from {
    transform: translateY(-50px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
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
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #dfe6e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
  outline: none;
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

.role-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.role-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
}

.role-admin {
  background: rgba(231, 76, 60, 0.15);
  color: #c0392b;
}

.role-editor {
  background: rgba(52, 152, 219, 0.15);
  color: #2980b9;
}

.role-user {
  background: rgba(46, 204, 113, 0.15);
  color: #27ae60;
}

.role-moderator {
  background: rgba(155, 89, 182, 0.15);
  color: #8e44ad;
}

.role-guest {
  background: rgba(149, 165, 166, 0.15);
  color: #7f8c8d;
}

.role-selection {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #dfe6e9;
  border-radius: 8px;
}

.role-option {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #ecf0f1;
  cursor: pointer;
  transition: background 0.2s;
}

.role-option:last-child {
  border-bottom: none;
}

.role-option:hover {
  background: #f8f9fa;
}

.role-option.selected {
  background: rgba(52, 152, 219, 0.1);
}

.role-checkbox {
  margin-right: 15px;
}

.role-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
}

.role-info {
  flex: 1;
}

.role-name {
  font-weight: 600;
  margin-bottom: 5px;
  color: #2c3e50;
}

.role-description {
  font-size: 0.9rem;
  color: #7f8c8d;
}
</style>