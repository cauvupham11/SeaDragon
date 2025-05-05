<template>
  <div class="container">
    <!-- MAIN CONTENT -->
    <div class="main-content">
      <div class="breadcrumb">
        <a href="#"><span class="circle-arrow">←</span> Trở lại tin tức</a>
      </div>

      <h1 class="article-title">Đặt khách hàng lên hàng đầu</h1>

      <div class="article-meta">
        <span><img src="../assets/calendar.png" alt=""> Thứ sáu 19/07/2024</span>
        <span><img src="../assets/user.png" alt=""> By Author</span>
        <span><img src="../assets/visible.png" alt=""> 68</span>
        <span><img src="../assets/like.png" alt=""> 86</span>
      </div>

      <div class="article-image">
        <img src="../assets/robot.png" alt="Robot Image">
      </div>

      <div class="article-content">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

        </p>
      </div>

      <div class="navigation">
        <a href="#">← Bài viết trước</a>
        <a href="#">Bài viết sau →</a>
      </div>
    </div>
   
    <!-- SIDEBAR -->
    <div class="container-sidebar">
      <div class="search-bar">
          <input type="text" placeholder="Tìm kiếm bài viết">
      </div>
      <div class="sidebar">
        <h2>Bài viết gần đây</h2>
        <div class="recent-posts">
          <div
            class="recent-post"
            v-for="(post, index) in posts"
            :key="index"
          >
            <img :src="post.image" alt="">
            <div class="recent-post-content">
              <div class="date">{{ post.date }}</div>
              <h3>{{ post.title }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleDetail",
  data() {
    return {
      posts: [
        { image: require("@/assets/h1.png"), date: "Thứ sáu 19/07/2024", title: "Lorem ipsum dolor sit consectetur" },
        { image: require("@/assets/h2.png"), date: "Thứ sáu 19/07/2024", title: "Lorem ipsum dolor sit consectetur" },
        { image: require("@/assets/h3.png"), date: "Thứ sáu 19/07/2024", title: "Lorem ipsum dolor sit consectetur" },
        { image: require("@/assets/h4.png"), date: "Thứ sáu 19/07/2024", title: "Lorem ipsum dolor sit consectetur" },
        { image: require("@/assets/h5.png"), date: "Thứ sáu 19/07/2024", title: "Lorem ipsum dolor sit consectetur" },
        { image: require("@/assets/h6.png"), date: "Thứ sáu 19/07/2024", title: "Lorem ipsum dolor sit consectetur" },
        { image: require("@/assets/h7.png"), date: "Thứ sáu 19/07/2024", title: "Lorem ipsum dolor sit consectetur" },
        { image: require("@/assets/h8.png"), date: "Thứ sáu 19/07/2024", title: "Lorem ipsum dolor sit consectetur" },
        { image: require("@/assets/h9.png"), date: "Thứ sáu 19/07/2024", title: "Lorem ipsum dolor sit consectetur" },
        { image: require("@/assets/h10.png"), date: "Thứ sáu 19/07/2024", title: "Lorem ipsum dolor sit consectetur" },
        { image: require("@/assets/h11.png"), date: "Thứ sáu 19/07/2024", title: "Lorem ipsum dolor sit consectetur" },
        { image: require("@/assets/h12.png"), date: "Thứ sáu 19/07/2024", title: "Lorem ipsum dolor sit consectetur" },
        { image: require("@/assets/h13.png"), date: "Thứ sáu 19/07/2024", title: "Lorem ipsum dolor sit consectetur" },
      ]
    }
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  body {
    background-color: #f4f6fb;
    padding: 20px;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .main-content {
    flex: 3;
    min-width: 0;
    padding: 30px;
    margin: 0;
    border-radius: 12px;
    
  }

  .container-sidebar {
    flex: 1;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar {
    margin: 50px 0 20px 0;
    position: relative;
  }

  .search-bar input {
    width: 100%;
    height: 45px;
    padding: 10px 40px 10px 15px;
    font-size: 14px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background-color: #4184f7;
    color: white;
    outline: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .search-bar input::placeholder {
    color: #e0e0e0;
  }

  .search-bar::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28h.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>');
    background-size: contain;
    background-repeat: no-repeat;
  }

  .sidebar {
    background: #fff;
    border: 1px solid black;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .sidebar h2 {
    font-size: 18px;
    font-weight: bold;
    color: #1f2b6c;
    margin-bottom: 15px;
  }

  .recent-posts {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .recent-post {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .recent-post img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
  }

  .recent-post-content {
    flex: 1;
  }

  .recent-post-content .date {
    font-size: 12px;
    color: #159eec;
    margin-bottom: 3px;
  }

  .recent-post-content h3 {
    font-size: 14px;
    font-weight: normal;
    color: #212124;
    line-height: 1.4;
  }

  .breadcrumb a {
    display: inline-flex;
    align-items: center;
    font-weight: bold;
    font-size: 14px;
    color: #212124;
    text-decoration: none;
    margin-bottom: 15px;
  }

  .circle-arrow {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border: 1px solid #ccc;
    border-radius: 50%;
    font-size: 14px;
    margin-right: 8px;
    color: #333;
  }

  .article-title {
    font-size: 28px;
    color: #1f2b6c;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .article-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
  }

  .article-meta span {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .article-meta img {
    width: 16px;
    height: 16px;
  }

  .article-image img {
    width: 100%;
    height: 400px;
    margin-bottom: 20px;
  }

  .article-content p {
    font-size: 15px;
    text-align: justify;
    color: #444;
    line-height: 1.7;
    margin-bottom: 15px;
  }

  .navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }

  .navigation a {
    background: #e4ecfb;
    color: #2663FF;
    padding: 10px 18px;
    border-radius: 25px;
    text-decoration: none;
    font-size: 14px;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .container {
      flex-direction: column;
    }

    .main-content, .container-sidebar {
      width: 100%;
      padding: 20px 10px;
    }
  }

  @media (max-width: 768px) {
    .navigation {
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .article-title {
      font-size: 24px;
    }

    .article-meta {
      font-size: 13px;
    }
  }

  @media (max-width: 480px) {
    .recent-post {
      flex-direction: column;
      align-items: flex-start;
    }

    .recent-post img {
      width: 100%;
      height: auto;
    }
  }
</style>