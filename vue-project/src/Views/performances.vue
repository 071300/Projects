<template>
  <div class="home-page">
    <!-- 共享导航栏 -->
    <NavBar />
    
    <!-- 主要内容区域 -->
    <div class="main-content">
      <div class="content-wrapper">
        <h1 class="main-title">非遗傩戏演出</h1>
      </div>
    </div>
    
    <!-- 页面其余内容 -->
    <div class="additional-content">
      <div class="content-section">
        <h2 class="orders-title">我的订单</h2>
        <div class="orders-container">
          <div v-if="orders.length === 0" class="no-orders">
            <p>暂无订单，快去首页选购精彩表演吧！</p>
            <router-link to="/" class="go-home-btn">返回首页</router-link>
          </div>
          <div v-else class="orders-list">
            <div v-for="order in orders" :key="order.id" class="order-item">
              <div class="order-image">
                <LazyImage 
                  :src="getImageForOrder(order.name)" 
                  :alt="order.name"
                  width="100px"
                  height="100px"
                />
              </div>
              <div class="order-info">
                <h3 class="order-name">{{ order.name }}</h3>
                <p class="order-price">￥{{ order.price }}</p>
                <p class="order-date">{{ order.date }}</p>
                <p class="order-status">{{ order.status }}</p>
              </div>
              <div class="order-actions">
                <button class="cancel-btn" @click="cancelOrder(order.id)">取消订单</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部栏 -->
    <FooterBar />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import FooterBar from '../components/FooterBar.vue'
import LazyImage from '../components/LazyImage.vue'
import { useImageOptimization } from '../utils/imageOptimizer'

export default {
  name: 'PerformancesView',
  components: {
    NavBar,
    FooterBar,
    LazyImage
  },
  setup() {
    const { preloadCriticalImages } = useImageOptimization()
    
    const preloadPerformancesImages = async () => {
      const criticalImages = [
        '/imgs/1.png', // 主背景图
        '/imgs/4.jpg', // 订单图片
        '/imgs/5.jpg',
        '/imgs/6.jpg',
        '/imgs/7.jpg'
      ]
      
      try {
        await preloadCriticalImages(criticalImages)
        console.log('演出页面关键图片预加载完成')
      } catch (error) {
        console.warn('演出页面图片预加载失败:', error)
      }
    }
    
    return {
      preloadPerformancesImages
    }
  },
  data() {
    return {
      orders: []
    }
  },
  mounted() {
    this.loadOrders();
    this.preloadPerformancesImages();
  },
  methods: {
    loadOrders() {
      const savedOrders = localStorage.getItem('performanceOrders');
      this.orders = savedOrders ? JSON.parse(savedOrders) : [];
    },
    cancelOrder(orderId) {
      this.orders = this.orders.filter(order => order.id !== orderId);
      localStorage.setItem('performanceOrders', JSON.stringify(this.orders));
    },
    getImageForOrder(orderName) {
      const imageMap = {
        '驱邪纳福': '/imgs/4.jpg',
        '祈福仪式': '/imgs/5.jpg',
        '神话传说': '/imgs/6.jpg',
        '丰收庆典': '/imgs/7.jpg'
      };
      return imageMap[orderName] || '/imgs/4.jpg';
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

.home-page {
  width: 100%;
  min-height: 100vh;
}



/* 主要内容区域 - 优化的背景图 */
.main-content {
  height: 80vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('/imgs/1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background-image 0.5s ease;
}

.main-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading-shimmer 1.5s infinite;
  opacity: 0;
  z-index: -1;
}

.main-content.loading::before {
  opacity: 1;
}

.main-content.loaded::before {
  opacity: 0;
}

.content-wrapper {
  text-align: center;
  color: #fff;
  max-width: 800px;
  padding: 0 20px;
}

.main-title {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
  letter-spacing: 4px;
  animation: fadeInUp 1s ease;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  animation: fadeInUp 1s ease 0.2s both;
}

.description {
  font-size: 1.1rem;
  line-height: 1.8;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
  animation: fadeInUp 1s ease 0.4s both;
}

.description p {
  margin-bottom: 15px;
}

/* 额外内容区域 */
.additional-content {
  min-height: 50vh;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  padding: 80px 50px;
}

.content-section {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.content-section h2 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
  font-weight: bold;
}

.content-section p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
}

/* 订单样式 */
.orders-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 40px;
  font-weight: bold;
}

.orders-container {
  max-width: 800px;
  margin: 0 auto;
}

.no-orders {
  text-align: center;
  padding: 60px 20px;
}

.no-orders p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
}

.go-home-btn {
  display: inline-block;
  background: #ffd700;
  color: #2c3e50;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.go-home-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

.orders-list {
  display: grid;
  gap: 20px;
}

.order-item {
  background: #fff;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
}

.order-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.order-image {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
}

.order-image img,
.order-image .lazy-image-container {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  overflow: hidden;
}

.order-info {
  flex: 1;
}

.order-name {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 600;
}

.order-price {
  font-size: 1.2rem;
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 5px;
}

.order-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
}

.order-status {
  font-size: 0.9rem;
  color: #27ae60;
  font-weight: 600;
}

.order-actions {
  margin-left: 20px;
}

.cancel-btn {
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #c0392b;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(231, 76, 60, 0.3);
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes loading-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}



/* 响应式设计 */
@media (max-width: 768px) {
  .navbar {
    padding: 0 20px;
  }
  
  .nav-left .brand {
    font-size: 18px;
  }
  
  .nav-right {
    gap: 20px;
  }
  
  .nav-link {
    font-size: 14px;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .content-wrapper {
    padding: 0 15px;
  }

}
</style>