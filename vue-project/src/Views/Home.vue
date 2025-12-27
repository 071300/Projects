<template>
  <div class="home-page">
    <!-- 共享导航栏 -->
    <NavBar />
    
    <!-- 主要内容区域 -->
    <div class="main-content">
      <div class="content-wrapper">
        <h1 class="main-title">非遗傩戏文化</h1>
        <p class="subtitle">传承千年的神秘面具艺术</p>
        <div class="description">
          <p>傩戏是中国最古老的戏剧形式之一，被誉为"中国戏剧活化石"。</p>
          <p>它融合了宗教、舞蹈、音乐、面具艺术等多种元素，展现了深厚的历史文化底蕴。</p>
        </div>
      </div>
    </div>
    
    <!-- 页面其余内容 -->
    <div class="additional-content">
      <div class="content-section">
        <div class="exhibition-container">
          <div class="exhibition-image">
            <LazyImage 
              src="/imgs/2.png" 
              alt="傩戏展演"
              width="100%"
              height="100%"
            />
          </div>
          <div class="exhibition-content">
            <div class="text-content">
              <h2>神秘傩戏展演，文化魅力绽放</h2>
              <p>傩戏展演是体验这一古老艺术的最佳方式，通过精心编排的表演，观众可以近距离感受傩戏的独特魅力。</p>
              <p>展演中，演员们佩戴着精美的傩面具，身着传统服饰，配合古老的音乐和舞步，再现了千年之前的祭祀场面。每一个动作都蕴含着深厚的文化内涵，每一个面具都诉说着动人的传说故事。</p>
              <p>通过现代舞台技术的融入，古老的傩戏焕发出新的生机，让观众在欣赏艺术表演的同时，深入了解中华文化的博大精深。</p>
            </div>
            <div class="bottom-image">
              <ResponsiveImage 
                src="/imgs/3.png" 
                alt="傩戏文化"
                class="culture-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Hot-content">
      <div class="hot-title">热门精彩表演</div>
      <div class="performances-grid">
        <div class="performance-card">
          <LazyImage 
            src="/imgs/4.jpg" 
            alt="驱邪纳福" 
            class="performance-img"
            height="200px"
          />
          <h3 class="performance-name">驱邪纳福</h3>
          <p class="performance-desc">传统傩戏表演，驱除邪气，带来福运。演员佩戴神秘面具，演绎古老仪式。</p>
          <div class="purchase-section">
            <p class="performance-price">￥88</p>
            <button class="purchase-btn" @click="purchaseTicket('驱邪纳福', 88)">购买</button>
          </div>
        </div>
        <div class="performance-card">
          <LazyImage 
            src="/imgs/5.jpg" 
            alt="祈福仪式" 
            class="performance-img"
            height="200px"
          />
          <h3 class="performance-name">祈福仪式</h3>
          <p class="performance-desc">庄重的祈福仪式，通过舞蹈和音乐传达美好祝愿，为观众带来平安吉祥。</p>
          <div class="purchase-section">
            <p class="performance-price">￥128</p>
            <button class="purchase-btn" @click="purchaseTicket('祈福仪式', 128)">购买</button>
          </div>
        </div>
        <div class="performance-card">
          <LazyImage 
            src="/imgs/6.jpg" 
            alt="神话传说" 
            class="performance-img"
            height="200px"
          />
          <h3 class="performance-name">神话传说</h3>
          <p class="performance-desc">精彩呈现古代神话故事，精美的面具和传统服饰，让观众感受文化魅力。</p>
          <div class="purchase-section">
            <p class="performance-price">￥168</p>
            <button class="purchase-btn" @click="purchaseTicket('神话传说', 168)">购买</button>
          </div>
        </div>
        <div class="performance-card">
          <LazyImage 
            src="/imgs/7.jpg" 
            alt="丰收庆典" 
            class="performance-img"
            height="200px"
          />
          <h3 class="performance-name">丰收庆典</h3>
          <p class="performance-desc">欢庆丰收的傩戏表演，让观众感受文化魅力，展现农耕文化，寓意五谷丰登、国泰民安。</p>
          <div class="purchase-section">
            <p class="performance-price">￥98</p>
            <button class="purchase-btn" @click="purchaseTicket('丰收庆典', 98)">购买</button>
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
import ResponsiveImage from '../components/ResponsiveImage.vue'
import { useImageOptimization } from '../utils/imageOptimizer'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    FooterBar,
    LazyImage,
    ResponsiveImage
  },
  setup() {
    const { preloadCriticalImages } = useImageOptimization()
    
    // 预加载关键图片
    const preloadHomePageImages = async () => {
      const criticalImages = [
        '/imgs/1.png', // 主背景图
        '/imgs/2.png', // 主要展示图
        '/imgs/3.png', // 次要展示图
        '/imgs/4.jpg', // 表演图片1
        '/imgs/5.jpg', // 表演图片2
        '/imgs/6.jpg', // 表演图片3
        '/imgs/7.jpg'  // 表演图片4
      ]
      
      try {
        await preloadCriticalImages(criticalImages)
        console.log('首页关键图片预加载完成')
      } catch (error) {
        console.warn('首页图片预加载失败:', error)
      }
    }
    
    return {
      preloadHomePageImages
    }
  },
  mounted() {
    // 组件挂载后预加载图片
    this.preloadHomePageImages()
  },
  methods: {
    purchaseTicket(name, price) {
      // 将订单信息存储到本地
      const orders = JSON.parse(localStorage.getItem('performanceOrders') || '[]');
      const newOrder = {
        id: Date.now(),
        name: name,
        price: price,
        date: new Date().toLocaleString(),
        status: '已预订'
      };
      orders.push(newOrder);
      localStorage.setItem('performanceOrders', JSON.stringify(orders));
      
      // 跳转到订单页面
      this.$router.push('/performances');
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
  /* 添加渐进式加载效果 */
  transition: background-image 0.5s ease;
}

/* 背景图片优化 */
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
}

.exhibition-container {
  display: flex;
  align-items: stretch;
  gap: 60px;
  padding: 50px;
  overflow: hidden;
}

.exhibition-image {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
}

.exhibition-image img,
.exhibition-image .lazy-image-container {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease;
  overflow: hidden;
  min-height: 600px;
}

.exhibition-image img:hover,
.exhibition-image .lazy-image-container:hover {
  transform: scale(1.05);
}

.exhibition-content {
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.text-content {
  flex: 0 0 auto;
  margin-bottom: 20px;
}

.bottom-image {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-top: 20px;
  max-height: 350px;
}

.bottom-image img,
.bottom-image .responsive-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease;
  overflow: hidden;
  max-height: 350px;
}

.bottom-image img:hover,
.bottom-image .responsive-image:hover {
  transform: scale(1.05);
}

.exhibition-content h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 25px;
  font-weight: bold;
  line-height: 1.3;
}

.exhibition-content p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 20px;
}

.exhibition-content p:last-child {
  margin-bottom: 0;
}

/* 热门内容区域 */
.Hot-content {
  padding: 80px 50px;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
}

.hot-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 50px;
  font-weight: bold;
  position: relative;
}

.hot-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #ffd700, #ffed4e);
  border-radius: 2px;
}

.performances-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.performance-card {
  background: #fff;
  border: 2px solid #ddd;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.performance-card:hover {
  transform: translateY(-5px);
}

.performance-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  border-radius: 10px 10px 0 0;
}

.performance-img .lazy-image-container {
  border-radius: 10px 10px 0 0;
}

.performance-name {
  font-size: 1.3rem;
  color: #2c3e50;
  margin: 15px 20px 10px;
  font-weight: 600;
}

.performance-price {
  font-size: 1.1rem;
  color: #e74c3c;
  font-weight: bold;
  margin: 0 20px 15px;
}

.performance-desc {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin: 0 20px 20px;
  display: -webkit-box;
  /* -webkit-line-clamp: 3; */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.purchase-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 20px;
  border-top: 1px solid #eee;
  margin-top: auto;
}

.purchase-btn {
  background: #ffd700;
  color: #2c3e50;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.purchase-btn:hover {
  background: #ffed4e;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
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
  
  .additional-content {
    padding: 50px 20px;
  }
  
  .exhibition-container {
    flex-direction: column;
    gap: 40px;
    padding: 30px;
  }
  
  .exhibition-image {
    min-width: auto;
    width: 100%;
    min-height: 300px;
  }
  
  .exhibition-image img,
  .exhibition-image .lazy-image-container {
    border-radius: 8px;
    min-height: 300px;
  }
  
  .exhibition-content {
    text-align: center;
  }
  
  .text-content {
    text-align: center;
  }
  
  .bottom-image {
    margin-top: 30px;
    max-height: 200px;
  }
  
  .bottom-image img,
  .bottom-image .responsive-image {
    border-radius: 8px;
    max-height: 200px;
  }
  
  .exhibition-content h2 {
    font-size: 2rem;
  }
  
  .exhibition-content p {
    font-size: 1.1rem;
  }
  
  .Hot-content {
    padding: 50px 20px;
  }
  
  .hot-title {
    font-size: 2rem;
    margin-bottom: 40px;
  }
  
  .performances-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .performance-img {
    border-radius: 8px 8px 0 0;
  }
  
  .performance-img .lazy-image-container {
    border-radius: 8px 8px 0 0;
  }
  
  .performance-img {
    height: 150px;
  }
  
  .performance-name {
    font-size: 1.1rem;
    margin: 12px 15px 8px;
  }
  
  .performance-price {
    font-size: 1rem;
    margin: 0 15px 12px;
  }
  
  .performance-desc {
    font-size: 0.9rem;
    margin: 0 15px 15px;
  }
}

@media (max-width: 480px) {
  .performances-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}

/* 加载动画 */
@keyframes loading-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* 淡入动画 */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式优化 */
@media (max-width: 768px) {
  .main-content {
    height: 70vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('/imgs/1.png');
    background-position: center center;
  }
}

@media (max-width: 480px) {
  .main-content {
    height: 60vh;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .main-content {
    filter: contrast(1.2);
  }
}

/* 减少动画模式 */
@media (prefers-reduced-motion: reduce) {
  .main-content::before {
    animation: none;
  }
  
  .main-content {
    transition: none;
  }
}
</style>