<template>
  <picture class="responsive-image">
    <!-- WebP 格式 - 优先级最高 -->
    <source
      v-if="supportsWebP"
      :srcset="generateSrcSet('webp')"
      :sizes="sizes"
      :type="'image/webp'"
    />
    
    <!-- AVIF 格式 - 如果支持 -->
    <source
      v-if="supportsAVIF"
      :srcset="generateSrcSet('avif')"
      :sizes="sizes"
      :type="'image/avif'"
    />
    
    <!-- 传统的 JPEG 格式作为后备 -->
    <img
      :src="getFallbackUrl()"
      :srcset="generateSrcSet('jpg')"
      :sizes="sizes"
      :alt="alt"
      :loading="loading"
      :decoding="decoding"
      :class="['responsive-img', className]"
      :style="{ width: width, height: height }"
      @load="onImageLoad"
      @error="onImageError"
    />
  </picture>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useImageOptimization } from '@/utils/imageOptimizer'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: 'auto'
  },
  loading: {
    type: String,
    default: 'lazy'
  },
  decoding: {
    type: String,
    default: 'async'
  },
  className: {
    type: String,
    default: ''
  },
  sizes: {
    type: String,
    default: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
  },
  breakpoints: {
    type: Array,
    default: () => [320, 640, 768, 1024, 1280, 1536, 1920]
  },
  quality: {
    type: Number,
    default: 0.8
  }
})

const { imageOptimizer } = useImageOptimization()
const supportsWebP = ref(false)
const supportsAVIF = ref(false)

// 检查浏览器支持的图片格式
const checkImageSupport = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  // 检查 WebP 支持
  try {
    const webpData = canvas.toDataURL('image/webp')
    supportsWebP.value = webpData.indexOf('data:image/webp') === 0
  } catch (e) {
    supportsWebP.value = false
  }
  
  // 检查 AVIF 支持
  try {
    const avifData = canvas.toDataURL('image/avif')
    supportsAVIF.value = avifData.indexOf('data:image/avif') === 0
  } catch (e) {
    supportsAVIF.value = false
  }
}

// 生成指定格式的 srcset
const generateSrcSet = (format) => {
  return props.breakpoints
    .map(size => `${imageOptimizer.generateResponsiveUrl(props.src, { 
      width: size, 
      quality: props.quality,
      format 
    })} ${size}w`)
    .join(', ')
}

// 获取后备图片URL
const getFallbackUrl = () => {
  return imageOptimizer.generateResponsiveUrl(props.src, {
    width: 1024,
    quality: props.quality,
    format: 'jpg'
  })
}

const onImageLoad = (event) => {
  event.target.classList.add('loaded')
}

const onImageError = (event) => {
  console.warn(`图片加载失败: ${props.src}`)
  event.target.classList.add('error')
}

onMounted(() => {
  checkImageSupport()
})
</script>

<style scoped>
.responsive-image {
  display: block;
  overflow: hidden;
  border-radius: inherit;
}

.responsive-img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: opacity 0.3s ease;
  border-radius: inherit;
}

.responsive-img:not(.loaded) {
  opacity: 0.7;
}

.responsive-img.loaded {
  opacity: 1;
}

.responsive-img.error {
  opacity: 0.5;
  filter: grayscale(100%);
}

/* 响应式断点优化 */
@media (max-width: 480px) {
  .responsive-img {
    object-position: center;
  }
}

@media (min-width: 1920px) {
  .responsive-img {
    max-width: 1920px;
    margin: 0 auto;
  }
}
</style>