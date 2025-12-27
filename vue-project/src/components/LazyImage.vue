<template>
  <div 
    class="lazy-image-container" 
    ref="containerRef"
    :style="{ width: width, height: height }"
  >
    <img
      v-if="shouldLoad"
      :src="src"
      :alt="alt"
      :class="['lazy-image', { loaded: isLoaded }]"
      @load="onImageLoad"
      @error="onImageError"
      :loading="loading"
      :decoding="decoding"
    />
    <div v-else class="image-placeholder">
      <div class="placeholder-spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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
  threshold: {
    type: Number,
    default: 0.1
  },
  rootMargin: {
    type: String,
    default: '50px'
  }
})

const containerRef = ref(null)
const shouldLoad = ref(false)
const isLoaded = ref(false)
let observer = null

const onImageLoad = () => {
  isLoaded.value = true
}

const onImageError = () => {
  console.warn(`图片加载失败: ${props.src}`)
}

const setupIntersectionObserver = () => {
  if (!('IntersectionObserver' in window)) {
    shouldLoad.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          shouldLoad.value = true
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: props.threshold,
      rootMargin: props.rootMargin
    }
  )

  if (containerRef.value) {
    observer.observe(containerRef.value)
  }
}

onMounted(() => {
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.lazy-image-container {
  overflow: hidden;
  display: inline-block;
  border-radius: inherit;
}

.lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: inherit;
}

.lazy-image.loaded {
  opacity: 1;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: inherit;
}

.placeholder-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>