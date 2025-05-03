<template>
    <div class="dashboard">
      <header class="header">
        <div class="logo">
          <img src="@/assets/logosea.png" alt="Sea Dragon Technology" />
        </div>
        <h1>ADMIN DASHBOARD</h1>
        <div class="admin-info">
          <i class="fa-regular fa-user"></i>
          <span>Admin</span>
          <button class="logout-btn" @click="logout">Đăng xuất</button>
        </div>
      </header>
  
      <div class="main">
        <nav class="sidebar">
          <ul>
            <li>Quản lý sản phẩm</li>
            <li>Quản lý nội dung</li>
            <li>Quản lý phân loại</li>
            <li>Quản lý đặt hàng</li>
          </ul>
        </nav>
        <section class="content">
          <i class="fa-solid fa-trash-can trash-icon" @click="handleTrashClick"></i>
        </section>
      </div>
    </div>
</template>
  
<script setup>
  const logout = () => {
    alert("Đăng xuất...");
  };
  
  const handleTrashClick = () => {
    alert("Xóa nội dung...");
  };
</script>
  
  <style scoped>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  
  .dashboard {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
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
  
  .logout-btn {
    background-color: #54b4ff;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .main {
    display: flex;
    flex: 1;
    overflow: hidden;
  }
  
  .sidebar {
    width: 130px;
    background: #F6FBFF;
    border-right: 1px solid #ccc;
    padding: 20px 30px;
    line-height: 30px;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar li {
    margin: 15px 0;
    color: #54b4ff;
    cursor: pointer;
  }
  
  .content {
    flex: 1;
    padding: 20px;
    position: relative;
    overflow-y: auto;
  }
  
  .trash-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    .main {
      flex-direction: column;
    }
  
    .sidebar {
      width: 100%;
      display: flex;
      justify-content: space-around;
      padding: 10px 0;
      border-right: none;
      border-bottom: 1px solid #ccc;
    }
  
    .sidebar li {
      margin: 0;
    }
  
    .header {
      flex-direction: column;
      text-align: center;
    }
  
    .header h1 {
      font-size: 24px;
    }
  }
  
  @media (max-width: 480px) {
    .admin-info {
      flex-direction: column;
    }
  
    .header h1 {
      font-size: 20px;
    }
  
    .logo img {
      height: 40px;
    }
  
    .logout-btn {
      padding: 5px 10px;
    }
  }
  </style>
  