<template>
  <section class="hero">
    <div class="hero-content">
      <div class="growth-box">
        <img src="../assets/arrow.png" alt="Mũi tên xoắn" class="arrow-icon-left">
      <p class="title">Tăng trưởng hàng tuần</p>
      <div class="chart-line">
        <svg width="100%" height="100" viewBox="0 0 200 100">
          <path d="M0 70 Q 25 30, 50 70 T 100 70 T 150 30 T 200 70" stroke="blue" stroke-width="2" fill="none" />
        </svg>
      </div>
      <div class="chart-legend">
        <div class="legend-item">
          <span class="dot red"></span> <span>12345</span>
        </div>
        <div class="legend-item">
          <span class="dot blue"></span> <span>2.4% <span class="up">↑</span></span>
        </div>
      </div>
    </div>
      <div class="hero-text">
        <p class="sub-title">Designing With Us</p>
        <h1><span>Sea Dragon Technology</span> - Đối tác thiết kế đáng tin cậy tại TP.HCM</h1>
        <p class="description">
          Cùng chúng tôi thực hiện hoá ước mơ xây dựng sản phẩm của bạn, cùng nhau nói "Có" với những thiết kế phi thường.
        </p>
      </div>

      <div class="trusted-box">
      <img src="../assets/arrow.png" alt="Mũi tên xoắn" class="arrow-icon">

      <p class="title">Khách hàng tin tưởng</p>
      <div class="trusted-content">
        <div class="avatars">
          <img src="../assets/user1.png" alt="User 1">
          <img src="../assets/user2.png" alt="User 2">
          <img src="../assets/user3.png" alt="User 3">
          <img src="../assets/user4.png" alt="User 4">
          <img src="../assets/user5.png" alt="User 5">
        </div>
        <div class="rating">
          <span class="star">★</span>
          <span class="count">1,234+</span>
        </div>
      </div>
    </div>
  </div>
  <div>
    <ul class="services">
          <li>UI/UX Design</li>
          <li>Prototype</li>
          <li>Web Design</li>
          <li>Landing Page</li>
          <li>Mobile Design</li>
          <li>Development</li>
        </ul>

        <button  @click="goToServiceList" class="btn-start">Bắt đầu dự án</button>
  </div>
    <div class="social-icons">
      <a href="#"><img src="../assets/icons8-tiktok-48.png" alt="TikTok"></a>
      <a href="#"><img src="../assets/icons8-youtube-48.png" alt="YouTube"></a>
      <a href="#"><img src="../assets/icons8-instagram-48.png" alt="Instagram"></a>
      <a href="#"><img src="../assets/icons8-facebook-48.png" alt="Facebook"></a>
    </div>

    <div class="partners">
      <p>Đối tác tin cậy</p>
      <img src="../assets/nguyentuananh.png" alt="Nguyen Tuan Anh">
      <img src="../assets/google.png" alt="Google">
      <img src="../assets/vnpay.png" alt="VNPay">
    </div>
  </section>

  <section class="collaboration">
    <div class="collab-left">
    <img src="../assets/sep.png" alt="Hợp tác phát triển">
    <div class="collab-left-content">
      <h4>Hợp tác phát triển</h4>
      <h2>Cùng nhau <br> vươn xa</h2>
      <p>Chúng tôi đồng hành<br>cùng bạn để kiến tạo <br>giải pháp</p>
    </div>
  </div>
  <div class="collab-right">
  <div class="text-block">
    <h3>Khách hàng<br>tin tưởng</h3>
    <p class="subtext">Sự tin tưởng của khách<br>hàng là giá trị cốt lõi của<br>chúng tôi</p>
  </div>

  <div class="stats">
    <div class="stat-item">
      <h2>100+</h2>
      <p>Hoàn thành dự án</p>
    </div>
    <div class="stat-item">
      <h2>1,230</h2>
      <p>Khách hàng tin tưởng</p>
    </div>
  </div>

  <button  @click="goToServiceList" class="btn-collab">Bắt đầu hợp tác</button>
</div>
</section>
<section class="commitment">
  <div class="commitment-left">
    <h4>Cam kết chất lượng</h4>
    <h2>Làm việc nhanh chóng là chất<br>lượng của chúng tôi</h2>
    <p>
      Chúng tôi cam kết hoàn thành công việc với tốc độ tối ưu<br>mà không làm giảm chất lượng.
      Với quy trình hiệu quả và<br>đội ngũ chuyên nghiệp, bạn luôn nhận được kết quả nhanh<br>chóng và đáng tin cậy.
    </p>
  </div>

  <div class="commitment-right">
  <div class="timeline-header">
    <h3>Timeline</h3>
    <div class="legend">
      <span class="dot completed"></span> Dự án hoàn thành
      <span class="dot inprogress"></span> Trong quá trình
    </div>
  </div>

  <div class="timeline-chart">
    <div class="timeline-row completed" style="left: 0%; width: 50%;"> 
      <span class="percent">100%</span>
      <span class="timeline-title">Thiết kế hệ thống</span>
      <div class="avatars">
        <img src="src/assets/image-1.png" />
        <img src="src/assets/image-2.png" />
        <img src="src/assets/image-3.png" />
      </div>
    </div>

    <!-- Project 2: Phát triển website -->
    <div class="timeline-row inprogress" style="left: 30%; width: 50%;"> 
      <span class="percent">80%</span>
      <span class="timeline-title">Phát triển website</span>
      <div class="avatars">
        <img src="src/assets/image-4.png" />
        <img src="src/assets/image-5.png" />
        <img src="src/assets/image-6.png" />
        <img src="src/assets/image-7.png" />
        <img src="src/assets/image-8.png" />
        <img src="src/assets/image-9.png" />
      </div>
    </div>

    <!-- Project 3: Tối ưu website -->
    <div class="timeline-row bottom" style="left: 50%; width: 45%;"> 
      <span class="percent">40%</span>
      <span class="timeline-title">Tối ưu website</span>
      <div class="avatars">
        <img src="src/assets/image-10.png" />
        <img src="src/assets/image-11.png" />
        <img src="src/assets/image-12.png" />
      </div>
    </div>

    <!-- Timeline months: S10 to T21 -->
    <div class="months">
      <span>S10</span>
      <span>M11</span>
      <span>T12</span>
      <span>W13</span>
      <span>T14</span>
      <span>F15</span>
      <span>S16</span>
      <span>S17</span>
      <span>M18</span>
      <span>T19</span>
      <span>W20</span>
      <span>T21</span>
    </div>
  </div>
</div>

</section>


  <!-- About Us Section -->
  <section class="about-us">
    <div class="customer-section">
      <div class="circle circle-main">
        <span>200+<br><small>Khách hàng<br>hài lòng</small></span>
      </div>
      <div class="circle circle-top-right">
        <img src="../assets/image - 13.png" alt="Group khách hàng">
      </div>
      <div class="circle circle-left">
        <img src="../assets/6.png" alt="Bắt tay khách hàng">
      </div>
      <div class="circle circle-bottom-left">
        <img src="../assets/7.png" alt="Cuộc họp khách hàng">
      </div>
    </div>


    <div class="about-right">
      <h4>Về chúng tôi</h4>
      <h2>Sự tin tưởng của khách hàng ngày càng vững chắc</h2>
      <p>
        Chúng tôi không ngừng nỗ lực để mang đến giải pháp tốt<br> nhất, được khách hàng tin tưởng theo thời gian.
      </p>
      <a href="/servicelist" class="btn-primary">Bắt đầu ngay</a>
    </div>
  </section>

  <!-- Projects Section -->
  <section class="projects">
    <div class="projects-header">
      <h4>Dự án</h4>
      <h2>Thành công vượt bậc</h2>
      <p>
        Chúng tôi tự hào khi mỗi dự án hoàn thành không chỉ đáp ứng yêu cầu mà còn mang lại giá trị thực tế cho khách hàng. Thành công của dự án là sự kết hợp giữa sáng tạo, chất lượng và cam kết của chúng tôi.
      </p>
    </div>

    <div class="projects-grid">
      <div class="project-item big">
        <img src="../assets/project-1.png" alt="Website Thẩm mỹ">
        <div class="project-info">
          <h3>Website Thẩm mỹ</h3>
          <p>Giao diện sang trọng, tinh tế, tôn vinh vẻ đẹp và thương hiệu. Tối ưu trải nghiệm người dùng với hình ảnh chất lượng cao, bố cục hài hòa và màu sắc thu hút.</p>
        </div>
      </div>

      <div class="project-item small">
        <img src="../assets/project-2.png" alt="Website bán hàng">
        <div class="project-info">
          <h3>Website bán hàng</h3>
          <p>Giao diện hiện đại, dễ dùng, tạo cảm giác tin cậy, thúc đẩy hành vi mua sắm, tối ưu doanh số.</p>
        </div>
      </div>

      <div class="project-item small">
        <img src="../assets/project-3.png" alt="Website phong thủy">
        <div class="project-info">
          <h3>Website phong thủy</h3>
          <p>Thiết kế cân bằng giữa yếu tố truyền thống và hiện đại, tạo cảm giác bình yên, tin cậy cho khách hàng.</p>
        </div>
      </div>
    </div>

    <div class="projects-button">
      <a href="/servicelist" class="btn-primary">Khám phá dự án của chúng tôi</a>
    </div>
  </section>
<section class="inspiration">
    <div class="inspiration-header">
      <div class="inspiration-text">
        <h4>Nguồn cảm hứng</h4>
        <h2>Khám phá thiết kế UI</h2>
        <p>
          Chúng tôi mang đến những thiết kế UI vừa hiện đại, sáng tạo, vừa giữ được nét quen thuộc, giúp người dùng ở mọi lứa tuổi cảm thấy thoải mái và dễ dàng trải nghiệm. 
          Kết hợp giữa công nghệ tiên tiến và giá trị truyền thống, mỗi giao diện đều được tối ưu để tạo nên sự kết nối tự nhiên nhất.
        </p>
      </div>
      <div class="inspiration-button">
        <a href="/servicelist" class="btn-primary">Xem dự án</a>
      </div>
    </div>
  
    <div class="inspiration-gallery">
      <div class="carousel-track">
      <img src="../assets/image-2.png" alt="UI 1" loading="lazy"> 
      <img src="../assets/image-5.png" alt="UI 2" loading="lazy"> 
      <img src="../assets/image-3.png" alt="UI 3" loading="lazy">
      <img src="../assets/image-4.png" alt="UI 4" loading="lazy">
      <img src="../assets/image.png" alt="UI 5" loading="lazy">
      <img src="../assets/image-7.png" alt="UI 6" loading="lazy">
      <img src="../assets/image-6.png" alt="UI 7" loading="lazy"> 
      <img src="../assets/image.png" alt="UI 8" loading="lazy">
      <img src="../assets/image-7.png" alt="UI 9" loading="lazy">
      <img src="../assets/image-6.png" alt="UI 10" loading="lazy">
</div>
    <div class="carousel-track-right">
    <img src="../assets/image-7.png" alt="UI 1" loading="lazy">
    <img src="../assets/image-3.png" alt="UI 2" loading="lazy">
    <img src="../assets/image-2.png" alt="UI 3" loading="lazy">
    <img src="../assets/image-7.png" alt="UI 4" loading="lazy">
    <img src="../assets/image-3.png" alt="UI 5" loading="lazy">
    <img src="../assets/image-4.png" alt="UI 6" loading="lazy">
    <img src="../assets/image-3.png" alt="UI 7" loading="lazy">
    <img src="../assets/image.png" alt="UI 8" loading="lazy">
    <img src="../assets/image-7.png" alt="UI 9" loading="lazy">
    <img src="../assets/image-6.png" alt="UI 10" loading="lazy">
 </div>
    </div>
  </section>
    <section class="testimonial">
    <div class="testimonial-header">
      <h4>Những gì khách hàng nhận xét</h4>
      <h2>Thành tựu nổi bật</h2>
      <p>Những cột mốc quan trọng, khẳng định chất lượng và sự tin tưởng của khách hàng</p>
    </div>
<!-- Dùng cho PC -->
    <div class="testimonial-pc">
      <button class="testimonial-nav prev">←</button>

      <div class="testimonial-main">
        <img src="../assets/google.png" alt="Google" class="testimonial-logo" />
        <p class="testimonial-quote">
          Chúng tôi đã hợp tác với đội ngũ thiết kế website này trong dự án phát triển nền tảng thương mại điện tử của công ty. Điều làm tôi ấn tượng nhất là cách họ thấu hiểu nhu cầu và biến những yêu cầu phức tạp thành một giải pháp dễ sử dụng nhưng đầy hiệu quả. Từ giao diện mượt mà đến tốc độ xử lý nhanh chóng, website của chúng tôi giờ đây không chỉ thu hút khách hàng mà còn giúp tăng doanh thu đáng kể. Đội ngũ luôn sẵn sàng hỗ trợ và đảm bảo mọi thứ hoạt động ổn định. Tôi chắc chắn sẽ tiếp tục hợp tác trong các dự án tiếp theo!        </p>
        <div class="testimonial-author">
          <h4>Anh Minh</h4>
          <p>CEO Công ty Thương mại Điện tử</p>
        </div>
      </div>

      <button class="testimonial-nav next">→</button>
    </div>

    <!-- Dùng cho Mobile -->
    <div class="testimonial-mobile">
      <div class="testimonial-main">
        <img src="../assets/google.png" alt="Google" class="testimonial-logo" />
        <p class="testimonial-quote">
          Chúng tôi đã hợp tác với đội ngũ thiết kế website này trong dự án phát triển nền tảng thương mại điện tử của công ty. Điều làm tôi ấn tượng nhất là cách họ thấu hiểu nhu cầu và biến những yêu cầu phức tạp thành một giải pháp dễ sử dụng nhưng đầy hiệu quả. Từ giao diện mượt mà đến tốc độ xử lý nhanh chóng, website của chúng tôi giờ đây không chỉ thu hút khách hàng mà còn giúp tăng doanh thu đáng kể. Đội ngũ luôn sẵn sàng hỗ trợ và đảm bảo mọi thứ hoạt động ổn định. Tôi chắc chắn sẽ tiếp tục hợp tác trong các dự án tiếp theo!        </p>
        <div class="testimonial-author">
          <h4>Anh Minh</h4>
          <p>CEO Công ty Thương mại Điện tử</p>
        </div>
      </div>
      <div class="testimonial-nav-wrapper">
        <button class="testimonial-nav prev">←</button>
        <button class="testimonial-nav next">→</button>
      </div>
    </div>
  </section>

  <section class="cta">
    <div class="cta-content">
      <h3>Đồng Hành Cùng Sea Dragon Technology</h3>
      <p>Chúng tôi cam kết mang đến những giải pháp công nghệ tiên tiến, giúp bạn nhanh<br>chóng phát triển bền vững với chất lượng vượt trội và sự tin cậy tuyệt đối.</p>
    </div>
    <a href="/servicelist" class="btn-secondary">Đặt lịch tư vấn</a>
  </section>
  
</template>
<script>
export default {
  name: 'HomePage',
  mounted() {
  const testimonials = [
    {
      quote: "“Chúng tôi đã hợp tác với đội ngũ thiết kế website này trong dự án phát triển nền tảng thương mại điện tử của công ty. Điều làm tôi ấn tượng nhất là cách họ thấu hiểu nhu cầu và biến những yêu cầu phức tạp thành một giải pháp dễ sử dụng nhưng đầy hiệu quả. Từ giao diện mượt mà đến tốc độ xử lý nhanh chóng, website của chúng tôi giờ đây không chỉ thu hút khách hàng mà còn giúp tăng doanh thu đáng kể. Đội ngũ luôn sẵn sàng hỗ trợ và đảm bảo mọi thứ hoạt động ổn định. Tôi chắc chắn sẽ tiếp tục hợp tác trong các dự án tiếp theo!”",
      author: "Anh Minh",
      position: "CEO Công ty Thương mại Điện tử",
    },
    {
      quote: "“Chúng tôi đã hợp tác với đội ngũ thiết kế website này để xây dựng nền tảng thương mại điện tử cho công ty. Tôi rất ấn tượng với sự sáng tạo và chuyên môn của họ khi biến những yêu cầu khắt khe của chúng tôi thành một trang web dễ dàng sử dụng nhưng vẫn đầy đủ tính năng. Từ việc tối ưu hóa giao diện, cải thiện tốc độ tải trang đến nâng cao khả năng tương tác, trang web của chúng tôi không chỉ mang đến trải nghiệm tốt cho khách hàng mà còn giúp gia tăng tỷ lệ chuyển đổi và doanh thu. Đội ngũ luôn chu đáo và sẵn sàng hỗ trợ bất kỳ lúc nào. Tôi rất mong chờ cơ hội hợp tác tiếp theo!”",
      author: "Lan Anh",
      position: "CEO Công ty Thương mại Điện tử",
    }
  ];

  let currentTestimonialIndex = 0;

  const prevButtons = document.querySelectorAll('.testimonial-nav.prev');
  const nextButtons = document.querySelectorAll('.testimonial-nav.next');
  const quoteEls = document.querySelectorAll('.testimonial-quote');
  const authorEls = document.querySelectorAll('.testimonial-author h4');
  const positionEls = document.querySelectorAll('.testimonial-author p');

  function updateTestimonial(index) {
    const testimonial = testimonials[index];
    quoteEls.forEach(el => el.textContent = testimonial.quote);
    authorEls.forEach(el => el.textContent = testimonial.author);
    positionEls.forEach(el => el.textContent = testimonial.position);
  }

  prevButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(currentTestimonialIndex);
    });
  });

  nextButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      updateTestimonial(currentTestimonialIndex);
    });
  });
},
methods: {
  goToServiceList() {
    this.$router.push('/servicelist');
  }
}

}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Roboto', sans-serif;
    background-color: white;
    color: #5D5D5D;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 80px;
    background-color: #e8dada;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .logo {
    font-weight: bold;
    font-size: 20px;
    color: #1a73e8;
  }
  
  .navbar a {
    margin: 0 15px;
    text-decoration: none;
    color: #333;
    font-weight: 500;
  }
.trusted-box {
  position: relative;
  background-color: #fff;
  top:40px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  width: fit-content;
  font-family: sans-serif;
}

.arrow-icon {
  position: absolute;
  transform: rotate(180deg) scaleX(-1);
  top: -50px;
  left: 80px;
  width: 40px;
  height: auto;
}


.title {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
}

.trusted-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.avatars {
  display: flex;
  gap: -10px; 
}

.avatars img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
  object-fit: cover;
  margin-left: -10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.avatars img:first-child {
  margin-left: 0;
}

.rating {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: bold;
  font-size: 16px;
  color: #2b3a55;
}

.star {
  color: orange;
  font-size: 18px;
}

  
  .btn-schedule {
    padding: 10px 20px;
    border: 2px solid #1a73e8;
    background: transparent;
    color: #1a73e8;
    border-radius: 25px;
    cursor: pointer;
  }
  
  .hero {
  height:900px;
  position: relative;
  text-align: center;
  padding: 60px 20px 0 20px;
  overflow: hidden;
  background-color: #F8F7FA;
}

.hero::before {
  content: '';
  position: absolute;
  top: 57%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  height: 100%;
  max-width: 950px;
  max-height: 800px;
  background: linear-gradient(to bottom, rgba(231, 231, 231, 1) 0%, rgba(248, 248, 248, 0) 50%, rgba(248, 248, 248, 1) 100%);
  border-radius: 50%;
  z-index: 1;
}
  .hero-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    gap:60px;
  }
  .growth-box {
  background-color: #fff;
  margin-top:25px;
  border-radius: 20px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: 280px;
  font-family: sans-serif;
}
.arrow-icon-left {
  position: absolute;
  transform: rotate(180deg);
  top: 20px;
  left: 180px;
  width: 40px;
  height: auto;
}

.growth-box .title {
  font-weight: bold;
  margin-bottom: 10px;
}

.chart-line {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 14px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.dot.red {
  background-color: #f55;
}

.dot.blue {
  background-color: #36f;
}

.up {
  color: orange;
  font-weight: bold;
}
  
  .hero-text {
    max-width: 600px;
    margin: 20px;
  }
  
  .hero-text .sub-title {
    font-size: 14px;
    color: #888;
    margin-bottom: 10px;
  }
  
  .hero-text h1 {
    font-size: 40px;
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  .hero-text h1 span {
    color: #1a73e8;
  }
  
  .hero-text .description {
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  .services {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 60px;
    margin-bottom: 20px;
  }
  
  .services span {
    font-size: 14px;
    color: #555;
  }
  
  .btn-start {
    background-color: #1a73e8;
    margin-top:18px;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-weight: bold;
    position: relative; 
    z-index: 2;
    justify-content: center;   
  }
  
  .social-icons {
    margin: 40px 0;
    position: relative; 
    z-index: 2;
    justify-content: center;   
  }
  
  .social-icons a img {
    width: 40px;
    margin: 0 10px;
  }
  
  .partners {
    margin-top: 140px;
    font-size: 18px;
    position: relative; 
    z-index: 2;
  }
  
  .partners img {
    width: 180px;
    margin: 60px;
  }
  
  .collaboration {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 60px 20px;
    background: #fff;
    width: 1400px;
    margin: 0 auto;
  }
  
  .collab-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.collab-left {
  position: relative;
  width: 400px;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.collab-left-content::after {
  content: '';
  position: absolute;
  top : 160px;
  left: 50%;
  transform: translateX(-50%);
  width: 370px;
  height: 300px;
  background: linear-gradient(to bottom, rgba(231, 231, 231, 1) 0%, rgba(248, 248, 248, 0) 50%, rgba(248, 248, 248, 1) 100%);
  border-radius: 50%;
  z-index: 0;
  opacity: 0.4;
  pointer-events: none;
}
.collab-left img {
  position: absolute;
  top: 0;
  right: 0; 
  width: 200px;
  height: 300px;
  object-fit: cover;
  display: block;
  z-index: 2; 
  transform: scaleX(-1); 
}

.collab-left-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #0041e8 ;
  color: white;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: flex-start;
  text-align: left;
  z-index: 1; 
}

.collab-left-content h4 {
  font-size: 16px;
  margin-bottom: 10px;
}

.collab-left-content h2 {
  font-size: 32px;
  margin-bottom: 15px;
}

.collab-left-content p {
  left:20px;
  font-size: 14px;
  line-height: 1.8;
}
.collab-right {
  display: flex;
  width: 900px;
  height: 300px;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  flex-direction: row;
  padding: 40px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.collab-right h3 {
    font-size: 32px;
    color: #333;
    margin-bottom: 10px;
}
.collab-right{
  line-height: 1.6;
  font-size:16px;
}
  
.collab-right .text-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
  .stats {
    display: flex;
    justify-content: space-around;
    gap: 40px;
    margin-bottom: 30px;
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-item h2 {
    color: #1a73e8;
    font-size: 36px;
    font-weight: 600;
  }
  
  .stat-item p {
    font-size: 16px;
    color: #555;
  }
  
  .btn-collab {
    background-color: #1a73e8;
    color: white;
    width:180px;
    height:60px;
    padding: 12px 24px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-weight: bold;
    font-size:16px;
    box-shadow: 0 4px 10px rgba(26, 115, 232, 0.3);
    transition: background 0.3s;
  }
  
  .btn-collab:hover {
    background: #0059c0;
  }
  
  .commitment {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px 20px;
    background: #fff;
    width: 1350px;
    margin: 0 auto;
  }
  
  section.commitment {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 60px 40px;
  gap: 40px;
}

.commitment-left,
.commitment-right {
  flex: 1;
}

.commitment-left h4 {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 10px;
}

.commitment-left h2 {
  font-size: 32px;
  font-weight: bold;
  line-height: 1.4;
  margin-bottom: 20px;
}

.commitment-left p {
  font-size: 16px;
  color: #4b5563;
  line-height: 1.6;
}

/* Timeline section */
.timeline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.timeline-header h3 {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

/* Legend styles */
.legend {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
  gap: 20px;
  margin-top: 10px;
}

.legend .dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 6px;
}

.legend .completed {
  background-color: #2563eb;
}

.legend .inprogress {
  background-color: #d1d5db;
}

/* Timeline chart background */
.timeline-chart {
  position: relative;
  height: 300px;
  background-color: #fff;
  padding-top: 100px;
  margin-top: 20px;
  overflow-x: auto;
  background-image: repeating-linear-gradient(
    to right,
    #eee,
    #eee 1px,
    transparent 1px,
    transparent var(--col-width)
  );
  border-left: 1px solid #eee;
}

.timeline-chart::before {
  content: '';
  position: absolute;
  top: 0;
  left: 230px; /* T14 */
  width: 2px;
  height: 85%;
  background-color: #2563eb;
  margin-top:40px;
  z-index: 1;
}

.timeline-row {
  position: absolute;
  height: 48px;
  border-radius: 999px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  font-size: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  z-index: 2;
}

.timeline-row.completed {
  background-color: #2563eb;
  color: white;
  top: 50px;
}

.timeline-row.inprogress {
  background-color: white;
  color: #111827;
  border: 1px solid #e5e7eb;
  top: 120px;
}

.timeline-row.bottom {
  background-color: white;
  color: #111827;
  border: 1px solid #e5e7eb;
  top: 200px;
}

.timeline-row .percent {
  font-weight: bold;
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 999px;
  margin-right: 10px;
  background-color: #f3f4f6;
  color: #4b5563;
}

.timeline-row.completed .percent {
  background-color: #1e40af;
  color: white;
}

.timeline-title {
  font-weight: bold;
  white-space: nowrap;
}

.timeline-row .avatars {
  display: flex;
  margin-left: auto;
}

.timeline-row .avatars img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  margin-left: -14px;
  box-shadow: 0 0 0 1px #e5e7eb;
}

.timeline-row .avatars img:first-child {
  margin-left: 0;
}

.timeline-chart .months {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #6b7280;
  position: absolute;
  top: 1px;
  width: 100%;
  padding: 5 12px;
  box-sizing: border-box;
}

.timeline-chart {
  background-image: repeating-linear-gradient(
    to right,
    #eee,
    #eee 1px,
    transparent 1px,
    transparent 60px
  );
}

.timeline-chart .months span {
  flex: 1;
  text-align: center;
}

.legend {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.legend .dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  margin: 0 5px;
}

.legend .completed {
  background-color: #2563eb;
}

.legend .inprogress {
  background-color: #d1d5db;
}

  
  .dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 5px;
    border-radius: 50%;
  }
  
  .completed {
    background-color: #1a73e8;
  }
  
  .inprogress {
    background-color: #ccc;
  }
  
  .timeline {
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    padding: 10px 0;
  }
  
  .timeline::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(to bottom, rgba(200, 220, 255, 0.1), rgba(200, 220, 255, 0.3));
    z-index: -1;
  }
  
  .timeline-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-radius: 40px;
    color: #333;
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  
  .timeline-item.completed {
    background: #1a73e8;
    color: #fff;
  }
  
  .timeline-item.inprogress {
    background: #fff;
    border: 1px solid #ccc;
    color: #333;
  }
  
  .timeline-item span {
    font-size: 14px;
    font-weight: 500;
  }
  
  .team-avatars {
    display: flex;
    gap: 5px;
  }
  
  .team-avatars img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
  
  .about-us {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 50px;
    padding: 20px 20px;
    background: #fff;
    max-width: 1400px;
    height:600px;
    margin: 0 auto;
  }
  
  .customer-section {
  position: relative;
  width: 700px;
  height: 600px;
  margin: 0 auto;
}

.circle {
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

.circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.circle-main {
  width: 160px;
  height: 160px;
  background-color: #0057e7;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  left: 270px;
  top: 220px;
  z-index: 2;
  position: absolute; 
  border: 6px solid white; 
  border-radius: 50%;      
}


.circle-main small {
  display: block;
  font-size: 16px;
  font-weight: normal;
}

.circle-top-right {
  width: 320px;
  height: 320px;
  top: 10px;
  right: 60px;
  z-index: 1;
}

.circle-left {
  width: 220px;
  height: 220px;
  top: 170px;
  left: 100px;
  z-index: 1;
}

.circle-bottom-left {
  width: 140px;
  height: 140px;
  bottom: 110px;
  left: 290px;
  z-index: 3
}

  .about-right {
    flex: 1;
    padding:100px 140px 100px 20px;
  }
  
  .about-right h4 {
    font-size: 16px;
    color: #999;
    margin-bottom: 10px;
  }
  
  .about-right h2 {
    font-size: 36px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .about-right p {
    font-size: 16px;
    color: #666;
    margin-bottom: 30px;
    line-height: 28px;
  }
  
  .btn-primary {
    display: inline-block;
    padding: 12px 24px;
    background: #1a73e8;
    color: #fff;
    border-radius: 30px;
    text-decoration: none;
    box-shadow: 0 4px 10px rgba(26, 115, 232, 0.3);
    transition: background 0.3s;
  }
  
  .btn-primary:hover {
    background: #0059c0;
  }
  
  .projects {
    padding: 10px 20px;
    background: white;
    text-align: center;
  }
  
  .projects-header h4 {
    font-size: 14px;
    color: #999;
    margin-bottom: 20px;
  }
  
  .projects-header h2 {
    font-size: 40px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .projects-header p {
    font-size: 16px;
    color: #666;
    max-width: 600px;
    margin: 0 auto 50px;
    line-height:28px;
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 1100px;
    margin: 0 auto 40px;
  }
  .project-item {
    position: relative;
    overflow: hidden;
    border-radius: 15px;
  }
  
  .project-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  .project-info {
  position: absolute;
  bottom: 0;
  padding: 20px;
  color: #fff;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}
.project-info h3 {
  font-size: 20px;
  margin-bottom: 10px;
  text-align: left; 
  padding-left:10px;  
}

.project-info p {
  font-size: 16px;
  line-height: 1.4;
  text-align: justify; 
  line-height:28px;
  padding-left:10px;
  padding-right:30px;
}

  
  .project-item.small {
    height: 250px;
  }
  
  .project-item.big {
    height: 520px;
    grid-row: span 2;
  }
  
  .projects-button .btn-primary {
    padding: 12px 30px;
  }
  
  .inspiration {
    padding: 60px 20px 20px 40px;
    background: #ffffff;
  }
  .inspiration-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1400px;
    margin: 0 auto 50px;
    padding: 0 60px;
  }
  
  .inspiration-text h4 {
    font-size: 16px;
    color: #999;
    margin-bottom: 10px;
  }
  
  .inspiration-text h2 {
    font-size: 40px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .inspiration-text p {
    font-size: 16px;
    color: #666;
    max-width: 600px;
    line-height:28px;
  }
  
  .inspiration-button .btn-primary {
    margin-top: 160px;
  }
  
  .inspiration-gallery {
    max-width: 1400px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    display: block;
  }
  
  .inspiration-gallery {
  overflow-x: hidden; 
  width: 100%;
}

.carousel-track,
.carousel-track-right {
  display: flex;
  animation: slide-left 25s linear infinite;
  animation-direction: alternate;
  margin-bottom: 20px;
  white-space: nowrap; 
}

.carousel-track-right {
  animation-name: slide-right;
}

.carousel-track img,
.carousel-track-right img {
  width: 250px;
  height: 200px;
  border-radius: 12px;
  object-fit: cover;
  margin-right: 20px;
  flex-shrink: 0;
}

@keyframes slide-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes slide-right {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
  .testimonial {
    padding: 0 20px;
    background: white;
    text-align: center;
  }
  
  .testimonial-header h4 {
    font-size: 16px;
    color: #999;
    margin-bottom: 20px;
  }
  
  .testimonial-header h2 {
    font-size: 40px;
    margin-bottom: 30px;
    color: #333;
    line-height:28px;
  }
  
  .testimonial-header p {
    font-size: 16px;
    color: #666;
    margin-bottom: 50px;
  }
  
  .testimonial-pc {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.testimonial-mobile {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.testimonial-main {
  max-width: 1000px;
  text-align: center;
}

.testimonial-logo {
  max-width: 100px;
  margin-bottom: 20px;
} 

.testimonial-quote {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.testimonial-author h4 {
  margin: 0;
  font-weight: bold;
}

.testimonial-author p {
  margin: 5px 0 0;
  font-style: italic;
}
  
  .testimonial-nav {
  background: none;
  border: 2px solid #007BFF;
  color: #007BFF;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  padding-bottom:1px;
}
  
  .cta {
  margin: 40px 0 40px 0;
  padding: 40px 20px;
  background: linear-gradient(to right, #1e90ff, #007bff);
  border-radius: 20px;
  color: white;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;              
  align-items: center;        
  justify-content: space-between; 
  gap: 30px;                  
  text-align: left;
}

.cta-content {
  flex: 1;
}

.cta-content h3 {
  font-size: 32px;
  margin-bottom: 10px;
}

.cta-content p {
  font-size: 16px;
  margin-bottom: 0;
  line-height: 28px;
}

.btn-secondary {
  background: white;
  color: #007BFF;
  padding: 10px 25px;
  border-radius: 12px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s;
  white-space: nowrap;
}
.btn-secondary:hover {
    background: #e6e6e6;
}
@media (max-width: 1440px) {
  .collaboration,
  .commitment,
  .about-us,
  .inspiration-header,
  .inspiration-gallery {
    max-width: 1200px;
    width: 90%;
  }
  .projects-grid {
    width: 90%;
  }
  .testimonial-pc {
    display: none;
  }
  .testimonial-mobile {
    display: flex;
  }
  .testimonial-nav-wrapper{
    display: flex;
    gap:40px;
  }
  .hero{
    height: 850px;
    padding-bottom: 40px;
  }
  .hero::before{
    display:flex;
    margin-top :50px;
    width: 1200px;
  }
  .partners{
    margin-top:100px;
  }
}
@media (max-width: 1024px) {
  .timeline-chart {
    height: 320px;
  }
  .timeline-row {
    font-size: 11px;
    padding: 0 10px;
  }
  .timeline-row .avatars img {
    width: 24px;
    height: 24px;
  }
}
@media (max-width: 1200px) {
  .header {
    padding: 20px 40px;
  }
  .hero{
    height: 1300px;
    padding-bottom: 40px;
  }
  .hero-content {
    flex-direction: column;
    gap: 40px;
  }
  
  .collaboration {
    flex-direction: column;
    width: 90%;
    padding: 40px 20px;
  }
  
  .collab-right {
    width: 100%;
    height: auto;
    flex-direction: column;
    text-align: center;
  }
  
  .commitment {
    flex-direction: column;
    width: 90%;
    gap: 40px;
  }
  
  .commitment-left {
    padding-top: 20px;
  }
  
  .about-us {
    flex-direction: column;
    height: auto;
    padding: 60px 20px;
  }
  
  .about-right {
    padding: 20px;
    text-align: center;
  }
  
  .customer-section {
    width: 100%;
    height: 500px;
    margin-top:0
  }
  .services{
    padding: 80px 20px 0 20px;
    gap:40px;
  }
  .trusted-box{
    margin-top:-60px;
  } 
  .hero::before{
    display:flex;
    margin-top :200px;
  }
  .arrow-icon-left {
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
  }

}

@media (max-width: 992px) {
  .hero {
    height: auto;
    padding-bottom: 60px;
  }
  
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-item.big {
    height: 250px;
    grid-row: span 1;
  }
  
  .inspiration-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 0 20px;
  }
  
  .inspiration-button .btn-primary {
    margin-top: 20px;
  }
  .hero::before {
    height:300px;
    top:940px;
  }
  .testimonial-content {
    flex-direction: column;
  }

  .testimonial-nav {
    order: unset; 
    padding-bottom:2px;
  }

  .testimonial-main {
    text-align: center;
    padding: 0 10px;
  }
  .circle-top-right{
    top: 10px;
    right:10px;

  }
  .circle-bottom-left{
    bottom:15px;
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 15px;
    padding: 20px;
  }
  
  .navbar {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  
  .hero-text h1 {
    font-size: 32px;
    line-height: 1.3;
  }
  
  .services {
    padding: 80px 5px 0 40px;
  }

  .services li {
    flex: 1 1 30%; 
    max-width: 150px;
  }
  
  .partners img {
    margin: 10px 10px;
    width: 120px;
  }
  
  .collab-left {
    width: 100%;
    height: 250px;
  }
  
  .collab-left-content h2 {
    font-size: 24px;
  }
  
  .stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .testimonial-content {
    flex-direction: column;
  }
  
  .cta {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
  }
  .arrow-icon-left {
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
    top:-20px;
  }
  .timeline-chart {
    height: 360px;
  }
  .timeline-row {
    font-size: 10px;
    padding: 0 8px;
  }
  .timeline-row .avatars img {
    width: 22px;
    height: 22px;
    margin-left: -10px;
  }
  .timeline-row .percent {
    padding: 2px 8px;
    font-size: 11px;
  }
}
@media (max-width: 576px) {
  .hero-text h1 {
    font-size: 28px;
  }
  
  .hero-text .description {
    font-size: 14px;
  }
  
  .trusted-box{
    margin-top:-40px;
    width: 100%;
  } 
  .growth-box {
    width: 100%;
  }
  
  .arrow-icon {
    left: 50%;
    transform: translateX(-50%) rotate(180deg) scaleX(-1);
  }
  
  .arrow-icon-left {
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
    top:-20px;
  }
  .partners{
    margin-top: 10px;
    margin-bottom:-30px;
  }
  
  .partners img {
    width: 100px;
    margin: 10px;
  }
  
  .collab-right h3 {
    font-size: 24px;
  }
  
  .commitment-left h2,
  .about-right h2 {
    font-size: 28px;
  }
  
  .projects-header h2,
  .inspiration-text h2,
  .testimonial-header h2 {
    font-size: 32px;
  }
  
  .circle-main {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .circle-top-right {
    right: 20px;
    width: 250px;
    height: 250px;
    left:140px;
    top: 60px;
  }
  
  .circle-left {
    left: -40px;
    width: 180px;
    height: 180px;
  }
  
  .circle-bottom-left {
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
  }
  
  .carousel-track img,
  .carousel-track-right img {
    width: 200px;
    height: 150px;
  }
  .timeline-header{
    width:350px;
    margin:0 auto;

  }
  .hero::before{
    display:flex;
    margin-top :80px;
    width: 380px;
  }
    .timeline-chart {
    overflow-x: scroll;
    height: 400px;
  }

  .timeline-row {
    min-width: 280px;
    max-width: 100%;
    white-space: nowrap;
  }

  .timeline-chart .months {
    font-size: 11px;
  }
}

@media (max-width: 400px) {
  .hero-text h1 {
    font-size: 24px;
  }
  
  .btn-start,
  .btn-schedule,
  .btn-collab,
  .btn-primary,
  .btn-secondary {
    width: 100%;
    text-align: center;
  }
  
  .social-icons a img {
    width: 30px;
    margin-bottom:-20px;
  }
  
  .partners img {
    width: 80px;
  }
  
  .collab-left-content h2 {
    font-size: 20px;
  }
  
  .collab-right h3 {
    font-size: 20px;
  }
  
  .testimonial-quote {
    font-size: 16px;
  }
  .hero::before{
    display:flex;
    margin-top :50px;
    width: 400px;
  }
  .circle-main {
    left: 50%;
    width: 100px;
    height: 100px;
    transform: translateX(-20%);
  }
  .circle-main span{
    font-size: 10px;
  }
  .circle-main small{
    font-size: 10px;
  }
  .circle-top-right {
    right: 20px;
    width: 100px;
    height: 100px;
    left:140px;
    top: 60px;
  }
  
  .circle-left {
    left: -40px;
    width: 180px;
    height: 180px;
  }
  
}
</style>