<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { GalleryItem } from '../../types'
import { loadFromStorage, saveToStorage, downloadBase64Image } from '../../utils'
import BaseModal from '../common/BaseModal.vue'

const gallery = ref<GalleryItem[]>([])
const selectedItem = ref<GalleryItem | null>(null)
const showDetail = ref(false)

// 加载画廊数据
onMounted(() => {
  gallery.value = loadFromStorage<GalleryItem[]>('gallery', [])
})

const hasGallery = computed(() => gallery.value.length > 0)

function viewDetail(item: GalleryItem) {
  selectedItem.value = item
  showDetail.value = true
}

function downloadFromGallery(item: GalleryItem) {
  if (item.fullImageBase64) {
    downloadBase64Image(item.fullImageBase64, item.mimeType)
    if ((window as any).__showToast) {
      (window as any).__showToast('图像已下载', 'success')
    }
  }
}

function deleteFromGallery(id: string) {
  gallery.value = gallery.value.filter(item => item.id !== id)
  saveToStorage('gallery', gallery.value)
  
  if (selectedItem.value?.id === id) {
    showDetail.value = false
    selectedItem.value = null
  }
}

function clearGallery() {
  gallery.value = []
  saveToStorage('gallery', [])
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleString('zh-CN')
}
</script>

<template>
  <div class="gallery-panel">
    <div class="panel-header">
      <h3>生成历史</h3>
      <button v-if="hasGallery" class="clear-btn" @click="clearGallery">
        清空
      </button>
    </div>
    
    <div v-if="hasGallery" class="gallery-grid">
      <div
        v-for="item in gallery"
        :key="item.id"
        class="gallery-item"
        @click="viewDetail(item)"
      >
        <img
          :src="`data:image/jpeg;base64,${item.thumbnailBase64}`"
          :alt="item.prompt"
          class="thumbnail"
        />
        <div class="item-overlay">
          <span class="item-model">{{ item.model.split('-')[1] }}</span>
        </div>
      </div>
    </div>
    
    <div v-else class="empty-state">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" stroke-width="2"/>
        <rect x="12" y="16" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/>
        <path d="M42 34L32 24L22 34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p>暂无生成历史</p>
    </div>
    
    <BaseModal v-model:show="showDetail" title="图像详情" width="600px">
      <div v-if="selectedItem" class="detail-content">
        <div class="detail-image">
          <img
            v-if="selectedItem.fullImageBase64"
            :src="`data:${selectedItem.mimeType};base64,${selectedItem.fullImageBase64}`"
            :alt="selectedItem.prompt"
          />
          <div v-else class="image-unavailable">
            <p>完整图像不可用</p>
          </div>
        </div>
        
        <div class="detail-info">
          <div class="info-group">
            <label>提示词</label>
            <p>{{ selectedItem.prompt }}</p>
          </div>
          <div class="info-row">
            <div class="info-group">
              <label>模型</label>
              <p>{{ selectedItem.model }}</p>
            </div>
            <div class="info-group">
              <label>参数</label>
              <p>{{ selectedItem.aspectRatio }} · {{ selectedItem.resolution }}</p>
            </div>
          </div>
          <div class="info-group">
            <label>生成时间</label>
            <p>{{ formatDate(selectedItem.createdAt) }}</p>
          </div>
        </div>
        
        <div class="detail-actions">
          <button class="action-btn danger" @click="deleteFromGallery(selectedItem.id)">
            删除
          </button>
          <button
            class="action-btn primary"
            @click="downloadFromGallery(selectedItem)"
            :disabled="!selectedItem.fullImageBase64"
          >
            下载图像
          </button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<style scoped>
.gallery-panel {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.panel-header h3 {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.clear-btn {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: transparent;
  border: none;
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  cursor: pointer;
}

.clear-btn:hover {
  color: var(--color-error);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  max-height: 300px;
  overflow-y: auto;
}

.gallery-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: pointer;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.gallery-item:hover .thumbnail {
  transform: scale(1.05);
}

.item-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: flex-end;
  padding: var(--spacing-xs);
}

.gallery-item:hover .item-overlay {
  opacity: 1;
}

.item-model {
  font-size: 10px;
  color: white;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xl);
  color: var(--text-tertiary);
}

.empty-state p {
  font-size: var(--font-size-sm);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.detail-image {
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.detail-image img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.image-unavailable {
  padding: var(--spacing-xl);
  color: var(--text-tertiary);
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.info-row {
  display: flex;
  gap: var(--spacing-lg);
}

.info-group {
  flex: 1;
}

.info-group label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin-bottom: var(--spacing-xs);
}

.info-group p {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  margin: 0;
}

.detail-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
}

.action-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
}

.action-btn.primary {
  background: var(--color-primary);
  color: white;
}

.action-btn.primary:hover {
  background: var(--color-primary-hover);
}

.action-btn.primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.danger {
  background: transparent;
  color: var(--color-error);
}

.action-btn.danger:hover {
  background: rgba(234, 67, 53, 0.1);
}
</style>
