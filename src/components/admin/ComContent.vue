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
/* Reset và thiết lập cơ bản */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
}

/* Bố cục chính */
.admin-wrapper {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f0 100%);
}

/* Nội dung chính */
.main-content {
  flex: 1;
  padding: 30px;
}

/* Thanh trên cùng */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.top-bar-left h2 {
  font-size: 2.2rem;
  color: #2c3e50;
  font-weight: 700;
}

/* Khu vực nội dung */
.content-area {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Tiêu đề nội dung và các nút */
.content-header {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.add-button, .toggle-trash-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.add-button {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
}

.toggle-trash-button {
  background: linear-gradient(45deg, #da4c53, #da0f19);
  color: white;
}

.toggle-trash-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(149, 165, 166, 0.3);
}

/* Thanh tìm kiếm */
.search-bar {
  margin-bottom: 30px;
  position: relative;
}

.search-bar input {
  width: 100%;
  padding: 12px 16px 12px 48px;
  font-size: 1rem;
  border: 1px solid #dfe6e9;
  border-radius: 8px;
  background: #f9f9f9;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-bar input:focus {
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
}

.search-bar input::placeholder {
  color: #7f8c8d;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #7f8c8d;
}

/* Hành động hàng loạt */
.bulk-actions {
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 12px;
}

.bulk-actions input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #3498db;
}

.bulk-actions label {
  font-size: 0.9rem;
  color: #2c3e50;
  margin-right: 15px;
}

.bulk-delete-button, .complete-delete-button, .bulk-restore-button, .bulk-complete-delete-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.bulk-delete-button, .complete-delete-button, .bulk-complete-delete-button {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
}

.bulk-delete-button:hover, .complete-delete-button:hover, .bulk-complete-delete-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(231, 76, 60, 0.3);
}

.bulk-restore-button {
  background: linear-gradient(45deg, #2ecc71, #27ae60);
  color: white;
}

.bulk-restore-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(46, 204, 113, 0.3);
}

.bulk-delete-button:disabled, .complete-delete-button:disabled, .bulk-restore-button:disabled, .bulk-complete-delete-button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Danh sách nội dung và thùng rác */
.content-list, .trash-section {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.trash-section h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 600;
}

.empty-trash {
  text-align: center;
  color: #7f8c8d;
  font-size: 1.1rem;
  padding: 40px;
  background: #f9f9f9;
  border-radius: 12px;
  border: 2px dashed #dfe6e9;
}

/* Bảng */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 12px;
  overflow: hidden;
}

th, td {
  padding: 15px 20px;
  text-align: left;
  font-size: 0.9rem;
  color: #2c3e50;
}

th {
  background: linear-gradient(45deg, #3498db, #2980b9);
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  font-size: 0.85rem;
}

td {
  border-bottom: 1px solid #e9ecef;
}

tbody tr:nth-child(even) {
  background: #f9f9f9;
}

tbody tr:hover {
  background: #f8f9fa;
}

tbody tr:last-child td {
  border-bottom: none;
}

table input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #3498db;
}

/* Ảnh thu nhỏ và ảnh nội dung */
.thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 2px solid white;
  transition: transform 0.2s;
}

.thumbnail:hover {
  transform: scale(1.05);
}

.content-image {
  width: 100%;
  max-width: 350px;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Nút hành động */
.action-buttons {
  display: flex;
  gap: 10px;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: transform 0.2s, background 0.2s;
}

.action-button .icon {
  font-size: 1.2rem;
}

.view-button {
  color: #3498db;
}

.view-button:hover {
  background: rgba(52, 152, 219, 0.1);
  transform: scale(1.1);
}

.edit-button {
  color: #2ecc71;
}

.edit-button:hover {
  background: rgba(46, 204, 113, 0.1);
  transform: scale(1.1);
}

.delete-button {
  color: #e74c3c;
}

.delete-button:hover {
  background: rgba(231, 76, 60, 0.1);
  transform: scale(1.1);
}

.complete-delete-button {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.9rem;
  transition: transform 0.2s;
}

.complete-delete-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(231, 76, 60, 0.3);
}

.restore-button {
  background: linear-gradient(45deg, #2ecc71, #27ae60);
  color: white;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.9rem;
  transition: transform 0.2s;
}

.restore-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(46, 204, 113, 0.3);
}

/* Modal */
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(44, 62, 80, 0.8);
  backdrop-filter: blur(3px);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 600px;
  max-width: 95%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  border-radius: 16px 16px 0 0;
}

.modal-header h3 {
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.8rem;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-button:hover {
  transform: rotate(90deg);
}

.modal-body {
  padding: 30px;
}

.form-group, .detail-group {
  margin-bottom: 25px;
}

.form-group label, .detail-group label {
  display: block;
  font-size: 1rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 600;
}

.form-group input[type="text"],
.form-group input[type="number"] {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #dfe6e9;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input[type="text"]:focus,
.form-group input[type="number"]:focus {
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
}

.form-group input[type="file"] {
  width: 100%;
  padding: 12px 0;
  font-size: 1rem;
  cursor: pointer;
}

.detail-group p {
  font-size: 1rem;
  color: #2c3e50;
  background: #f9f9f9;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #dfe6e9;
}

.image-preview {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-top: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.modal-footer {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  padding: 20px 30px;
  border-top: 1px solid #dfe6e9;
}

.save-button,
.cancel-button,
.modal-footer .close-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.save-button {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
}

.save-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
}

.cancel-button, .modal-footer .close-button {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
}

.cancel-button:hover, .modal-footer .close-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(231, 76, 60, 0.3);
}

/* Modal Animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(20px);
}

/* Responsive */
@media (max-width: 768px) {
  .admin-wrapper {
    flex-direction: column;
  }

  .main-content {
    padding: 20px;
  }

  .top-bar {
    padding: 15px;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .content-area {
    padding: 20px;
  }

  .content-header {
    flex-direction: column;
  }

  .add-button, .toggle-trash-button {
    width: 100%;
    justify-content: center;
  }

  .bulk-actions {
    flex-wrap: wrap;
    gap: 10px;
  }

  th, td {
    padding: 12px 15px;
    font-size: 0.85rem;
  }

  .action-buttons {
    flex-wrap: wrap;
    gap: 8px;
  }

  .form-group input[type="text"],
  .form-group input[type="number"] {
    padding: 10px 12px;
  }

  .modal-content {
    width: 95%;
  }

  .modal-header, .modal-body, .modal-footer {
    padding: 20px;
  }

  .content-image, .image-preview {
    width: 100%;
    max-width: 100%;
  }
}
</style>