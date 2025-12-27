<template>
  <div class="home-page">
    <!-- 共享导航栏 -->
    <NavBar />
    
    <!-- 主要内容区域 -->
    <div class="main-content">
      <div class="content-wrapper">
        <h1 class="main-title">非遗傩戏起源</h1>
        <div class="description">
          
        </div>
      </div>
    </div>
    
    <!-- 页面其余内容 -->
    <div class="additional-content">
      <div class="content-section">
        <div class="timeline">
          <!-- 雏形初现 -->
          <div class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-text">
                <h3>雏形初现</h3>
                <p>商周时期，傩戏起源于原始社会的驱傩仪式。当时人们通过戴着面具、跳着驱邪舞蹈来祈求平安、驱逐疫病。这种原始的宗教仪式为傩戏的形成奠定了基础。</p>
                <span class="time-period">商周时期 (公元前1600-256年)</span>
              </div>
              <div class="timeline-image">
                <LazyImage 
                  src="/imgs/8.png" 
                  alt="雏形初现"
                  width="100%"
                  height="250px"
                />
              </div>
            </div>
          </div>

          <!-- 形式演变 -->
          <div class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-image">
                <LazyImage 
                  src="/imgs/12.png" 
                  alt="形式演变"
                  width="100%"
                  height="250px"
                />
              </div>
              <div class="timeline-text">
                <h3>形式演变</h3>
                <p>春秋战国时期，傩仪逐渐从单纯的宗教仪式向表演艺术转变。开始出现简单的情节和人物角色，面具制作工艺也有所提升，表演形式更加丰富多样。</p>
                <span class="time-period">春秋战国 (公元前770-221年)</span>
              </div>
            </div>
          </div>

          <!-- 初步成型 -->
          <div class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-text">
                <h3>初步成型</h3>
                <p>汉代时期，傩戏具备了戏剧的基本要素。有了较为完整的故事情节，固定的表演程式，以及专业的表演者群体。傩戏开始成为一种独立的艺术形式。</p>
                <span class="time-period">汉代 (公元前206-公元220年)</span>
              </div>
              <div class="timeline-image">
                <LazyImage 
                  src="/imgs/10.png" 
                  alt="初步成型"
                  width="100%"
                  height="250px"
                />
              </div>
            </div>
          </div>

          <!-- 基本成熟 -->
          <div class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-image">
                <LazyImage 
                  src="/imgs/9.png" 
                  alt="基本成熟"
                  width="100%"
                  height="250px"
                />
              </div>
              <div class="timeline-text">
                <h3>基本成熟</h3>
                <p>唐宋时期，傩戏艺术达到成熟阶段。表演技艺精湛，面具艺术精美，剧本内容丰富。各地形成了独具特色的傩戏流派，如贵州傩戏、江西傩戏等。</p>
                <span class="time-period">唐宋时期 (618-1279年)</span>
              </div>
            </div>
          </div>

          <!-- 广泛传播 -->
          <div class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-text">
                <h3>广泛传播</h3>
                <p>明清时期，傩戏在全国范围内广泛传播。从宫廷到民间，从城市到乡村，傩戏成为重要的文化活动。不同地区结合当地文化特色，发展出多样的表演形式。</p>
                <span class="time-period">明清时期 (1368-1911年)</span>
              </div>
              <div class="timeline-image">
                <LazyImage 
                  src="/imgs/11.png" 
                  alt="广泛传播"
                  width="100%"
                  height="250px"
                />
              </div>
            </div>
          </div>

          <!-- 传承发展 -->
          <div class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-image">
                <LazyImage 
                  src="/imgs/8.png" 
                  alt="传承发展"
                  width="100%"
                  height="250px"
                />
              </div>
              <div class="timeline-text">
                <h3>传承发展</h3>
                <p>现代时期，傩戏被列入非物质文化遗产名录，得到有效保护和传承。在保持传统特色的同时，融入现代元素，焕发出新的艺术生命力，成为中华文化的重要象征。</p>
                <span class="time-period">现代时期 (1912年至今)</span>
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
  name: 'OriginView',
  components: {
    NavBar,
    FooterBar,
    LazyImage
  },
  setup() {
    const { preloadCriticalImages } = useImageOptimization()
    
    const preloadOriginImages = async () => {
      const criticalImages = [
        '/imgs/1.png', // 主背景图
        '/imgs/8.png', // 雏形初现
        '/imgs/12.png', // 形式演变
        '/imgs/10.png', // 初步成型
        '/imgs/9.png', // 基本成熟
        '/imgs/11.png'  // 广泛传播
      ]
      
      try {
        await preloadCriticalImages(criticalImages)
        console.log('起源页面关键图片预加载完成')
      } catch (error) {
        console.warn('起源页面图片预加载失败:', error)
      }
    }
    
    return {
      preloadOriginImages
    }
  },
  mounted() {
    this.preloadOriginImages()
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
  background: linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(219, 216, 199) 100%);
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

/* 时间数轴样式 */
.timeline {
  position: relative;
  padding: 40px 60px 40px 40px;
}

.timeline::before {
  content: '';
  position: absolute;
  right: 30px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #093d57;
  border-radius: 2px;
}

/* 时间轴节点 */
.timeline-item::before {
  content: '';
  position: absolute;
  right: 22px;
  top: 50%;
  width: 20px;
  height: 20px;
  background: #093d57;
  border: 4px solid #fff;
  border-radius: 50%;
  z-index: 3;
  transform: translateY(-50%);
  box-shadow: 0 0 0 3px #093d57;
}

.timeline-item {
  margin-bottom: 60px;
  position: relative;
}

.timeline-content {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-end;
}

.timeline-text {
  flex: 1;
  text-align: left;
  padding: 30px;
  background: #fff;
  border: 2px solid #ddd;
  position: relative;
  margin-right: 80px;
}

.timeline-text h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: bold;
}

.timeline-text p {
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 15px;
}

.time-period {
  display: inline-block;
  font-size: 0.9rem;
  color: #e74c3c;
  font-weight: 600;
  padding: 5px 12px;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 4px;
}

.timeline-image {
  flex: 1;
  max-width: 400px;
  margin-right: 80px;
}

.timeline-image img,
.timeline-image .lazy-image-container {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border: 2px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
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
  
  .timeline {
    padding: 40px 50px 40px 20px;
  }
  
  .timeline::before {
    right: 15px;
  }
  
  .timeline-item::before {
    right: 7px;
  }
  
  .timeline-content {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 5px;
    margin-left: 60px;
  }
  
  .timeline-text {
    width: 100%;
    margin: 0 !important;
    text-align: left;
    margin-right: 60px !important;
  }
  
  .timeline-image {
    width: 100%;
    max-width: none;
    margin-right: 60px;
  }
  

  
  .timeline-text h3 {
    font-size: 1.5rem;
  }
  
  .timeline-text p {
    font-size: 0.95rem;
  }
}
</style>