<script setup lang="ts">
import { useGeneratorStore } from '../../stores/generatorStore'
import BaseButton from '../common/BaseButton.vue'
import { downloadBase64Image } from '../../utils/download'

const store = useGeneratorStore()

function downloadImage(format: 'png' | 'jpeg') {
  if (!store.currentImage) return
  
  const { base64, mimeType } = store.currentImage
  const extension = format === 'jpeg' ? 'jpg' : 'png'
  const filename = `gemini-${Date.now()}.${extension}`
  
  downloadBase64Image(base64, mimeType, filename)
  
  if ((window as any).__showToast) {
    (window as any).__showToast('图像已下载', 'success')
  }
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleString('zh-CN')
}
</script>

<template>
  <div class="image-display">
    <div class="display-header">
      <h3>生成结果</h3>
    </div>
    
    <div class="display-content">
      <div v-if="store.isGenerating" class="loading-state">
        <div class="loading-spinner"></div>
        <p>正在生成图像，请稍候...</p>
      </div>
      
      <div v-else-if="store.currentImage" class="image-result">
        <div class="image-wrapper">
          <img
            :src="`data:${store.currentImage.mimeType};base64,${store.currentImage.base64}`"
            alt="Generated image"
            class="generated-image"
          />
        </div>
        
        <div class="image-info">
          <div class="info-row">
            <span class="info-label">模型</span>
            <span class="info-value">{{ store.currentImage.model }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">尺寸</span>
            <span class="info-value">{{ store.currentImage.aspectRatio }} · {{ store.currentImage.resolution }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">时间</span>
            <span class="info-value">{{ formatDate(store.currentImage.timestamp) }}</span>
          </div>
        </div>
        
        <div class="download-actions">
          <BaseButton size="small" @click="downloadImage('png')">
            下载 PNG
          </BaseButton>
          <BaseButton size="small" variant="secondary" @click="downloadImage('jpeg')">
            下载 JPEG
          </BaseButton>
        </div>
      </div>
      
      <div v-else class="empty-state">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="12" width="48" height="40" rx="4" stroke="currentColor" stroke-width="2"/>
          <circle cx="24" cy="28" r="6" stroke="currentColor" stroke-width="2"/>
          <path d="M56 44L44 32L32 44" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 44L20 32L32 44" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>输入提示词并点击生成按钮</p>
        <p class="hint">生成的图像将显示在这里</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-display {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.display-header {
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.display-header h3 {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.display-content {
  min-height: 300px;
  display: flex;
  flex-direction: column;
}

.loading-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  color: var(--text-tertiary);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.image-result {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.image-wrapper {
  display: flex;
  justify-content: center;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  overflow: hidden;
}

.generated-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: var(--radius-sm);
}

.image-info {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
}

.info-row {
  display: flex;
  gap: var(--spacing-xs);
}

.info-label {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.info-value {
  font-size: var(--font-size-xs);
  color: var(--text-primary);
  font-weight: 500;
}

.download-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xl);
  color: var(--text-tertiary);
}

.empty-state p {
  margin: 0;
}

.empty-state .hint {
  font-size: var(--font-size-xs);
}
</style>
