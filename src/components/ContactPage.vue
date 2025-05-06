<template>
    <div class="contact-page">
      <div class="contact-container">
        <div class="contact-left">
          <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>
          <p><strong>Địa chỉ:</strong> 194 đường số 7, KDC Trung Sơn, xã Bình Hưng, huyện Bình Chánh, TPHCM.</p>
          <p><strong>Điện thoại:</strong> 0931 494 389</p>
          <p><strong>Email:</strong> congngherongbien@gmail.com</p>
          <p><strong>Website:</strong> <a href="https://sdtc.vn" target="_blank">https://sdtc.vn</a></p>
          <iframe
            src="https://www.google.com/maps?q=194+Đường+Số+7,+KDC+Trung+Sơn,+TPHCM&output=embed"
            width="100%"
            height="250"
            frameborder="0"
            style="border:0;"
            allowfullscreen
          ></iframe>
        </div>
  
        <div class="contact-right">
          <h2>LIÊN HỆ BÁO GIÁ</h2>
          <form @submit.prevent="submitForm">
            <input v-model="form.name" placeholder="Danh xưng (*)" required />
            <input v-model="form.phone" placeholder="Số điện thoại (*)" required />
            <input v-model="form.email" placeholder="Địa chỉ email" />
            <input v-model="form.company" placeholder="Công ty/ doanh nghiệp (nếu có)..." />
            <input v-model="form.service" placeholder="Sản phẩm, dịch vụ cần marketing... (*)" required />
            <textarea v-model="form.note" placeholder="Ghi chú"></textarea>
            <button type="submit">Xác nhận</button>
          </form>
        </div>
      </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'ContactPage',
    data() {
      return {
        form: {
          name: '',
          phone: '',
          email: '',
          company: '',
          service: '',
          note: '',
        },
      };
    },
    methods: {
      submitForm() {
        console.log('Form submitted:', this.form);
        alert("Thông tin đã được gửi!");
      },
    },
  };
  </script>
  
  <style scoped>
  .contact-page {
  padding: 60px 20px;
  background: linear-gradient(to bottom, #f0f4f8, #ffffff);
  font-family: 'Segoe UI', sans-serif;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.contact-left,
.contact-right {
  flex: 1 1 45%;
  min-width: 300px;
}

h2 {
  color: #003366;
  margin-bottom: 24px;
  font-size: 22px;
  border-bottom: 2px solid #003366;
  padding-bottom: 8px;
}

.contact-left p {
  line-height: 1.8;
  font-size: 15px;
  margin-bottom: 10px;
  color: #333;
}

.contact-left a {
  color: #1a73e8;
  text-decoration: none;
}

.contact-left a:hover {
  text-decoration: underline;
}

iframe {
  border-radius: 10px;
  margin-top: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

input,
textarea {
  padding: 12px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease;
  background-color: #fefefe;
}

input:focus,
textarea:focus {
  border-color: #4e54c8;
  box-shadow: 0 0 0 3px rgba(78, 84, 200, 0.1);
  outline: none;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

button {
  align-self: flex-end;
  padding: 12px 24px;
  background: linear-gradient(to right, #4e54c8, #8f94fb);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}
button:hover {
  background: linear-gradient(to right, #3b40a4, #7b80da);
}
@media (max-width: 768px) {
  .contact-container {
    flex-direction: column;
    padding: 20px;
  }

  .contact-left,
  .contact-right {
    flex: 1 1 100%;
  }

  button {
    width: 100%;
  }
}


</style>
  