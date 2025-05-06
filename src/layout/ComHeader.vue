<template>
  <header class="header">
      <div class="container_header">
          <div class="flex_logoIMG">
            <a href="/">
              <img src="/images/logoSDT.png" alt="Logo">
            </a>
          </div>
          <nav class="header_choice">
            <router-link to="/" class="nav_link" @click="closeMenu">Trang chủ</router-link>
            <router-link to="/Process" class="nav_link">Quy trình</router-link>
            <router-link to="/team" class="nav_link">Đội ngũ</router-link>
            <router-link to="/servicelist" class="nav_link">Bảng giá</router-link>
            <router-link to="/news" class="nav_link">Tin Tức</router-link>
          </nav>
          <div>
            <button class="btn_head" @click="goToServiceList">Đặt lịch tư vấn</button>
          </div>
          <div class="hamburger" @click="toggleMenu">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
          </div>
      </div>
        <nav :class="['mobile_menu', { active: menuVisible }]">
        <router-link to="/" class="nav_link" @click="closeMenu">Trang chủ</router-link>
        <router-link to="/Process" class="nav_link" @click="closeMenu">Quy trình</router-link>
        <router-link to="/team" class="nav_link" @click="closeMenu">Đội ngũ</router-link>
        <router-link to="/servicelist" class="nav_link" @click="closeMenu">Bảng giá</router-link>
        <router-link to="/news" class="nav_link" @click="closeMenu">Tin Tức</router-link>
        <router-link to="/servicelist" class="nav_link" @click="closeMenu">Đặt lịch tư vấn</router-link>
      </nav>
  </header>
</template>
<script>
import eventBus from "@/eventBus";

export default {
  data() {
    return {
      user: null,
      searchQuery: "",
      menuVisible: false,
    };
  },

  created() {
    eventBus.on("loginSuccess", (user) => {
      this.user = user;
    });
  },
  mounted() {
    this.checkUser();
  },
  watch: {
    $route() {
      this.checkUser();
    },
  },
  beforeUnmount() {
    eventBus.off("loginSuccess");
  },
  methods: {
    checkUser() {
      this.user = JSON.parse(localStorage.getItem("currentUser")) || null;
    },
    logout() {
      localStorage.removeItem("currentUser");
      this.user = null;
      this.$router.push("/login");
    },
    performSearch() {
      if (this.searchQuery.trim() !== "") {
        this.$router.push({
          name: "SearchResults",
          query: { q: this.searchQuery },
        });
      }
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    closeMenu() {
      this.menuVisible = false;
    },
    goToServiceList() {
    this.$router.push('/contact');
    },
  },
};
</script>

  <style>
   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

* {    
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
}
.header {
    display: flex;
    justify-content: space-between; 
    align-items: center;
    padding: 24px 100px;
    background-color: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.container_header {
    display: flex;
    align-items: center;
    justify-content: space-between; 
    padding: 0 24px;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    height: 70px;
}

.flex_logoIMG img {
    width: 220px;
    height: auto;
}

.header_choice {
    display: flex;
    gap: 50px;
    align-items: center;
    white-space: nowrap;
}

.nav_link {
    text-decoration: none;
    color: #9ca3af;
    font-size: 1.2rem;
    font-weight: 400;
    transition: color 0.3s;
}

.nav_link:hover {
    color: black;
}

.nav_link.active {
    color: #383838;
    font-weight: 700;
}

.btn_head {
    padding: 16px 24px;
    border: 1px solid #2663FF;
    color: #2663FF;
    background-color: transparent;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 51px;
    white-space: nowrap;
}

.btn_head:hover {
    background-color: #eff6ff;
}

.hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
    cursor: pointer;
}

.hamburger .line {
    width: 100%;
    height: 4px;
    background-color: #383838;
}

  .mobile_menu {
      position: fixed;
      top: 100px; 
      left:0;
      width: 100vw; 
      height: calc(100vh - 80px); 
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      padding: 20px;
      gap: 40px;
      overflow-y: auto;
      z-index: 999;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease;
      transform: translateX(-100%); 
  }
  .mobile_menu.active {
      transform: translateX(0);
  }

@media (max-width: 1024px) {
  .header {
    padding: 16px 20px; 
  }
  .container_header {
    justify-content: flex-start;
    align-items: center;
    gap: 12px; 
    padding: 0;
  }
  .flex_logoIMG img {
    width: 120px; 
    margin-left:20px;
  }

  .header_choice {
    display: none;
  }
  .btn_head {
    display: none;
  }
  .hamburger {
    display: flex;
    width: 24px; 
    height: 16px;
    margin-left: auto;
    margin-right:20px;
  }
  .hamburger .line {
    height: 3px; 
  }
}
  </style>
  