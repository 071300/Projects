<template>
  <div class="home-page">
    <!-- 共享导航栏 -->
    <NavBar />
    
    <!-- 主要内容区域 -->
    <div class="main-content">
      <div class="content-wrapper">
        <h1 class="main-title">非遗傩戏特色</h1>
      </div>
    </div>
    
    <!-- 页面其余内容 -->
    <div class="additional-content">
      <div class="content-section">
        <h2 class="mask-title">面具艺术</h2>
        <div class="masks-grid">
          <div class="mask-item">
            <div class="mask-image">
              <LazyImage 
                src="/imgs/1.1.png" 
                alt="财神面具"
                width="100%"
                height="200px"
              />
            </div>
            <h3 class="mask-name">财神面具</h3>
            <p class="mask-desc">招财进宝，富贵吉祥，象征财富与好运</p>
          </div>
          
          <div class="mask-item">
            <div class="mask-image">
              <LazyImage 
                src="/imgs/1.2.png" 
                alt="傩公面具"
                width="100%"
                height="200px"
              />
            </div>
            <h3 class="mask-name">傩公面具</h3>
            <p class="mask-desc">傩戏主角，威严庄重，驱邪保平安</p>
          </div>
          
          <div class="mask-item">
            <div class="mask-image">
              <LazyImage 
                src="/imgs/1.3.png" 
                alt="傩婆面具"
                width="100%"
                height="200px"
              />
            </div>
            <h3 class="mask-name">傩婆面具</h3>
            <p class="mask-desc">温和慈祥，保佑家庭平安健康</p>
          </div>
          
          <div class="mask-item">
            <div class="mask-image">
              <LazyImage 
                src="/imgs/1.4.png" 
                alt="小鬼面具"
                width="100%"
                height="200px"
              />
            </div>
            <h3 class="mask-name">小鬼面具</h3>
            <p class="mask-desc">活泼俏皮，象征驱除小病小灾</p>
          </div>
          
          <div class="mask-item">
            <div class="mask-image">
              <LazyImage 
                src="/imgs/1.5.png" 
                alt="凶神面具"
                width="100%"
                height="200px"
              />
            </div>
            <h3 class="mask-name">凶神面具</h3>
            <p class="mask-desc">威猛凶悍，专门驱除重大邪恶</p>
          </div>
          
          <div class="mask-item">
            <div class="mask-image">
              <LazyImage 
                src="/imgs/1.6.png" 
                alt="土地公面具"
                width="100%"
                height="200px"
              />
            </div>
            <h3 class="mask-name">土地公面具</h3>
            <p class="mask-desc">守护土地，保佑五谷丰登</p>
          </div>
          
          <div class="mask-item">
            <div class="mask-image">
              <LazyImage 
                src="/imgs/1.7.png" 
                alt="魁星面具"
                width="100%"
                height="200px"
              />
            </div>
            <h3 class="mask-name">魁星面具</h3>
            <p class="mask-desc">文曲星下凡，保佑学业有成</p>
          </div>
          
          <div class="mask-item">
            <div class="mask-image">
              <LazyImage 
                src="/imgs/1.8.png" 
                alt="药王面具"
                width="100%"
                height="200px"
              />
            </div>
            <h3 class="mask-name">药王面具</h3>
            <p class="mask-desc">医术高明，保佑身体健康无病</p>
          </div>
          
          <div class="mask-item">
            <div class="mask-image">
              <LazyImage 
                src="/imgs/1.9.png" 
                alt="钟馗面具"
                width="100%"
                height="200px"
              />
            </div>
            <h3 class="mask-name">钟馗面具</h3>
            <p class="mask-desc">捉鬼天师，专门驱邪避煞</p>
          </div>
          
          <div class="mask-item">
            <div class="mask-image">
              <LazyImage 
                src="/imgs/2.0.png" 
                alt="炕君面具"
                width="100%"
                height="200px"
              />
            </div>
            <h3 class="mask-name">炕君面具</h3>
            <p class="mask-desc">守护灶台，保佑家庭温暖和睦</p>
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
  name: 'FeaturesView',
  components: {
    NavBar,
    FooterBar,
    LazyImage
  },
  setup() {
    const { preloadCriticalImages } = useImageOptimization()
    
    const preloadFeaturesImages = async () => {
      const criticalImages = [
        '/imgs/1.png', // 主背景图
        '/imgs/1.1.png', // 财神面具
        '/imgs/1.2.png', // 傩公面具
        '/imgs/1.3.png', // 傩婆面具
        '/imgs/1.4.png', // 小鬼面具
        '/imgs/1.5.png', // 凶神面具
        '/imgs/1.6.png', // 土地公面具
        '/imgs/1.7.png', // 魁星面具
        '/imgs/1.8.png', // 药王面具
        '/imgs/1.9.png', // 钟馗面具
        '/imgs/2.0.png'  // 炕君面具
      ]
      
      try {
        await preloadCriticalImages(criticalImages)
        console.log('特色页面关键图片预加载完成')
      } catch (error) {
        console.warn('特色页面图片预加载失败:', error)
      }
    }
    
    return {
      preloadFeaturesImages
    }
  },
  mounted() {
    this.preloadFeaturesImages()
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

/* 面具艺术样式 */
.mask-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 50px;
  font-weight: bold;
  position: relative;
  display: inline-block;
}

.mask-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #ffd700, #ffed4e);
  border-radius: 2px;
}

.masks-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
  margin-top: 40px;
}

.mask-item {
  text-align: center;
  padding: 20px;
  background: transparent;
}

.mask-image {
  width: 120px;
  height: 120px;
  margin: 0 auto 15px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mask-image img,
.mask-image .lazy-image-container {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  overflow: hidden;
}

.mask-name {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 8px;
  font-weight: 600;
}

.mask-desc {
  font-size: 0.5rem;
  color: #666;
  line-height: 1.4;
  margin: 0;
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
  
  .masks-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .mask-image {
    width: 100px;
    height: 100px;
  }
  
  .mask-name {
    font-size: 1rem;
  }
  
  .mask-desc {
    font-size: 0.85rem;
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

@media (max-width: 480px) {
  .masks-grid {
    grid-template-columns: 1fr;
  }
}
</style>