// 图片性能监控工具
export class ImagePerformanceMonitor {
  constructor() {
    this.imageStats = {
      totalImages: 0,
      loadedImages: 0,
      failedImages: 0,
      loadTimeSum: 0,
      averageLoadTime: 0,
      optimizedImages: new Set(),
      formatUsage: {
        webp: 0,
        avif: 0,
        jpg: 0,
        png: 0
      }
    }
    this.observers = []
    this.init()
  }

  init() {
    // 监听所有图片加载
    if (typeof window !== 'undefined') {
      this.observeImageLoading()
      this.setupPerformanceObserver()
    }
  }

  // 监控图片加载
  observeImageLoading() {
    const imgObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'IMG') {
              this.trackImage(node)
            }
            // 检查子元素中的图片
            const images = node.querySelectorAll?.('img') || []
            images.forEach(img => this.trackImage(img))
          }
        })
      })
    })

    imgObserver.observe(document.body, {
      childList: true,
      subtree: true
    })

    this.observers.push(imgObserver)
  }

  // 跟踪单个图片
  trackImage(img) {
    this.imageStats.totalImages++
    
    const startTime = performance.now()
    
    img.addEventListener('load', () => {
      const loadTime = performance.now() - startTime
      this.imageStats.loadedImages++
      this.imageStats.loadTimeSum += loadTime
      this.imageStats.averageLoadTime = this.imageStats.loadTimeSum / this.imageStats.loadedImages
      
      // 分析图片格式
      const format = this.getImageFormat(img.src)
      if (this.imageStats.formatUsage[format] !== undefined) {
        this.imageStats.formatUsage[format]++
      }
      
      // 检查是否为优化图片
      // if (this.isOptimizedImage(img)) {
      //   this.imageStats.optimizedImages.add(img.src)
      // }
      
      console.log(`🖼️ 图片加载完成: ${img.src} (${loadTime.toFixed(2)}ms)`)
    })
    
    img.addEventListener('error', () => {
      this.imageStats.failedImages++
      console.warn(`❌ 图片加载失败: ${img.src}`)
    })
  }

  // 获取图片格式
  getImageFormat(src) {
    if (src.includes('.webp') || src.includes('format=webp')) return 'webp'
    if (src.includes('.avif') || src.includes('format=avif')) return 'avif'
    if (src.includes('.jpg') || src.includes('.jpeg')) return 'jpg'
    if (src.includes('.png')) return 'png'
    return 'unknown'
  }

  // 检查是否为优化图片
  isOptimizedImage(img) {
    const src = img.src
    return (
      src.includes('format=') || // 有格式转换
      src.includes('q=') ||     // 有质量参数
      src.includes('w=') ||     // 有宽度参数
      src.includes('h=') ||     // 有高度参数

      img.hasAttribute('loading') || // 有懒加载属性
      img.hasAttribute('decoding') // 有解码属性
    )
  }

  // 设置性能观察者
  setupPerformanceObserver() {
    if (window.PerformanceObserver) {
      const perfObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach(entry => {
          if (entry.initiatorType === 'img') {
            this.analyzeImagePerformance(entry)
          }
        })
      })
      
      perfObserver.observe({ entryTypes: ['resource'] })
      this.observers.push(perfObserver)
    }
  }

  // 分析图片性能
  analyzeImagePerformance(entry) {
    const {
      name,
      duration,
      transferSize,
      encodedBodySize
    } = entry
    
    const compressionRatio = encodedBodySize ? (1 - transferSize / encodedBodySize) * 100 : 0
    
    console.log(`📊 图片性能分析:
      - 文件: ${name}
      - 加载时间: ${duration.toFixed(2)}ms
      - 传输大小: ${(transferSize / 1024).toFixed(2)}KB
      - 压缩率: ${compressionRatio.toFixed(1)}%
    `)
  }

  // 获取统计信息
  getStats() {
    return {
      ...this.imageStats,
      optimizationRate: this.imageStats.totalImages > 0 
        ? (this.imageStats.optimizedImages.size / this.imageStats.totalImages * 100).toFixed(1)
        : 0,
      successRate: this.imageStats.totalImages > 0
        ? (this.imageStats.loadedImages / this.imageStats.totalImages * 100).toFixed(1)
        : 0
    }
  }

  // 打印统计报告
  printStats() {
    const stats = this.getStats()
    console.group('📈 图片性能统计报告')
    console.log(`总图片数: ${stats.totalImages}`)
    console.log(`成功加载: ${stats.loadedImages}`)
    console.log(`加载失败: ${stats.failedImages}`)
    console.log(`优化率: ${stats.optimizationRate}%`)
    console.log(`成功率: ${stats.successRate}%`)
    console.log(`平均加载时间: ${stats.averageLoadTime.toFixed(2)}ms`)
    console.log('格式使用情况:', stats.formatUsage)
    console.groupEnd()
  }

  // 生成优化建议
  generateOptimizationSuggestions() {
    const stats = this.getStats()
    const suggestions = []
    
    if (parseFloat(stats.optimizationRate) < 80) {
      suggestions.push('💡 建议使用更多的优化图片（懒加载、格式转换等）')
    }
    
    if (stats.averageLoadTime > 1000) {
      suggestions.push('⚡ 平均加载时间较长，建议优化图片大小或使用CDN')
    }
    
    if (stats.formatUsage.webp + stats.formatUsage.avif < stats.totalImages * 0.5) {
      suggestions.push('🎨 建议更多使用现代图片格式（WebP/AVIF）')
    }
    
    if (stats.failedImages > 0) {
      suggestions.push('❌ 有图片加载失败，请检查图片路径')
    }
    
    return suggestions
  }

  // 清理观察者
  cleanup() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// 创建全局实例
export const imageMonitor = new ImagePerformanceMonitor()

// Vue 组合式函数
export function useImagePerformanceMonitor() {
  const getStats = () => imageMonitor.getStats()
  const printStats = () => imageMonitor.printStats()
  const getSuggestions = () => imageMonitor.generateOptimizationSuggestions()
  
  // 自动打印统计信息（开发环境）
  if (import.meta.env.DEV) {
    setTimeout(() => {
      printStats()
      const suggestions = getSuggestions()
      // if (suggestions.length > 0) {
      //   console.log('💡 优化建议:', suggestions)
      // }
    }, 5000) // 页面加载5秒后统计
  }
  
  return {
    getStats,
    printStats,
    getSuggestions,
    imageMonitor
  }
}