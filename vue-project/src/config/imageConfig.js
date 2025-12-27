// 图片优化配置文件
export const IMAGE_CONFIG = {
  // 图片质量设置
  quality: {
    webp: 0.8,
    avif: 0.8,
    jpg: 0.85,
    png: 0.9
  },
  
  // 响应式断点
  breakpoints: {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
    large: 1280,
    xlarge: 1536
  },
  
  // 图片尺寸限制
  maxDimensions: {
    width: 1920,
    height: 1080
  },
  
  // 懒加载配置
  lazyLoad: {
    threshold: 0.1,
    rootMargin: '50px',
    loading: 'lazy'
  },
  
  // 预加载策略
  preload: {
    // 首屏关键图片
    critical: [
      '/imgs/1.png', // 主背景图
      '/imgs/2.png', // 首页主要图片
      '/imgs/3.png'  // 首页次要图片
    ],
    
    // 页面级关键图片
    pageCritical: {
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
        '/imgs/1.3.png',
        '/imgs/1.4.png',
        '/imgs/1.5.png'
      ],
      origin: [
        '/imgs/1.png',
        '/imgs/8.png',
        '/imgs/12.png',
        '/imgs/10.png',
        '/imgs/9.png'
      ],
      performances: [
        '/imgs/1.png',
        '/imgs/4.jpg',
        '/imgs/5.jpg',
        '/imgs/6.jpg',
        '/imgs/7.jpg'
      ]
    }
  },
  
  // 格式优先级
  formatPriority: ['avif', 'webp', 'jpg', 'png'],
  
  // 缓存策略
  cache: {
    // 图片缓存时间（秒）
    maxAge: 31536000, // 1年
    // 缓存控制
    cacheControl: 'public, max-age=31536000, immutable'
  },
  
  // CDN 配置（如果使用）
  cdn: {
    enabled: false,
    baseUrl: 'https://cdn.example.com',
    quality: 80,
    format: 'auto'
  },
  
  // 性能监控
  monitoring: {
    enabled: true,
    sampleRate: 1.0, // 采样率
    threshold: {
      loadTime: 2000, // 加载时间阈值（毫秒）
      size: 1024 * 1024 // 文件大小阈值（字节）
    }
  }
}

// 图片映射表 - 用于动态生成图片路径
export const IMAGE_MAP = {
  // 首页图片
  home: {
    background: '/imgs/1.png',
    exhibition: '/imgs/2.png',
    culture: '/imgs/3.png',
    performances: {
      exorcism: '/imgs/4.jpg',
      prayer: '/imgs/5.jpg',
      mythology: '/imgs/6.jpg',
      harvest: '/imgs/7.jpg'
    }
  },
  
  // 特色页面 - 面具图片
  masks: {
    caishen: '/imgs/1.1.png',
    nuogong: '/imgs/1.2.png',
    nuopo: '/imgs/1.3.png',
    xiaogui: '/imgs/1.4.png',
    xiongshen: '/imgs/1.5.png',
    tudigong: '/imgs/1.6.png',
    kuixing: '/imgs/1.7.png',
    yaowang: '/imgs/1.8.png',
    zhongkui: '/imgs/1.9.png',
    kangjun: '/imgs/2.0.png'
  },
  
  // 起源页面图片
  origin: {
    early: '/imgs/8.png',
    evolution: '/imgs/12.png',
    formation: '/imgs/10.png',
    mature: '/imgs/9.png',
    spread: '/imgs/11.png'
  }
}

// 图片工具函数
export const imageUtils = {
  // 获取图片路径
  getImagePath(category, name) {
    const categoryMap = IMAGE_MAP[category]
    if (!categoryMap) {
      console.warn(`图片类别不存在: ${category}`)
      return null
    }
    
    return categoryMap[name] || null
  },
  
  // 获取订单图片路径
  getOrderImagePath(orderName) {
    const orderImageMap = {
      '驱邪纳福': '/imgs/4.jpg',
      '祈福仪式': '/imgs/5.jpg',
      '神话传说': '/imgs/6.jpg',
      '丰收庆典': '/imgs/7.jpg'
    }
    
    return orderImageMap[orderName] || '/imgs/4.jpg'
  },
  
  // 生成响应式 srcset
  generateSrcSet(baseUrl, widths = Object.values(IMAGE_CONFIG.breakpoints)) {
    return widths
      .map(width => `${baseUrl}?w=${width}&q=${IMAGE_CONFIG.quality.webp} ${width}w`)
      .join(', ')
  },
  
  // 生成 sizes 属性
  generateSizes() {
    return `(max-width: ${IMAGE_CONFIG.breakpoints.tablet}px) 100vw, (max-width: ${IMAGE_CONFIG.breakpoints.desktop}px) 50vw, 33vw`
  },
  
  // 检查是否为关键图片
  isCriticalImage(src) {
    return IMAGE_CONFIG.preload.critical.includes(src) ||
      Object.values(IMAGE_CONFIG.preload.pageCritical)
        .some(pageImages => pageImages.includes(src))
  }
}

export default IMAGE_CONFIG