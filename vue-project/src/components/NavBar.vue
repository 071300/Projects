<template>
  <div>
     <nav class="navbar">
    <div class="nav-left">
      <span class="brand">非遗傩戏</span>
    </div>
    <div class="nav-right">
      <router-link to="/" class="nav-link" :class="{ active: currentRoute === '/' }">首页</router-link>
      <router-link to="/origin" class="nav-link" :class="{ active: currentRoute === '/origin' }">傩戏起源</router-link>
      <router-link to="/features" class="nav-link" :class="{ active: currentRoute === '/features' }">傩戏特色</router-link>
      <router-link to="/performances" class="nav-link" :class="{ active: currentRoute === '/performances' }">演出购票</router-link>
    </div>
  </nav>
  </div>
 
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'NavBar',
  setup() {
    const route = useRoute()
    const currentRoute = computed(() => route.path)
    
    return {
      currentRoute
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-left .brand {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
}

.nav-right {
  display: flex;
  gap: 40px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.nav-link:hover {
  color: #ffd700;
}

.nav-link.active {
  color: #ffd700;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #ffd700;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

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
}
</style>