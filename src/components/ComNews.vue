<template>
    <div class="container">
      <div class="header">
        <h1>Tin tức</h1>
        <img :src="require('@/assets/nen.png')" alt="Header Image" />
      </div>
  
      <div class="search-bar">
        <input type="text" placeholder="Tìm kiếm" v-model="searchQuery" />
      </div>
  
      <div class="news-grid">
        <div 
          v-for="(item, index) in filteredNews" 
          :key="index" 
          class="news-item"
        >
          <img :src="item.image" alt="News Image" />
          <div class="news-content">
            <div class="category">{{ item.category }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        searchQuery: '',
        newsItems: [
          {
            category: 'Công nghệ',
            title: 'Coca-Cola bị phản ứng vì quảng cáo tạo bằng AI',
            description:
              'Coca-Cola đang đối mặt làn sóng phản đối trên mạng xã hội vì video quảng cáo Giáng sinh "vô hồn, thiếu tính sáng tạo" do dùng AI',
              image: require('@/assets/image.png')
            },
          {
            category: 'Công nghệ',
            title: 'FPT muốn tiên phong phát triển Data Center',
            description:
              'FPT đặt mục tiêu đi đầu trong lĩnh vực trung tâm dữ liệu (Data Center), nhằm hỗ trợ doanh nghiệp tối ưu vận hành, tăng khả năng cạnh tranh.',
              image: require('@/assets/image (1).png')
          },
          {
            category: 'Công nghệ',
            title: 'Trải nghiệm iPad Mini 7: Khó tìm tablet cỡ nhỏ tốt hơn',
            description:
              'Cấu hình không xuất sắc nhưng thiết kế gọn nhẹ, trải nghiệm mượt, hỗ trợ bút và Apple Intelligence khiến iPad Mini 7 là lựa chọn tablet cỡ nhỏ hàng đầu hiện tại.',
            image: require('@/assets/image (2).png'),
          },
          {
            category: 'Công nghệ',
            title: 'Coca-Cola bị phản ứng vì quảng cáo tạo bằng AI',
            description:
              'Coca-Cola đang đối mặt làn sóng phản đối trên mạng xã hội vì video quảng cáo Giáng sinh "vô hồn, thiếu tính sáng tạo" do dùng AI',
            image: require('@/assets/image.png'),
          },
          {
            category: 'Công nghệ',
            title: 'FPT muốn tiên phong phát triển Data Center',
            description:
              'FPT đặt mục tiêu đi đầu trong lĩnh vực trung tâm dữ liệu (Data Center), nhằm hỗ trợ doanh nghiệp tối ưu vận hành, tăng khả năng cạnh tranh.',
            image: require('@/assets/image (1).png'),
          },
          {
            category: 'Công nghệ',
            title: 'Trải nghiệm iPad Mini 7: Khó tìm tablet cỡ nhỏ tốt hơn',
            description:
              'Cấu hình không xuất sắc nhưng thiết kế gọn nhẹ, trải nghiệm mượt, hỗ trợ bút và Apple Intelligence khiến iPad Mini 7 là lựa chọn tablet cỡ nhỏ hàng đầu hiện tại.',
            image: require('@/assets/image (2).png'),
          },
          {
            category: 'Công nghệ',
            title: 'Coca-Cola bị phản ứng vì quảng cáo tạo bằng AI',
            description:
              'Coca-Cola đang đối mặt làn sóng phản đối trên mạng xã hội vì video quảng cáo Giáng sinh "vô hồn, thiếu tính sáng tạo" do dùng AI',
            image: require('@/assets/image.png'),
          },
          {
            category: 'Công nghệ',
            title: 'FPT muốn tiên phong phát triển Data Center',
            description:
              'FPT đặt mục tiêu đi đầu trong lĩnh vực trung tâm dữ liệu (Data Center), nhằm hỗ trợ doanh nghiệp tối ưu vận hành, tăng khả năng cạnh tranh.',
            image: require('@/assets/image (1).png'),
          },
          {
            category: 'Công nghệ',
            title: 'Trải nghiệm iPad Mini 7: Khó tìm tablet cỡ nhỏ tốt hơn',
            description:
              'Cấu hình không xuất sắc nhưng thiết kế gọn nhẹ, trải nghiệm mượt, hỗ trợ bút và Apple Intelligence khiến iPad Mini 7 là lựa chọn tablet cỡ nhỏ hàng đầu hiện tại.',
            image: require('@/assets/image (2).png'),
          },
        ],
      };
    },
    computed: {
      filteredNews() {
        return this.newsItems.filter((item) =>
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
  };
</script>
  
<style scoped>
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  background-color: #f5f5f5;
  padding: 130px;
}

.container {
  max-width: 1200px;
  margin: 100px auto;
  position: relative;
}

.header {
  background-color: #2663ff;
  color: #fff;
  text-align: center;
  padding: 20px 0;
  width: 100%;
  height: 35vh;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.header img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.header h1 {
  font-size: 3vw;
  font-weight: bold;
  text-align: center;
  z-index: 2;
}

.search-bar {
  display: flex;
  width: 60%;
  justify-content: center;
  margin-bottom: 30px;
  position: absolute;
  top: 265px;
  left: 50%;
  transform: translateX(-50%);
}

.search-bar input {
  width: 100%;
  padding: 12px 15px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" width="20px" height="20px"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>');
  background-repeat: no-repeat;
  background-position: 15px center;
  padding-left: 45px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: 80px;
}

.search-bar input::placeholder {
  color: #999;
}

.news-grid {
  margin-top: 150px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.news-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.news-item:hover {
  transform: translateY(-5px);
}

.news-item img {
  width: 100%;
  height: 226px;
  object-fit: cover;
}

.news-content {
  padding: 15px;
  flex: 1;
}

.news-content .category {
  font-size: 12px;
  color: #2663ff;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.news-content h3 {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.4;
  font-weight: bold;
}

.news-content p {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .contain-secction{
    padding:10px 0;
  }

  .container{
    margin:10px auto;
  }
  .news-grid{
    margin:40px auto;
  }
  .header h1 {
    font-size: 10vw;
  }

  .search-bar {
    width: 80%;
  }

  .news-grid {
    grid-template-columns: 1fr;
  }

  .news-item img {
    height: 150px;
  }

  .news-content h3 {
    font-size: 14px;
  }

  .news-content p {
    font-size: 12px;
  }

  .search-bar input {
    margin-top: 5px;
    border-radius:20px;
    height: 60px;
    padding: 10px 15px;
    padding-left: 40px;
  }
}
</style>