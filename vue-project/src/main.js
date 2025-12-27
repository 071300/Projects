import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createImagePreloadPlugin } from './plugins/imagePreload'
import { setupRouteBasedPreloading } from './plugins/imagePreload'

// 导入背景图片动画样式和性能监控
import './styles/backgroundAnimations.css'
import { useImagePerformanceMonitor } from './utils/imagePerformanceMonitor'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createImagePreloadPlugin)

// 设置基于路由的图片预加载
setupRouteBasedPreloading(router)

// 初始化图片性能监控
useImagePerformanceMonitor()

app.mount('#app')
