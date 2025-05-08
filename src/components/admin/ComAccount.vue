<template>
  <div class="admin-account">
    <h1>Quản lý tài khoản</h1>

    <!-- Tab Navigation -->
    <div class="tab-navigation">
      <button class="tab-button" :class="{ active: activeTab === 'active' }" @click="switchTab('active')">
        Tài khoản đang hoạt động
      </button>
      <button class="tab-button" :class="{ active: activeTab === 'trash' }" @click="switchTab('trash')">
        Thùng rác
      </button>
    </div>

    <!-- Action buttons -->
    <div class="action-bar">
      <button class="btn-add" @click="showAddAccountForm" v-if="activeTab === 'active'">Thêm tài khoản</button>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Tìm kiếm tài khoản...">
      </div>
    </div>

    <!-- Active Accounts Table -->
    <table class="account-table" v-if="activeTab === 'active'">
      <thead>
        <tr>
          <th>Tên tài khoản</th>
          <th>Email</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="account in filteredAccounts" :key="account.id">
          <td>{{ account.username }}</td>
          <td>{{ account.email }}</td>
          <td class="action-buttons">
            <button class="btn-edit" @click="editAccount(account)">Sửa</button>
            <button class="btn-delete" @click="confirmSoftDelete(account.id)">Xóa</button>
          </td>
        </tr>
        <tr v-if="filteredAccounts.length === 0">
          <td colspan="3" class="no-data">Không có tài khoản nào</td>
        </tr>
      </tbody>
    </table>
    <!-- Trash Table -->
    <table class="account-table" v-if="activeTab === 'trash'">
      <thead>
        <tr>
          <th>Tên tài khoản</th>
          <th>Email</th>
          <th>Ngày xóa</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="account in filteredTrashAccounts" :key="account.id">
          <td>{{ account.username }}</td>
          <td>{{ account.email }}</td>
          <td>{{ formatDate(account.deletedAt) }}</td>
          <td class="action-buttons">
            <button class="btn-restore" @click="confirmRestore(account.id)">Khôi phục</button>
            <button class="btn-hard-delete" @click="confirmHardDelete(account.id)">Xóa vĩnh viễn</button>
          </td>
        </tr>
        <tr v-if="filteredTrashAccounts.length === 0">
          <td colspan="4" class="no-data">Thùng rác trống</td>
        </tr>
      </tbody>
    </table>

    <!-- Account Form Modal -->
    <div v-if="showAccountForm" class="modal-overlay">
      <div class="account-form-dialog">
        <div class="form-header">
          <h2>{{ formTitle }}</h2>
          <button class="btn-close" @click="closeForm">×</button>
        </div>
        <div class="form-content">
          <form @submit.prevent="saveAccount">
            <div class="form-group">
              <label for="username">Tên tài khoản:</label>
              <input type="text" v-model="accountForm.username" id="username" required>
            </div>

            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" v-model="accountForm.email" id="email" required>
            </div>

            <div class="form-group" v-if="!accountForm.id">
              <label for="password">Mật khẩu:</label>
              <input type="password" v-model="accountForm.password" id="password" :required="!accountForm.id">
            </div>
            <div class="form-group" v-if="!accountForm.id">
              <label for="confirmPassword">Xác nhận mật khẩu:</label>
              <input type="password" v-model="accountForm.confirmPassword" id="confirmPassword" required>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-submit">{{ formSubmitButton }}</button>
              <button type="button" class="btn-cancel" @click="closeForm">Hủy</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Soft Delete Confirmation Dialog -->
    <div v-if="showSoftDeleteConfirm" class="modal-overlay">
      <div class="confirm-dialog">
        <p>Bạn có chắc chắn muốn xóa tài khoản này?</p>
        <p class="confirm-note">Tài khoản sẽ được chuyển vào thùng rác và có thể khôi phục sau.</p>
        <div class="confirm-actions">
          <button class="btn-confirm" @click="softDeleteAccount">Có, xóa</button>
          <button class="btn-cancel" @click="cancelAction">Không</button>
        </div>
      </div>
    </div>

    <!-- Hard Delete Confirmation Dialog -->
    <div v-if="showHardDeleteConfirm" class="modal-overlay">
      <div class="confirm-dialog">
        <p>Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản này?</p>
        <p class="confirm-note confirm-warning">Hành động này không thể hoàn tác!</p>
        <div class="confirm-actions">
          <button class="btn-confirm" @click="hardDeleteAccount">Có, xóa vĩnh viễn</button>
          <button class="btn-cancel" @click="cancelAction">Không</button>
        </div>
      </div>
    </div>

    <!-- Restore Confirmation Dialog -->
    <div v-if="showRestoreConfirm" class="modal-overlay">
      <div class="confirm-dialog">
        <p>Bạn có chắc chắn muốn khôi phục tài khoản này?</p>
        <div class="confirm-actions">
          <button class="btn-restore confirm" @click="restoreAccount">Có, khôi phục</button>
          <button class="btn-cancel" @click="cancelAction">Không</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Trong <script setup>
import { ref, computed, onMounted } from 'vue';
import { useAccountService } from '@/api/account.service';

const accountService = useAccountService();

const formTitle = computed(() => accountForm.value.id ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản');
const formSubmitButton = computed(() => accountForm.value.id ? 'Cập nhật' : 'Thêm mới');

const accounts = ref([]);
const loading = ref(false);
const error = ref(null);

const activeTab = ref('active');
const searchQuery = ref('');
const accountForm = ref({
  id: null,
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const showAccountForm = ref(false);
const showSoftDeleteConfirm = ref(false);
const showHardDeleteConfirm = ref(false);
const showRestoreConfirm = ref(false);
const actionAccountId = ref(null);

const activeAccounts = computed(() => {
  return accounts.value.filter(account => !account.isDeleted);
});

const trashAccounts = computed(() => {
  return accounts.value.filter(account => account.isDeleted);
});

const filteredAccounts = computed(() => {
  if (!searchQuery.value) return activeAccounts.value;
  const query = searchQuery.value.toLowerCase();
  return activeAccounts.value.filter(account =>
    account.username.toLowerCase().includes(query) ||
    account.email.toLowerCase().includes(query)
  );
});

const filteredTrashAccounts = computed(() => {
  if (!searchQuery.value) return trashAccounts.value;
  const query = searchQuery.value.toLowerCase();
  return trashAccounts.value.filter(account =>
    account.username.toLowerCase().includes(query) ||
    account.email.toLowerCase().includes(query)
  );
});

const fetchAccounts = async () => {
  try {
    loading.value = true;
    const response = await accountService.getAllAccounts();
    // Lọc chỉ các tài khoản chưa bị xóa
    accounts.value = Array.isArray(response) ? response.filter(account => !account.isDeleted) : response.data || [];
  } catch (err) {
    error.value = err.message || 'Lỗi khi tải danh sách tài khoản';
  } finally {
    loading.value = false;
  }
};

const fetchDeletedAccounts = async () => {
  try {
    loading.value = true;
    // Lọc tài khoản đã xóa
    const deletedAccounts = accounts.value.filter(account => account.isDeleted);
    // Cập nhật lại danh sách tài khoản đã xóa
    accounts.value = deletedAccounts;
  } catch (err) {
    error.value = err.message || 'Lỗi khi tải danh sách tài khoản đã xóa';
  } finally {
    loading.value = false;
  }
};
const switchTab = async (tab) => {
  activeTab.value = tab;
  searchQuery.value = '';
  tab === 'active' ? await fetchAccounts() : await fetchDeletedAccounts();
};

const showAddAccountForm = () => {
  resetForm();
  showAccountForm.value = true;
};

const editAccount = async (account) => {
  try {
    const accountDetails = await accountService.getAccountById(account.id);
    accountForm.value = {
      id: accountDetails.id,
      username: accountDetails.username,
      email: accountDetails.email,
      password: '',
      confirmPassword: '',
    };
    showAccountForm.value = true;
  } catch (err) {
    error.value = err.message || 'Lỗi khi tải thông tin tài khoản';
  }
};

const saveAccount = async () => {
  try {
    if (!accountForm.value.id && accountForm.value.password !== accountForm.value.confirmPassword) {
      error.value = 'Mật khẩu và xác nhận mật khẩu không khớp';
      return;
    }

    const payload = {
      username: accountForm.value.username,
      email: accountForm.value.email,
    };

    if (!accountForm.value.id) {
      payload.password = accountForm.value.password;
      await accountService.createAccount(payload);
    } else {
      await accountService.updateAccount(accountForm.value.id, payload);
    }

    await fetchAccounts();
    closeForm();
  } catch (err) {
    error.value = err.message || 'Lỗi khi lưu tài khoản';
  }
};
const confirmSoftDelete = (id) => {
  console.log("Confirm delete for account with ID:", id); // Debug line
  actionAccountId.value = id;
  showSoftDeleteConfirm.value = true;
};
const confirmHardDelete = (id) => {
  actionAccountId.value = id;
  showHardDeleteConfirm.value = true;
};

const confirmRestore = (id) => {
  actionAccountId.value = id;
  showRestoreConfirm.value = true;
};

const softDeleteAccount = async () => {
  if (!actionAccountId.value) {
    console.error("Không có ID tài khoản để xóa.");
    return;
  }
  console.log("Đang thực hiện xóa tài khoản ID:", actionAccountId.value); // Kiểm tra ID

  try {
    // Tìm tài khoản cần xóa
    const accountToDelete = accounts.value.find(account => account.id === actionAccountId.value);

    if (!accountToDelete) {
      console.error("Tài khoản không tìm thấy.");
      return;
    }

    // Đánh dấu tài khoản là đã xóa
    accountToDelete.isDeleted = true;

    // Cập nhật lại danh sách tài khoản
    await fetchAccounts();
    await fetchDeletedAccounts();
    
    // Đóng hộp thoại xác nhận
    cancelAction(); 

  } catch (err) {
    error.value = err.message || 'Lỗi khi xóa tài khoản';
  }
};

const hardDeleteAccount = async () => {
  try {
    await accountService.hardDeleteAccount(actionAccountId.value);
    await fetchDeletedAccounts();
    cancelAction();
  } catch (err) {
    error.value = err.message || 'Lỗi khi xóa vĩnh viễn tài khoản';
  }
};

const restoreAccount = async () => {
  try {
    await accountService.restoreAccount(actionAccountId.value);
    await fetchDeletedAccounts();
    cancelAction();
  } catch (err) {
    error.value = err.message || 'Lỗi khi khôi phục tài khoản';
  }
};

const cancelAction = () => {
  showSoftDeleteConfirm.value = false;
  showHardDeleteConfirm.value = false;
  showRestoreConfirm.value = false;
};

const closeForm = () => {
  showAccountForm.value = false;
  resetForm();
};

const resetForm = () => {
  accountForm.value = {
    id: null,
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
};

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString();
};

onMounted(fetchAccounts);
</script>

<style scoped>
.admin-account {
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

.tab-navigation {
  display: flex;
  margin-bottom: 20px;
  background: white;
  border-radius: 16px;
  padding: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.tab-button {
  flex: 1;
  padding: 15px;
  border: none;
  background: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
  color: #7f8c8d;
}

.tab-button.active {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 10px;
}

.search-bar {
  flex: 1;
  max-width: 300px;
}

.search-bar input {
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  transition: box-shadow 0.2s;
}

.search-bar input:focus {
  outline: none;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
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
  display: inline-block;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(46, 204, 113, 0.3);
}

.account-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.account-table th,
.account-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.account-table th {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.account-table tr {
  transition: background 0.2s;
}

.account-table tr:hover {
  background-color: #f8f9fa;
}

.no-data {
  text-align: center;
  color: #7f8c8d;
  padding: 30px !important;
  font-style: italic;
}

.role-admin {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
}

.role-moderator {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
}

.role-editor {
  background: rgba(155, 89, 182, 0.1);
  color: #9b59b6;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
}

.role-user {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
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

.btn-restore {
  background: linear-gradient(45deg, #2ecc71, #27ae60);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: transform 0.2s;
}

.btn-restore:hover {
  transform: translateY(-2px);
}

.btn-restore.confirm {
  padding: 10px 24px;
  font-weight: 600;
}

.btn-hard-delete {
  background: linear-gradient(45deg, #d35400, #c0392b);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: transform 0.2s;
}

.btn-hard-delete:hover {
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

.account-form-dialog {
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
  margin-bottom: 15px;
}

.confirm-note {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 15px;
}

.confirm-warning {
  color: #e74c3c;
  font-weight: 600;
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
</style>