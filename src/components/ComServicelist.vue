<template>
  <section class="pricing-section">
    <h1 class="section-title">Bảng giá dịch vụ</h1>

    <!-- Tabs -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="tab-btn"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
      >
        <div></div>
        {{ tabLabels[tab] }}
      </button>
    </div>

    <!-- Cards -->
    <div class="card-group">
      <div class="card" v-for="(card, index) in currentCards" :key="index">
        <img :src="card.image" :alt="card.title" />
        <h2>{{ card.title }}</h2>
        <p class="price">{{ card.price }}</p>
        <button class="start-btn">Bắt đầu</button>
        <div class="features-box">
          <ul>
            <li v-for="(feature, fIndex) in card.features" :key="fIndex">
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tabs: ["website", "app", "agency"],
      activeTab: "website",
      tabLabels: {
        website: "Website",
        app: "App",
        agency: "Agency",
      },
      cards: {
        website: [
          {
            image: require("@/assets/iconweb.svg"),
            title: "Gói Thiết Kế Website",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/icondt.svg"),
            title: "Gói Thiết Kế App",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/Agency.svg"),
            title: "Gói Thiết Kế Agency",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/iconweb.svg"),
            title: "Gói Thiết Kế Website",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/icondt.svg"),
            title: "Gói Thiết Kế App",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/Agency.svg"),
            title: "Gói Thiết Kế Agency",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/iconweb.svg"),
            title: "Gói Thiết Kế Website",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/icondt.svg"),
            title: "Gói Thiết Kế App",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/Agency.svg"),
            title: "Gói Thiết Kế Agency",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
        ],
        app: [
          {
            image: require("@/assets/iconweb.svg"),
            title: "Gói Thiết Kế Website",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/icondt.svg"),
            title: "Gói Thiết Kế App",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/Agency.svg"),
            title: "Gói Thiết Kế Agency",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/iconweb.svg"),
            title: "Gói Thiết Kế Website",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/icondt.svg"),
            title: "Gói Thiết Kế App",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/Agency.svg"),
            title: "Gói Thiết Kế Agency",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/iconweb.svg"),
            title: "Gói Thiết Kế Website",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/icondt.svg"),
            title: "Gói Thiết Kế App",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/Agency.svg"),
            title: "Gói Thiết Kế Agency",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
        ],
        agency: [
          {
            image: require("@/assets/iconweb.svg"),
            title: "Gói Thiết Kế Website",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/icondt.svg"),
            title: "Gói Thiết Kế App",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/Agency.svg"),
            title: "Gói Thiết Kế Agency",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/iconweb.svg"),
            title: "Gói Thiết Kế Website",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/icondt.svg"),
            title: "Gói Thiết Kế App",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/Agency.svg"),
            title: "Gói Thiết Kế Agency",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/iconweb.svg"),
            title: "Gói Thiết Kế Website",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/icondt.svg"),
            title: "Gói Thiết Kế App",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
          {
            image: require("@/assets/Agency.svg"),
            title: "Gói Thiết Kế Agency",
            price: "2.500.000đ",
            features: [
              "💡 Phong cách: Hiện đại, tối giản",
              "🎨 Tư vấn thiết kế miễn phí",
              "⏱️ Thời gian triển khai: 10-20 ngày",
              "🛠️ Chỉnh sửa tối đa 3 lần",
              "👷 Kiến trúc sư 1-3 năm kinh nghiệm",
              "📦 Bàn giao: 3D + bản vẽ kỹ thuật",
            ],
          },
        ],
      },
    };
  },
  computed: {
    currentCards() {
      return this.cards[this.activeTab];
    },
  },
};
</script>

<style scoped>
/* Section layout */
.pricing-section {
  font-family: 'Roboto', sans-serif;
  background-color: #fbfbfb;
  padding: 40px 20px;
  text-align: center;
}

/* Title */
.section-title {
  color: #5DBBFF;
  margin-bottom: 30px;
  font-size: 45px;
}

/* Container của các tab */
.tabs[data-v-631a347c] {
  display: flex;
  justify-content: center;
  margin: 20px auto;
  background: #FFFFFF;
  padding: 6px;
  width: 300px;
  border-radius: 25px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  gap: 20px;
  flex-wrap: nowrap; /* Đảm bảo không xuống dòng */
}

/* Các nút tab */
.tab-btn[data-v-631a347c] {
  padding: 8px 20px;
  width: 80px;
  border: none;
  background-color: transparent;
  color: #5DBBFF;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  transition: background-color 0.3s, color 0.3s;
  flex-shrink: 0; 
}
.tab-btn.active[data-v-631a347c] {
  background-color: #228be6;
  color: white;
}

@media (max-width: 600px) {
  .tabs[data-v-631a347c] {
    flex-direction: row;
    gap: 10px;
    width: 280px;
    padding: 6px;
  }

  .tab-btn[data-v-631a347c] {
    width: 70px;
    padding: 6px 10px;
    font-size: 12px;
  }
}
.card-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 960px;
  margin: 0 auto;
}
.card {
  background-color: #e4f2ff;
  border-radius: 20px;
  padding: 20px;
  border: 2px solid #cbe9ff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 15px;
}

.card h2 {
  font-size: 18px;
  color: #1a1a1a;
}

.price {
  font-size: 20px;
  color: #228be6;
  font-weight: bold;
  margin: 10px 0;
}

.start-btn {
  background-color: #3193e9;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
}

/* Feature list */
.features-box {
  background: #cbe9ff;
  border-radius: 6px;
  padding: 10px;
  text-align: left;
}

.features-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-box li {
  margin: 8px 0;
  font-size: 14px;
  color: #333;
}

/* Responsive */
@media (max-width: 1024px) {
  .card-group {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .card-group {
    grid-template-columns: 1fr;
  }

  .tabs {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .card {
    width: 100%;
  }
}
</style>
