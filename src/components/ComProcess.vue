<template>
    <div class="container">
        <h1>Quy trình này dựng website</h1>
        <h2>chuyên nghiệp và hiệu quả</h2>

        <div class="section" v-for="(section, index) in sections" :key="index">
            <img :src="section.image" alt="Icon">
            <div>
                <h3 :class="{ 'active': activeSection === index }" @click="setActiveSection(index)">
                    {{ section.title }}
                </h3>
                <p>{{ section.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ComProcess',
    props: {
        msg: String
    },
    data() {
        return {
            activeSection: null, 
            sections: [
                {
                    title: 'Phân tích nhu cầu',
                    description: 'Chúng tôi bắt đầu bằng việc nghiên cứu kỹ lưỡng các yêu cầu, mục tiêu và thách thức cụ thể mà bạn đang gặp phải. Bằng cách lắng nghe ý kiến và tìm hiểu sâu về lĩnh vực của bạn, chúng tôi đảm bảo mọi giải pháp đề xuất đều xuất phát từ nhu cầu thực tế. Điều này không chỉ giúp xây dựng một chiến lược phù hợp mà còn mang lại sự tối ưu hóa trong từng giai đoạn phát triển. Với quy trình phân tích rõ ràng, chúng tôi cam kết sẽ đồng hành cùng bạn từ bước đầu tiên để hướng đến kết quả vượt mong đợi.',
                    image: require('@/assets/1.png')
                },
                {
                    title: 'Phát triển thiết kế',
                    description: 'Giai đoạn phát triển thiết kế tập trung vào việc hiện thực hóa các ý tưởng sáng tạo, kết hợp giữa thẩm mỹ và chức năng để tạo ra những giải pháp hoàn hảo. Đội ngũ của chúng tôi không chỉ chú trọng vào việc xây dựng giao diện đẹp mắt mà còn đảm bảo sự thân thiện với người dùng, giúp họ có trải nghiệm trực quan và dễ dàng nhất. Các thiết kế của chúng tôi không chỉ đơn thuần là hình ảnh mà còn mang đến giá trị sử dụng thực tế, phù hợp với xu hướng hiện đại và nhu cầu của thị trường.',
                    image: require('@/assets/2.png')
                },
                {
                    title: 'Triển khai giải pháp',
                    description: 'Trong giai đoạn triển khai, chúng tôi tập trung vào việc chuyển đổi các ý tưởng và thiết kế thành những sản phẩm thực tế, đáp ứng đầy đủ các yêu cầu kỹ thuật và chiến lược đã thống nhất. Quy trình triển khai được tối ưu hóa để đảm bảo tiến độ nhanh chóng, hiệu quả cao và không phát sinh rủi ro không cần thiết. Chúng tôi sử dụng công nghệ hiện đại cùng phương pháp quản lý dự án chặt chẽ để đưa sản phẩm của bạn ra thị trường một cách suôn sẻ, vượt trên sự kỳ vọng.',
                    image: require('@/assets/3.png')
                },
                {
                    title: 'Đánh giá và tối ưu hóa',
                    description: 'Sau khi triển khai, chúng tôi không dừng lại ở việc bàn giao sản phẩm mà tiếp tục đồng hành cùng bạn trong giai đoạn đánh giá và tối ưu hóa. Dựa trên các dữ liệu thu thập thực tế, chúng tôi tiến hành đo lường hiệu quả, phát hiện các vấn đề cần cải thiện và đề xuất các điều chỉnh kịp thời. Quy trình tối ưu hóa này giúp bạn không ngừng cải thiện chất lượng sản phẩm hoặc dịch vụ, giữ vững vị trí cạnh tranh trên thị trường và mang lại giá trị lâu dài cho doanh nghiệp của bạn.',
                    image: require('@/assets/4.png')
                }
            ]
        };
    },
    methods: {
        setActiveSection(index) {
            this.activeSection = index;
        }
    }
};
</script>

<style scoped>
    body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 40px;
    background-color: #f5f5f5;
}

.container {
    background-color: #ffffff;
    padding: 41px;
    padding-left: 100px;  /* Tăng khoảng cách bên trái */
    padding-right: 100px; /* Tăng khoảng cách bên phải */
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #5DBBFF;
    font-size: 40px; /* Tăng kích thước chữ */
    margin-bottom: -26px;
}

h2 {
    text-align: center;
    color: #5DBBFF;
    margin-top: 30px;
    font-size: 40px; /* Tăng kích thước chữ */
    margin-bottom: 30px; /* Tăng khoảng cách dưới */
}

h3 {
    color: #5d5d5d;
    font-size: 30px;
    margin-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
}

h1 span {
    color: #5DBBFF;
}
.section {
    display: flex;
    align-items: center;
    margin-bottom: 60px; 
    padding: 20px; 
    background-color: #DCF0FF;
    border-radius: 18px;
    position: relative;
    gap: 20px; 
}

.section img {
    width: 180px; 
    height: auto; 
}

.section h3 {
    margin: 0;
    color: #5d5d5d;
    font-size: 25px; 
    position: relative;
    display: inline-block;
    cursor: pointer;
    transition: color 0.3s ease;
    padding: 10px; 
    line-height: 1.4;
}

.section h3.active {
    color: #0369F0; 
}

.section:first-child h3 {
    background: linear-gradient(to right, #34c759 50%, transparent 50%);
    background-size: 200% 10px;
    background-position: 0 100%;
    background-repeat: no-repeat;
    padding-bottom: 5px;
}

.section p {
    margin: 10px 0 0; 
    color: #5d5d5d;
    font-size: 20px;
    line-height: 1.6; 
}

.section:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -50px; 
    width: 4px;
    height: 40px; 
    background-color: #0369F0;
}

/* Media Queries để làm cho giao diện responsive */
@media screen and (max-width: 1200px) {
    .container {
        padding-left: 60px;
        padding-right: 60px;
    }

    h1 {
        font-size: 35px;
    }

    h2 {
        font-size: 35px;
    }

    .section img {
        width: 150px;
    }

    .section h3 {
        font-size: 24px;
    }

    .section p {
        font-size: 18px;
    }
}

@media screen and (max-width: 768px) {
    .container {
        padding-left: 20px;
        padding-right: 20px;
    }

    h1 {
        font-size: 30px;
    }

    h2 {
        font-size: 30px;
    }

    .section {
        flex-direction: column;
        align-items: flex-start;
        padding: 15px;
    }

    .section img {
        width: 120px;
    }

    .section h3 {
        font-size: 22px;
    }

    .section p {
        font-size: 16px;
    }
}

@media screen and (max-width: 480px) {
    .container {
        padding-left: 10px;
        padding-right: 10px;
    }

    h1 {
        font-size: 25px;
    }

    h2 {
        font-size: 25px;
    }

    .section {
        padding: 10px;
    }

    .section img {
        width: 100px;
    }

    .section h3 {
        font-size: 20px;
    }

    .section p {
        font-size: 14px;
    }
}
</style>