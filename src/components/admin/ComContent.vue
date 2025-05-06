<template>
  <div class="admin-wrapper">
    
    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Bar -->
      <div class="top-bar">
        <div class="top-bar-left">
          <h2>Quản lý nội dung</h2>
        </div>
      </div>

      <!-- Content Area -->
      <div class="content-area">
        <!-- Header with Add Button -->
        <div class="content-header">
          <button class="add-button" @click="showAddModal = true">
            <span class="icon"></span> Thêm nội dung mới
          </button>
          <button class="toggle-trash-button" @click="showTrash = !showTrash">
            <span class="icon"></span> {{ showTrash ? 'Quay lại phần chính' : 'Xem thùng rác' }}
          </button>
        </div>

        <!-- ADD/EDIT MODAL -->
        <transition name="modal">
          <div v-if="showAddModal" class="modal">
            <div class="modal-content">
              <div class="modal-header">
                <h3>{{ editMode ? 'Sửa nội dung' : 'Thêm nội dung mới' }}</h3>
                <button class="close-button" @click="closeModal">×</button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>Tiêu đề:</label>
                  <input type="text" v-model="newContent.title" placeholder="Nhập tên nội dung">
                </div>
                <div class="form-group">
                  <label>Nội dung:</label>
                  <input type="text" v-model="newContent.content" placeholder="Nhập nội dung">
                </div>
                <div class="form-group">
                  <label>Ngày đăng:</label>
                  <input type="text" v-model="newContent.date" placeholder="VD: 19/07/2024">
                </div>
                <div class="form-group">
                  <label>Ảnh:</label>
                  <input type="file" @change="handleImageUpload" accept="image/*">
                  <img v-if="newContent.image" :src="newContent.image" alt="Preview" class="image-preview">
                </div>
              </div>
              <div class="modal-footer">
                <button class="save-button" @click="saveContent">
                  <span class="icon">💾</span> {{ editMode ? 'Lưu' : 'Thêm' }}
                </button>
                <button class="cancel-button" @click="closeModal">
                  <span class="icon">✖</span> Hủy
                </button>
              </div>
            </div>
          </div>
        </transition>

        <!-- VIEW DETAILS MODAL -->
        <transition name="modal">
          <div v-if="showViewModal" class="modal">
            <div class="modal-content">
              <div class="modal-header">
                <h3>Chi tiết nội dung</h3>
                <button class="close-button" @click="closeViewModal">×</button>
              </div>
              <div class="modal-body">
                <div class="detail-group">
                  <label>ID:</label>
                  <p>{{ selectedContent.id }}</p>
                </div>
                <div class="detail-group">
                  <label>Tiêu đề:</label>
                  <p>{{ selectedContent.title }}</p>
                </div>
                <div class="detail-group">
                  <label>Nội dung:</label>
                  <p>{{ selectedContent.content }}</p>
                </div>
                <div class="detail-group">
                  <label>Ngày đăng:</label>
                  <p>{{ selectedContent.date }}</p>
                </div>
                <div class="detail-group">
                  <label>Ảnh:</label>
                  <img v-if="selectedContent.image" :src="selectedContent.image" alt="Content Image" class="content-image">
                  <p v-else>Không có ảnh</p>
                </div>
              </div>
              <div class="modal-footer">
                <button class="close-button" @click="closeViewModal">
                  <span class="icon">✖</span> Đóng
                </button>
              </div>
            </div>
          </div>
        </transition>

        <!-- Active Content Section -->
        <div v-if="!showTrash">
          <!-- SEARCH BAR -->
          <div class="search-bar">
            <span class="search-icon">🔍</span>
            <input type="text" v-model="searchQuery" placeholder="Tìm kiếm bài viết..." @input="filterContent">
          </div>

          <!-- CONTENT LIST -->
          <div class="content-list">
            <div class="bulk-actions">
              <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
              <label>Chọn tất cả</label>
              <button class="bulk-delete-button" @click="bulkDelete" :disabled="!selectedItems.length">
                <span class="icon"></span> Xóa nhiều dòng
              </button>
              <button class="complete-delete-button" @click="bulkCompleteDelete" :disabled="!selectedItems.length">
                <span class="icon"></span> Xóa hoàn toàn
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" v-model="selectAll" @change="toggleSelectAll" /></th>
                  <th>ID</th>
                  <th>Ảnh</th>
                  <th>Tiêu đề</th>
                  <th>Nội dung</th>
                  <th>Ngày đăng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in filteredContent" :key="index">
                  <td><input type="checkbox" v-model="selectedItems" :value="index" /></td>
                  <td>{{ item.id }}</td>
                  <td>
                    <img v-if="item.image" :src="item.image" alt="Thumbnail" class="thumbnail">
                    <span v-else>Không có ảnh</span>
                  </td>
                  <td>{{ item.title }}</td>
                  <td>{{ item.content }}</td>
                  <td>{{ item.date }}</td>
                  <td class="action-buttons">
                    <button class="action-button view-button" @click="viewContent(item)">
                      <span class="icon">👁️</span>
                    </button>
                    <button class="action-button edit-button" @click="editContent(item, index)">
                      <span class="icon">✏️</span>
                    </button>
                    <button class="action-button delete-button" @click="deleteContent(index)">
                      <span class="icon"></span> Xóa
                    </button>
                    <button class="action-button complete-delete-button" @click="completeDelete(index)">
                      <span class="icon"></span> Xóa hoàn toàn
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Trash Bin Section -->
        <div v-else class="trash-section">
          <h3>Thùng rác</h3>
          <div class="bulk-actions">
            <input type="checkbox" v-model="selectAllTrash" @change="toggleSelectAllTrash" />
            <label>Chọn tất cả</label>
            <button class="bulk-restore-button" @click="bulkRestore" :disabled="!selectedTrashItems.length">
              <span class="icon">↻</span> Khôi phục tất cả
            </button>
            <button class="bulk-complete-delete-button" @click="bulkCompleteDeleteTrash" :disabled="!selectedTrashItems.length">
              <span class="icon"></span> Xóa vĩnh viễn
            </button>
          </div>
          <table v-if="deletedContent.length">
            <thead>
              <tr>
                <th><input type="checkbox" v-model="selectAllTrash" @change="toggleSelectAllTrash" /></th>
                <th>ID</th>
                <th>Ảnh</th>
                <th>Tên nội dung</th>
                <th>Nội dung</th>
                <th>Ngày đăng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in deletedContent" :key="`deleted-${index}`">
                <td><input type="checkbox" v-model="selectedTrashItems" :value="index" /></td>
                <td>{{ item.id }}</td>
                <td>
                  <img v-if="item.image" :src="item.image" alt="Thumbnail" class="thumbnail">
                  <span v-else>Không có ảnh</span>
                </td>
                <td>{{ item.title }}</td>
                <td>{{ item.content }}</td>
                <td>{{ item.date }}</td>
                <td class="action-buttons">
                  <button class="restore-button" @click="restoreContent(index)">
                    <span class="icon">↻</span> Khôi phục
                  </button>
                  <button class="complete-delete-button" @click="completeDeleteTrash(index)">
                    <span class="icon"></span> Xóa vĩnh viễn
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else class="empty-trash">Thùng rác trống</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentManagement",
  data() {
    return {
      searchQuery: "",
      showAddModal: false,
      showViewModal: false,
      showTrash: false,
      editMode: false,
      editIndex: null,
      incidentReport: "",
      selectedContent: null,
      content: [
        {
          id: 1,
          title: "Đặt khách hàng lên hàng đầu",
          content: "Đội ngũ Finad",
          date: "19/07/2024",
          image: null
        }
      ],
      filteredContent: [],
      deletedContent: [],
      selectedItems: [],
      selectAll: false,
      selectedTrashItems: [],
      selectAllTrash: false,
      newContent: {
        id: null,
        title: "",
        content: "",
        date: "",
        image: null
      }
    };
  },
  created() {
    this.filteredContent = [...this.content];
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newContent.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveContent() {
      if (this.editMode) {
        this.content[this.editIndex] = { ...this.newContent };
      } else {
        this.newContent.id = this.content.length + 1;
        this.content.push({ ...this.newContent });
      }
      this.filteredContent = [...this.content];
      this.closeModal();
    },
    editContent(item, index) {
      this.editMode = true;
      this.editIndex = index;
      this.newContent = { ...item };
      this.showAddModal = true;
    },
    viewContent(item) {
      this.selectedContent = { ...item };
      this.showViewModal = true;
    },
    deleteContent(index) {
      const item = this.content.splice(index, 1)[0];
      this.deletedContent.push(item);
      this.filteredContent = [...this.content];
      this.selectedItems = this.selectedItems.filter(i => i !== index);
      this.adjustSelectedIndices(index);
    },
    completeDelete(index) {
      this.content.splice(index, 1);
      this.filteredContent = [...this.content];
      this.selectedItems = this.selectedItems.filter(i => i !== index);
      this.adjustSelectedIndices(index);
    },
    completeDeleteTrash(index) {
      this.deletedContent.splice(index, 1);
      this.selectedTrashItems = this.selectedTrashItems.filter(i => i !== index);
      this.adjustSelectedTrashIndices(index);
    },
    bulkDelete() {
      this.selectedItems.sort((a, b) => b - a).forEach(index => {
        const item = this.content.splice(index, 1)[0];
        this.deletedContent.push(item);
      });
      this.filteredContent = [...this.content];
      this.selectedItems = [];
      this.selectAll = false;
    },
    bulkCompleteDelete() {
      this.selectedItems.sort((a, b) => b - a).forEach(index => {
        this.content.splice(index, 1);
      });
      this.filteredContent = [...this.content];
      this.selectedItems = [];
      this.selectAll = false;
    },
    bulkCompleteDeleteTrash() {
      this.selectedTrashItems.sort((a, b) => b - a).forEach(index => {
        this.deletedContent.splice(index, 1);
      });
      this.selectedTrashItems = [];
      this.selectAllTrash = false;
    },
    bulkRestore() {
      this.selectedTrashItems.sort((a, b) => b - a).forEach(index => {
        const item = this.deletedContent.splice(index, 1)[0];
        this.content.push(item);
      });
      this.filteredContent = [...this.content];
      this.selectedTrashItems = [];
      this.selectAllTrash = false;
    },
    restoreContent(index) {
      const item = this.deletedContent.splice(index, 1)[0];
      this.content.push(item);
      this.filteredContent = [...this.content];
      this.selectedTrashItems = this.selectedTrashItems.filter(i => i !== index);
      this.adjustSelectedTrashIndices(index);
    },
    filterContent() {
      const query = this.searchQuery.toLowerCase();
      this.filteredContent = this.content.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.content.toLowerCase().includes(query)
      );
    },
    closeModal() {
      this.showAddModal = false;
      this.editMode = false;
      this.editIndex = null;
      this.newContent = {
        id: null,
        title: "",
        content: "",
        date: "",
        image: null
      };
    },
    closeViewModal() {
      this.showViewModal = false;
      this.selectedContent = null;
    },
    toggleSelectAll() {
      this.selectedItems = this.selectAll ? this.content.map((_, index) => index) : [];
    },
    toggleSelectAllTrash() {
      this.selectedTrashItems = this.selectAllTrash ? this.deletedContent.map((_, index) => index) : [];
    },
    adjustSelectedIndices(deletedIndex) {
      this.selectedItems = this.selectedItems.map(i => i > deletedIndex ? i - 1 : i).filter(i => i !== deletedIndex);
    },
    adjustSelectedTrashIndices(deletedIndex) {
      this.selectedTrashItems = this.selectedTrashItems.map(i => i > deletedIndex ? i - 1 : i).filter(i => i !== deletedIndex);
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', Arial, sans-serif;
}

.admin-wrapper {
  display: flex;
  min-height: 100vh;
  background-color: #f1f5f9;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.top-bar-left h2 {
  font-size: 24px;
  color: #1e293b;
}

.content-area {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.content-header {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-button, .toggle-trash-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.3s, transform 0.1s;
}

.add-button {
  background-color: #3b82f6;
  color: white;
}

.add-button:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.toggle-trash-button {
  background-color: #6b7280;
  color: white;
}

.toggle-trash-button:hover {
  background-color: #4b5563;
  transform: translateY(-1px);
}

.search-bar {
  margin-bottom: 20px;
  position: relative;
}

.search-bar input {
  width: 100%;
  padding: 12px 15px 12px 40px;
  font-size: 15px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #f9fafb;
  outline: none;
  transition: border-color 0.3s;
}

.search-bar input:focus {
  border-color: #3b82f6;
}

.search-bar input::placeholder {
  color: #9ca3af;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 16px;
  color: #9ca3af;
}

.bulk-actions {
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.bulk-delete-button, .complete-delete-button, .bulk-restore-button, .bulk-complete-delete-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.bulk-delete-button, .complete-delete-button, .bulk-complete-delete-button {
  background-color: #ef4444;
  color: white;
}

.bulk-delete-button:hover, .complete-delete-button:hover, .bulk-complete-delete-button:hover {
  background-color: #dc2626;
}

.bulk-restore-button {
  background-color: #10b981;
  color: white;
}

.bulk-restore-button:hover {
  background-color: #059669;
}

.bulk-delete-button:disabled, .complete-delete-button:disabled, .bulk-restore-button:disabled, .bulk-complete-delete-button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

.content-list, .trash-section {
  border-radius: 8px;
  overflow-x: auto;
}

.trash-section h3 {
  font-size: 20px;
  color: #1e293b;
  margin-bottom: 15px;
}

.empty-trash {
  text-align: center;
  color: #6b7280;
  font-size: 16px;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 14px 20px;
  text-align: left;
  font-size: 15px;
  color: #1e293b;
}

th {
  background-color: #f1f5f9;
  font-weight: 500;
  border-bottom: 1px solid #e5e7eb;
}

td {
  border-bottom: 1px solid #e5e7eb;
}

tbody tr:nth-child(even) {
  background-color: #f9fafb;
}

tbody tr:hover {
  background-color: #f1f5f9;
}

.thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.content-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.3s;
}

.action-button .icon {
  font-size: 18px;
}

.view-button:hover {
  background: #e6f0fa;
}

.edit-button:hover {
  background: #e6f0fa;
}

.delete-button:hover {
  background: #fee2e2;
}

.complete-delete-button {
  background-color: #dc2626;
}

.complete-delete-button:hover {
  background: #b91c1c;
}

.restore-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #10b981;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.restore-button:hover {
  background-color: #059669;
}

.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  font-size: 18px;
  color: #1e293b;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  color: #64748b;
  cursor: pointer;
  transition: color 0.3s;
}

.close-button:hover {
  color: #1e293b;
}

.modal-body {
  padding: 20px;
}

.form-group, .detail-group {
  margin-bottom: 20px;
}

.form-group label, .detail-group label {
  display: block;
  font-size: 15px;
  color: #4b5563;
  margin-bottom: 6px;
  font-weight: 500;
}

.form-group input[type="text"],
.form-group input[type="number"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s;
}

.form-group input[type="text"]:focus,
.form-group input[type="number"]:focus {
  border-color: #3b82f6;
}

.form-group input[type="file"] {
  width: 100%;
  padding: 10px 0;
  font-size: 15px;
}

.detail-group p {
  font-size: 15px;
  color: #1e293b;
  background-color: #f9fafb;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.image-preview {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
symbols
.modal-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 15px 20px;
  border-top: 1px solid #e5e7eb;
}

.save-button,
.cancel-button,
.close-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.3s, transform 0.1s;
}

.save-button {
  background-color: #3b82f6;
  color: white;
}

.save-button:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.cancel-button, .close-button {
  background-color: #ef4444;
  color: white;
}

.cancel-button:hover, .close-button:hover {
  background-color: #dc2626;
  transform: translateY(-1px);
}

/* Modal Animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .admin-wrapper {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    padding: 15px 0;
  }

  .sidebar-menu {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
  }

  .menu-item {
    padding: 10px 15px;
  }

  .main-content {
    padding: 15px;
  }

  .top-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .content-area {
    padding: 15px;
  }

  th, td {
    padding: 10px 12px;
    font-size: 14px;
  }

  .modal-content {
    width: 90%;
  }

  .content-header, .bulk-actions {
    flex-direction: column;
    gap: 5px;
  }

  .add-button, .toggle-trash-button, .bulk-delete-button, .complete-delete-button, .bulk-restore-button, .bulk-complete-delete-button {
    width: 100%;
  }

  .content-image {
    width: 100%;
    height: auto;
  }
}
</style>