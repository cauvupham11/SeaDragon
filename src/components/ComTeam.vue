<template>
  <div class="team-section">
    <div class="team-header">
      <h2 class="title">Đội ngũ chúng tôi</h2>
      <p class="description">
        Chúng tôi là một nhóm những người trẻ năm sinh trên chiến trường, chúng tôi chỉ phủ đầy năng lực trẻ hơn chứ các thành 
        viên đều đã trải qua nhiều dự án, cuộc thi, nhiều nghiệm những thứ mà những người trẻ như họ cũng sáng chói trong chi hội 
        của mình tại phạm vi một tỉnh như tỉnh Long.
      </p>
    </div>

    <div class="team-gallery">
      <div class="main-photo">
        <img :src="mainPhoto.src" :alt="mainPhoto.alt" />
      </div>

      <div class="photo-thumbnails">
        <div v-for="(photo, index) in thumbnailPhotos" :key="photo.id" 
             class="thumbnail"
             @click="swapWithMain(index)">
          <img :src="photo.src" :alt="photo.alt" />
        </div>
      </div>
    </div>

    <div class="mission-section">
      <h2 class="title">Sứ mệnh</h2>
      <p class="description">
        Chúng tôi thực hiện các giải pháp công nghệ hiệu quả, ứng dụng thực tiễn cho người dùng Việt. Với sứ mệnh nâng tầm kỹ 
        thuật người Việt lên ngang tầm thế giới, chúng tôi phấn đấu từng ngày cải tiến sản phẩm của mình, lấy người dùng làm trọng 
        để phát triển. Chúng tôi khẳng định mang công nghệ AI đến gần hơn nữa đến khách hàng của bạn!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamSection',
  data() {
    return {
      allPhotos: [
        {
          id: 1,
          src: require('@/assets/image 11.png'),
          alt: 'Our full team group photo'
        },
        {
          id: 2,
          src: require('@/assets/image 12.png'),
          alt: 'Team receiving award at event'
        },
        {
          id: 3,
          src: require('@/assets/image 13.png'),
          alt: 'Team selfie'
        },
        {
          id: 4,
          src: require('@/assets/image 14.png'),
          alt: 'Team at an event'
        }
      ],
      mainPhotoId: 1
    };
  },
  computed: {
    mainPhoto() {
      return this.allPhotos.find(photo => photo.id === this.mainPhotoId);
    },
    thumbnailPhotos() {
      return this.allPhotos.filter(photo => photo.id !== this.mainPhotoId);
    }
  },
  methods: {
    swapWithMain(thumbnailIndex) {
      const clickedPhotoId = this.thumbnailPhotos[thumbnailIndex].id;
      
      this.mainPhotoId = clickedPhotoId;
    }
  }
};
</script>

<style scoped>
.team-section {
  padding: 10px 0;
  background-color: #fff;
  font-family: 'Roboto', sans-serif;
  color:#5D5D5D
}

.team-header {
  max-width: 820px;
  margin: 0 auto;
  padding: 0 15px;
  font-weight: bold;
}

.team-header h2 {
  text-align: center;
}

.team-header p {
  text-align: left;   
}

.mission-section {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 15px;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  color: #00bcd4;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
}

.team-gallery {
  max-width: 1500px;
  margin: 2rem auto;
  padding: 0 15px;
}

.main-photo {
  margin: 0 auto 3rem auto; 
  height: 450px;
  overflow: hidden;
  display: flex;
  background-color: #f8f9fa;
  width: 720px;
}

.main-photo img {
  width: 100%;
  height: 100%;
}
.photo-thumbnails {
  display: flex;
  gap: 15px;
  margin-bottom: 2rem;
  height: 350px;
}
.thumbnail {
  flex: 1;
  cursor: pointer;
  overflow: hidden;
  height: 100%;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.thumbnail:hover {
  border-color: #00bcd4;
  opacity: 0.9;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.mission-section {
  margin-top: 4rem;
  margin-bottom:36px;
  background-image: url('@/assets/nen1.png'); 
  background-size: cover;         
  background-position: center;    
  background-repeat: no-repeat;   
  font-style: italic;
  font-weight: bold;
  padding :50px 250px;
}
.mission-section h2 {
  text-align: center;
}
.mission-section p{
  text-align: left;
}

@media (max-width: 1200px) {
  .team-gallery {
    max-width: 100%;
    padding: 0 10px;
  }

  .main-photo {
    width: 90%;
    height: 400px;
  }

  .photo-thumbnails {
    height: 300px;
  }

  .title {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .photo-thumbnails {
    height: 150px;
  }
  
  .main-photo {
    height: 300px;
  }
  
  .title {
    font-size: 2rem;
  }

  .mission-section {
    padding: 50px 20px;
  }

  .description {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .photo-thumbnails {
    height: 100px;
  }

  .main-photo {
    height: 250px;
  }

  .title {
    font-size: 1.8rem;
  }

  .mission-section {
    padding: 40px 10px;
  }

  .description {
    font-size: 0.8rem;
  }
}
</style>