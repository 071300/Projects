import { useImageOptimization } from '@/utils/imageOptimizer'

// 定义关键图片列表（首页首屏图片）
const CRITICAL_IMAGES = [
  '/imgs/1.png', // 主背景图
  '/imgs/2.png', // 首页主要图片
  '/imgs/3.png'  // 首页次要图片
]

// 定义每个页面的关键图片
const PAGE_CRITICAL_IMAGES = {
  home: [
    '/imgs/1.png',
    '/imgs/2.png',
    '/imgs/3.png',
    '/imgs/4.jpg',
    '/imgs/5.jpg'
  ],
  features: [
    '/imgs/1.png',
    '/imgs/1.1.png',
    '/imgs/1.2.png',
    '/imgs/1.3.png'
  ],
  origin: [
    '/imgs/1.png',
    '/imgs/8.png',
    '/imgs/12.png'
  ],
  performances: [
    '/imgs/1.png'
  ]
}

export const createImagePreloadPlugin = {
  install(app) {
    const { preloadCriticalImages } = useImageOptimization()
    
    // 应用启动时预加载关键图片
    const preloadCriticalResources = async () => {
      try {
        // 预加载通用关键图片
        await preloadCriticalImages(CRITICAL_IMAGES)
        
        // 根据当前路由预加载页面关键图片
        const currentPath = window.location.pathname
        const pageName = getPageNameFromPath(currentPath)
        
        if (PAGE_CRITICAL_IMAGES[pageName]) {
          await preloadCriticalImages(PAGE_CRITICAL_IMAGES[pageName])
        }
        
        console.log('✅ 关键图片预加载完成')
      } catch (error) {
        console.warn('⚠️ 图片预加载失败:', error)
      }
    }
    
    // 延迟预加载，避免阻塞页面渲染
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(preloadCriticalResources, 100)
      })
    } else {
      setTimeout(preloadCriticalResources, 100)
    }
    
    // 提供全局方法
    app.config.globalProperties.$preloadImages = preloadCriticalImages
    app.provide('preloadImages', preloadCriticalImages)
  }
}

// 从路径获取页面名称
function getPageNameFromPath(path) {
  if (path === '/' || path === '/home') return 'home'
  if (path.startsWith('/features')) return 'features'
  if (path.startsWith('/origin')) return 'origin'
  if (path.startsWith('/performances')) return 'performances'
  return 'home'
}

// 路由变化时预加载下一页面的关键图片
export function setupRouteBasedPreloading(router) {
  const { preloadCriticalImages } = useImageOptimization()
  
  router.beforeEach(async (to, from, next) => {
    const pageName = getPageNameFromPath(to.path)
    
    // 异步预加载下一页面的关键图片
    if (PAGE_CRITICAL_IMAGES[pageName]) {
      preloadCriticalImages(PAGE_CRITICAL_IMAGES[pageName])
        .then(() => console.log(`✅ ${pageName}页面图片预加载完成`))
        .catch(error => console.warn(`⚠️ ${pageName}页面图片预加载失败:`, error))
    }
    
    next()
  })
}

// 智能预加载 - 预测用户可能访问的页面
export function setupSmartPreloading() {
  const { preloadCriticalImages } = useImageOptimization()
  
  // 监听鼠标悬停在链接上
  document.addEventListener('mouseover', (e) => {
    const link = e.target.closest('a[href]')
    if (link) {
      const href = link.getAttribute('href')
      const pageName = getPageNameFromPath(href)
      
      if (PAGE_CRITICAL_IMAGES[pageName]) {
        // 鼠标悬停时预加载，延迟100ms避免误触发
        setTimeout(() => {
          preloadCriticalImages(PAGE_CRITICAL_IMAGES[pageName])
        }, 100)
      }
    }
  }, { passive: true })
  
  // 监听页面可见性变化，用户回到页面时预加载
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      // 用户回到页面时预加载首页图片
      preloadCriticalImages(PAGE_CRITICAL_IMAGES.home)
        .then(() => console.log('✅ 页面可见时预加载完成'))
        .catch(error => console.warn('⚠️ 页面可见时预加载失败:', error))
    }
  })
}