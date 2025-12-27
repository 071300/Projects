// 图片优化工具类
export class ImageOptimizer {
  constructor() {
    this.supportedFormats = ['webp', 'avif', 'jpg', 'png']
  }

  // 检查浏览器支持的格式
  getSupportedFormat() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    // 检查 WebP 支持
    if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
      return 'webp'
    }
    
    // 检查 AVIF 支持
    if (canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0) {
      return 'avif'
    }
    
    return 'jpg'
  }

  // 生成响应式图片URL
  generateResponsiveUrl(originalUrl, options = {}) {
    const {
      width,
      height,
      quality = 0.8,
      format = this.getSupportedFormat()
    } = options

    // 如果是相对路径，转换为绝对路径
    const baseUrl = originalUrl.startsWith('/') ? originalUrl : `/${originalUrl}`
    
    // 这里可以根据实际的后端图片处理服务来调整
    // 例如使用 Cloudinary, ImageKit 等服务
    const params = new URLSearchParams()
    
    if (width) params.append('w', width)
    if (height) params.append('h', height)
    params.append('q', quality)
    params.append('f', format)
    
    return `${baseUrl}?${params.toString()}`
  }

  // 预加载关键图片
  preloadImage(src, priority = 'high') {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      
      if (priority === 'high') {
        link.fetchPriority = 'high'
      }
      
      link.onload = () => {
        document.head.removeChild(link)
        resolve()
      }
      
      link.onerror = () => {
        document.head.removeChild(link)
        reject(new Error(`预加载图片失败: ${src}`))
      }
      
      document.head.appendChild(link)
    })
  }

  // 批量预加载图片
  async preloadImages(urls, concurrency = 3) {
    const results = []
    
    for (let i = 0; i < urls.length; i += concurrency) {
      const batch = urls.slice(i, i + concurrency)
      const batchPromises = batch.map(url => 
        this.preloadImage(url).catch(err => ({ url, error: err.message }))
      )
      
      const batchResults = await Promise.all(batchPromises)
      results.push(...batchResults)
    }
    
    return results
  }

  // 计算最优图片尺寸
  calculateOptimalSize(containerWidth, containerHeight, devicePixelRatio = 1) {
    const width = Math.ceil(containerWidth * devicePixelRatio)
    const height = Math.ceil(containerHeight * devicePixelRatio)
    
    // 限制最大尺寸以避免过大的文件
    const maxWidth = 1920
    const maxHeight = 1080
    
    return {
      width: Math.min(width, maxWidth),
      height: Math.min(height, maxHeight)
    }
  }

  // 生成 srcset 属性
  generateSrcSet(baseUrl, sizes = [320, 640, 768, 1024, 1280, 1536]) {
    return sizes
      .map(size => `${this.generateResponsiveUrl(baseUrl, { width: size })} ${size}w`)
      .join(', ')
  }

  // 生成 sizes 属性
  generateSizes(breakpoints = {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px'
  }) {
    return `(max-width: ${breakpoints.mobile}) 100vw, (max-width: ${breakpoints.tablet}) 50vw, 33vw`
  }
}

// 创建全局实例
export const imageOptimizer = new ImageOptimizer()

// Vue 组合式函数
export function useImageOptimization() {
  const preloadCriticalImages = async (imageUrls) => {
    try {
      await imageOptimizer.preloadImages(imageUrls)
      console.log('关键图片预加载完成')
    } catch (error) {
      console.warn('图片预加载部分失败:', error)
    }
  }

  const getOptimizedImageUrl = (originalUrl, options) => {
    return imageOptimizer.generateResponsiveUrl(originalUrl, options)
  }

  return {
    preloadCriticalImages,
    getOptimizedImageUrl,
    imageOptimizer
  }
}