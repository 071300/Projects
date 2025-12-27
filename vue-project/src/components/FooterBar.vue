<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>非遗傩戏文化</h3>
        <p>传承千年的神秘面具艺术</p>
      </div>
      <div class="footer-section">
        <h3>快速链接</h3>
        <router-link to="/" class="footer-link">首页</router-link>
        <router-link to="/origin" class="footer-link">傩戏起源</router-link>
        <router-link to="/features" class="footer-link">傩戏特色</router-link>
        <router-link to="/performances" class="footer-link">演出购票</router-link>
      </div>
      <div class="footer-section">
        <h3>联系我们</h3>
        <p>邮箱: info@nuoxi.com</p>
        <p>电话: 400-123-4567</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 非遗傩戏文化. 版权所有.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar'
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: #fff;
  padding: 40px 0 20px;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  padding: 0 20px;
}

.footer-section h3 {
  color: #ffffff;
  margin-bottom: 20px;
  font-size: 1.3rem;
  font-weight: bold;
}

.footer-section p {
  line-height: 1.6;
  margin-bottom: 10px;
  color: #ecf0f1;
}

.footer-link {
  display: block;
  color: #ecf0f1;
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #ffd700;
}

.footer-bottom {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #bdc3c7;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer {
    padding: 30px 0 15px;
  }
}
</style>