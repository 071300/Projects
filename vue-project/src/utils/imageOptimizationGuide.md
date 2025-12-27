# 图片优化使用指南

本项目已集成了完整的图片优化解决方案，包括懒加载、响应式图片、格式优化和预加载等功能。

## 📁 文件结构

```
src/
├── components/
│   ├── LazyImage.vue          # 懒加载图片组件
│   └── ResponsiveImage.vue    # 响应式图片组件
├── utils/
│   ├── imageOptimizer.js      # 图片优化工具类
│   └── backgroundImageOptimizer.js # 背景图片优化
├── plugins/
│   └── imagePreload.js        # 图片预加载插件
└── styles/
    └── backgroundAnimations.css # 背景图片动画样式
```

## 🚀 使用方法

### 1. 懒加载图片组件 (LazyImage)

适用于非关键图片，当图片进入视口时才加载。

```vue
<template>
  <LazyImage 
    src="/imgs/example.jpg"
    alt="示例图片"
    width="100%"
    height="300px"
    loading="lazy"
    :threshold="0.1"
    rootMargin="50px"
  />
</template>

<script>
import LazyImage from '@/components/LazyImage.vue'

export default {
  components: {
    LazyImage
  }
}
</script>
```

**Props:**
- `src`: 图片路径（必填）
- `alt`: 图片描述
- `width/height`: 容器尺寸
- `loading`: 加载策略（默认 'lazy'）
- `threshold`: 触发阈值（0-1）
- `rootMargin`: 边距偏移

### 2. 响应式图片组件 (ResponsiveImage)

自动选择最优格式（WebP/AVIF/JPEG）和尺寸。

```vue
<template>
  <ResponsiveImage 
    src="/imgs/banner.jpg"
    alt="横幅图片"
    :breakpoints="[320, 640, 768, 1024, 1280]"
    :quality="0.8"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</template>
```

**Props:**
- `src`: 图片路径（必填）
- `breakpoints`: 响应式断点
- `quality`: 图片质量（0-1）
- `sizes`: sizes 属性

### 3. 背景图片优化

```vue
<template>
  <div ref="bgElement" class="hero-section"></div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useBackgroundImageOptimization } from '@/utils/backgroundImageOptimizer'

export default {
  setup() {
    const bgElement = ref(null)
    const { setupOptimizedBackground } = useBackgroundImageOptimization()
    
    onMounted(() => {
      // 懒加载背景图片
      setupOptimizedBackground(bgElement.value, '/imgs/hero.jpg')
      
      // 响应式背景图片
      setupResponsiveBackground(bgElement.value, {
        mobile: '/imgs/hero-mobile.jpg',
        tablet: '/imgs/hero-tablet.jpg',
        desktop: '/imgs/hero-desktop.jpg'
      })
    })
    
    return { bgElement }
  }
}
</script>
```

### 4. 图片预加载

#### 全局预加载（在 main.js 中）

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { createImagePreloadPlugin } from '@/plugins/imagePreload'

const app = createApp(App)

// 安装图片预加载插件
app.use(createImagePreloadPlugin)

app.mount('#app')
```

#### 组件内预加载

```javascript
import { useImageOptimization } from '@/utils/imageOptimizer'

export default {
  setup() {
    const { preloadCriticalImages } = useImageOptimization()
    
    const preloadImages = async () => {
      const criticalImages = [
        '/imgs/hero.jpg',
        '/imgs/main-image.jpg'
      ]
      
      await preloadCriticalImages(criticalImages)
    }
    
    return { preloadImages }
  },
  mounted() {
    this.preloadImages()
  }
}
```

## 🎯 优化策略

### 1. 图片格式优化
- **WebP**: 现代浏览器首选，比 JPEG 小 25-35%
- **AVIF**: 最新格式，比 WebP 还小 20%
- **JPEG**: 兼容性后备方案

### 2. 加载策略
- **懒加载**: 非首屏图片延迟加载
- **预加载**: 关键图片提前加载
- **渐进式**: 先显示低质量占位符

### 3. 响应式适配
- 根据屏幕尺寸提供合适分辨率的图片
- 使用 srcset 和 sizes 属性
- 移动端优先策略

### 4. 性能监控
```javascript
// 监控图片加载性能
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries()
  entries.forEach(entry => {
    if (entry.initiatorType === 'img') {
      console.log(`图片 ${entry.name} 加载时间: ${entry.duration}ms`)
    }
  })
})

observer.observe({ entryTypes: ['resource'] })
```

## 📊 性能提升效果

通过实施这些优化措施，预期可以获得：

- **首屏加载时间减少**: 30-50%
- **带宽使用减少**: 40-60%
- **用户体验提升**: 显著改善
- **SEO 优化**: Core Web Vitals 提升

## 🔧 配置建议

### 1. 图片压缩设置
- WebP 质量: 0.8
- JPEG 质量: 0.85
- 最大宽度: 1920px
- 最大高度: 1080px

### 2. 懒加载配置
- 阈值: 0.1（10% 可见时加载）
- 边距: 50px（提前 50px 开始加载）

### 3. 预加载策略
- 首屏关键图片: 立即预加载
- 次要图片: 路由切换时预加载
- 其他页面: 鼠标悬停时预加载

## 🚨 注意事项

1. **路径问题**: 使用绝对路径 `/imgs/xxx.jpg` 而非相对路径
2. **格式支持**: 自动检测浏览器支持的格式
3. **缓存策略**: 合理设置 HTTP 缓存头
4. **CDN 集成**: 可配合 CDN 进一步优化
5. **服务端支持**: 需要服务端支持图片格式转换

## 🔄 迁移指南

### 从普通 img 标签迁移

```vue
<!-- 之前 -->
<img src="/imgs/photo.jpg" alt="照片" class="photo">

<!-- 之后 -->
<LazyImage 
  src="/imgs/photo.jpg" 
  alt="照片" 
  class="photo"
  height="300px"
/>
```

### 从背景图片迁移

```css
/* 之前 */
.hero {
  background-image: url('/imgs/hero.jpg');
}
```

```vue
<!-- 之后 -->
<script>
import { useBackgroundImageOptimization } from '@/utils/backgroundImageOptimizer'

export default {
  setup() {
    const { setupOptimizedBackground } = useBackgroundImageOptimization()
    
    onMounted(() => {
      const heroElement = document.querySelector('.hero')
      setupOptimizedBackground(heroElement, '/imgs/hero.jpg')
    })
  }
}
</script>
```

通过以上优化方案，你的 Vue 项目的图片性能将得到显著提升！