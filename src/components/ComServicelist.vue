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
            <li v-for="(feature, fIndex) in card.features" :key="fIndex">{{ feature }}</li>
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
      tabs: ['website', 'app', 'agency'],
      activeTab: 'website',
      tabLabels: {
        website: 'Website',
        app: 'App',
        agency: 'Agency',
      },
      cards: {
        website: [
          {
            image: require('@/assets/iconweb.svg'),
            title: 'Gói Thiết Kế Website',
            price: '2.500.000đ',
            features: [
              '💡 Phong cách: Hiện đại, tối giản',
              '🎨 Tư vấn thiết kế miễn phí',
              '⏱️ Thời gian triển khai: 10-20 ngày',
              '🛠️ Chỉnh sửa tối đa 3 lần',
              '👷 Kiến trúc sư 1-3 năm kinh nghiệm',
              '📦 Bàn giao: 3D + bản vẽ kỹ thuật',
            ],
          },
        ],
        app: [
          {
            image: require('@/assets/icondt.svg'),
            title: 'Gói Thiết Kế App',
            price: '2.500.000đ',
            features: [
              '💡 Phong cách: Hiện đại, tối giản',
              '🎨 Tư vấn thiết kế miễn phí',
              '⏱️ Thời gian triển khai: 10-20 ngày',
              '🛠️ Chỉnh sửa tối đa 3 lần',
              '👷 Kiến trúc sư 1-3 năm kinh nghiệm',
              '📦 Bàn giao: 3D + bản vẽ kỹ thuật',
            ],
          },
        ],
        agency: [
          {
            image:require('@/assets/Agency.svg'),
            title: 'Gói Thiết Kế Agency',
            price: '2.500.000đ',
            features: [
              '💡 Phong cách: Hiện đại, tối giản',
              '🎨 Tư vấn thiết kế miễn phí',
              '⏱️ Thời gian triển khai: 10-20 ngày',
              '🛠️ Chỉnh sửa tối đa 3 lần',
              '👷 Kiến trúc sư 1-3 năm kinh nghiệm',
              '📦 Bàn giao: 3D + bản vẽ kỹ thuật',
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
  font-family: 'Segoe UI', sans-serif;
  background-color: #f5f5f5;
  padding: 40px 20px;
  text-align: center;
}

/* Title */
.section-title {
  color: #228be6;
  margin-bottom: 30px;
  font-size: 28px;
}

/* Tabs */
.tabs {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 30px;
  background: #ffffff;
  padding: 10px 20px;
  border-radius: 30px;
}

.tab-btn {
  padding: 10px 25px;
  border: none;
  background-color: transparent;
  color: #1f7ed1;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.tab-btn.active {
  background-color: #228be6;
  color: white;
}

/* Cards */
.card-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
}

.card {
  background-color: #e4f2ff;
  border-radius: 20px;
  padding: 20px;
  width: 280px;
  border: 2px solid #CBE9FF;
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
  background: #CBE9FF;
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
@media (max-width: 768px) {
  .tabs {
    flex-direction: column;
    gap: 10px;
  }

  .card {
    width: 90%;
  }
}
</style>
