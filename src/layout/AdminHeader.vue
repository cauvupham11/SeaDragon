<!-- src/components/Header.vue -->
<template>
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
</template>
  
  <script setup>
  const logout = () => {
    alert("Đăng xuất...");
  };
  </script>
  <style scoped>
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
  </style>
  