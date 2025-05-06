<template>
  <!-- Show login screen if not authenticated -->
  <div v-if="!isAuthenticated" class="login-container">
    <div class="login-card">
      <div class="login-side">
        <div class="brand">
          <div class="flex_logoIMG">
            <a href="/">
              <img src="/images/logoSDT.png" alt="Logo">
            </a>
          </div>
        </div>
        <div class="decoration">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
        </div>
      </div>
      <div class="login-content">
        <div class="login-header">
          <h1>Đăng nhập</h1>
          <p>Vui lòng đăng nhập để tiếp tục</p>
        </div>
        <div class="login-form">
          <div class="alert error" v-if="error">
            <i class="alert-icon"></i>
            {{ error }}
          </div>
          <div class="form-group">
            <label for="username">Tên đăng nhập</label>
            <div class="input-wrapper">
              <i class="icon user-icon"></i>
              <input 
                type="text" 
                id="username" 
                v-model="username" 
                placeholder="Nhập tên đăng nhập"
                :class="{ 'has-error': usernameError }"
              />
            </div>
            <small class="error-text" v-if="usernameError">{{ usernameError }}</small>
          </div>
          <div class="form-group">
            <label for="password">Mật khẩu</label>
            <div class="input-wrapper">
              <i class="icon lock-icon"></i> 
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="password" 
                placeholder="Nhập mật khẩu"
                :class="{ 'has-error': passwordError }"
              />
              <i 
                :class="{ 'eye-slash': !showPassword }"
                @click="togglePasswordVisibility"
              ></i>
            </div>
            <small class="error-text" v-if="passwordError">{{ passwordError }}</small>
          </div>
          <div class="form-options">
            <div class="remember-me">
              <input type="checkbox" id="remember" v-model="rememberMe" />
              <label for="remember">Ghi nhớ đăng nhập</label>
            </div>
          </div>
          <button 
            class="login-button" 
            :disabled="isLoading" 
            @click="handleLogin"
          >
            <span v-if="!isLoading">Đăng nhập</span>
            <span v-else class="loading-spinner"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Show admin interface if authenticated -->
  <div v-else>
    <header class="header">
      <div class="logo">
        <img src="@/assets/logosea.png" alt="Sea Dragon Technology" />
      </div>
      <h1>ADMIN DASHBOARD</h1>
      <div class="admin-info">
        <i class="fa-regular fa-user"></i>
        <span>Admin</span>
        <button @click="logout">Đăng xuất</button>
      </div>
    </header>
    <div class="admin-layout">
      <aside class="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>
            <router-link to="/admin/products">
              <i class="icon product-icon"></i> Quản lý sản phẩm
            </router-link>
          </li>
          <li>
            <router-link to="/admin/orders">
              <i class="icon order-icon"></i> Quản lý đặt hàng
            </router-link>
          </li>
          <li>
            <router-link to="/admin/content">
              <i class="icon content-icon"></i> Quản lý nội dung
            </router-link>
          </li>
          <li>
            <router-link to="/admin/categories">
              <i class="icon category-icon"></i> Quản lý phân loại
            </router-link>
          </li>
        </ul>
      </aside>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Authentication state
const isAuthenticated = ref(false);

// Login form state
const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);
const error = ref('');
const usernameError = ref('');
const passwordError = ref('');

// Check authentication status on component mount
onMounted(() => {
  checkAuthStatus();
});

// Check if user is authenticated
const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  if (token) {
    isAuthenticated.value = true;
  } else {
    isAuthenticated.value = false;
  }
};

// Form validation
const validateForm = () => {
  let isValid = true;
  
  // Reset error messages
  usernameError.value = '';
  passwordError.value = '';
  error.value = '';
  
  // Validate username
  if (!username.value.trim()) {
    usernameError.value = 'Vui lòng nhập tên đăng nhập';
    isValid = false;
  }
  
  // Validate password
  if (!password.value.trim()) {
    passwordError.value = 'Vui lòng nhập mật khẩu';
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.value = 'Mật khẩu phải có ít nhất 6 ký tự';
    isValid = false;
  }
  
  return isValid;
};

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Handle login
const handleLogin = async () => {
  if (!validateForm()) return;
  
  try {
    isLoading.value = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check login credentials (simulation)
    if (username.value === 'admin' && password.value === 'admin123') {
      // Login successful
      console.log('Đăng nhập thành công!');
      
      // Store token in localStorage
      localStorage.setItem('token', 'example-auth-token');
      
      // Store login info if "Remember me" is checked
      if (rememberMe.value) {
        localStorage.setItem('rememberedUser', username.value);
      } else {
        localStorage.removeItem('rememberedUser');
      }
      
      // Update login status
      isAuthenticated.value = true;
      
      // Redirect to dashboard
      router.push('/admin/products');
    } else {
      // Login failed
      error.value = 'Tên đăng nhập hoặc mật khẩu không chính xác';
    }
  } catch (err) {
    error.value = 'Đã xảy ra lỗi. Vui lòng thử lại sau';
    console.error('Lỗi đăng nhập:', err);
  } finally {
    isLoading.value = false;
  }
};

// Handle logout
const logout = () => {
  // Clear login info
  localStorage.removeItem('token');
  
  // Update login status
  isAuthenticated.value = false;
  
  // Notify logout
  alert("Đăng xuất thành công");
  
  // Reset form
  resetForm();
};

// Reset form values
const resetForm = () => {
  // Reset password only, keep username if remembered
  password.value = '';
  error.value = '';
  usernameError.value = '';
  passwordError.value = '';
  
  // Restore username from localStorage if exists
  initRememberedUser();
};

// Initialize remembered user from localStorage
const initRememberedUser = () => {
  const rememberedUser = localStorage.getItem('rememberedUser');
  if (rememberedUser) {
    username.value = rememberedUser;
    rememberMe.value = true;
  }
};

// Call init function
initRememberedUser();
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Shared styles */
* {
  
  box-sizing: border-box;
}

body {
  
  font-family: 'Poppins', sans-serif;
}

/* Styles for login screen */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30px;
  margin-top: 25px;
}
.login-card {
  display: flex;
  width: 100%;
  max-width: 900px;
  height: 600px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* Left side - Brand section */
.login-side {
  width: 40%;
  background: linear-gradient(135deg, #0081C9, #5BC0F8);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 40px;
}

.brand {
  z-index: 2;
  text-align: center;
}

.logo-container {
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
}

.logo-text {
  font-size: 32px;
  font-weight: bold;
  color: #0081C9;
}

.brand h2 {
  font-size: 28px;
  margin: 0 0 10px;
  font-weight: 600;
}

.brand p {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
  line-height: 1.5;
}

.decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  right: -150px;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: -80px;
  left: -80px;
}

/* Right side - Login form */
.login-content {
  width: 60%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-header {
  margin-bottom: 30px;
}

.login-header h1 {
  font-size: 32px;
  color: #333;
  margin: 0 0 10px;
  font-weight: 600;
}

.login-header p {
  color: #666;
  font-size: 16px;
  margin: 0;
}

.login-form {
  width: 100%;
}

.alert.error {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  background: #fff2f0;
  color: #ff4d4f;
  border-left: 4px solid #ff4d4f;
}

.alert-icon::before {
  content: "⚠️";
  margin-right: 8px;
  font-size: 16px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper .icon {
  position: absolute;
  left: 15px;
  color: #aaa;
  font-size: 18px;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 15px 12px 40px;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: #f9f9f9;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #0081C9;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(0, 129, 201, 0.1);
}

.input-wrapper input.has-error {
  border-color: #ff4d4f;
  background: #fff2f0;
}

.input-wrapper input::placeholder {
  color: #aaa;
}

.eye-icon {
  position: absolute;
  right: 15px;
  cursor: pointer;
}

/* Icons using Font Awesome or equivalent */
.user-icon::before {
  content: "👤";
}

.lock-icon::before {
  content: "🔒";
}

.eye-icon::before {
  content: "👁️";
}

.eye-icon.eye-slash::before {
  content: "👁️‍🗨️";
}

.error-text {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input {
  margin-right: 8px;
  accent-color: #0081C9;
}

.remember-me label {
  color: #666;
  font-size: 14px;
}

.forgot-password {
  color: #0081C9;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  background: #0081C9;
  border: none;
  border-radius: 10px;
  padding: 14px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0, 129, 201, 0.3);
}

.login-button:hover {
  background: #006ca8;
  transform: translateY(-2px);
}

.login-button:active {
  transform: translateY(0);
}

.login-button:disabled {
  background: #86c6e8;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive design for login */
@media (max-width: 768px) {
  .login-card {
    flex-direction: column;
    height: auto;
    max-width: 400px;
  }
  
  .login-side {
    width: 100%;
    padding: 30px;
  }
  
  .login-content {
    width: 100%;
    padding: 30px;
  }
  
  .circle-1 {
    width: 150px;
    height: 150px;
  }
  
  .circle-2 {
    width: 100px;
    height: 100px;
  }
}

/* Styles for admin layout */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F6FBFF;
  padding: 20px;
  flex-wrap: wrap;
  gap: 10px;
  box-shadow: 0px 4px 4px 0px #00000040;
}

.logo img {
  height: 50px;
}

.header h1 {
  color: #54b4ff;
  font-size: 28px;
  margin: 0;
  flex: 1;
  text-align: center;
}

.admin-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin-info button {
  background-color: #54b4ff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.admin-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: linear-gradient(180deg, #0081C9 0%, #5BC0F8 100%);
  color: white;
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
}

.sidebar h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin: 5px 0;
}

.sidebar a {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  padding: 12px 15px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.sidebar a:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
}

.sidebar a.router-link-active {
  background: #006ca8;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.sidebar .icon {
  margin-right: 10px;
  font-size: 18px;
}

/* Sidebar icons */
.product-icon::before {
  content: "📦";
}

.order-icon::before {
  content: "🛒";
}

.content-icon::before {
  content: "📝";
}

.category-icon::before {
  content: "🏷️";
}

.content {
  flex-grow: 1;
  padding: 20px;
  background: #f4f4f4;
}

/* Responsive design for sidebar */
@media (max-width: 768px) {
  .sidebar {
    width: 200px;
  }
  
  .sidebar h2 {
    font-size: 18px;
  }
  
  .sidebar a {
    font-size: 14px;
    padding: 10px 12px;
  }
}

@media (max-width: 576px) {
  .admin-layout {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    padding: 15px;
  }
  
  .sidebar ul {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .sidebar li {
    flex: 1 1 auto;
  }
  
  .sidebar a {
    justify-content: center;
  }
}
</style>