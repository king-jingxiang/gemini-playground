<script setup lang="ts">
import { useGeneratorStore } from '../../stores/generatorStore'
import { ASPECT_RATIOS, IMAGE_SIZES } from '../../utils/constants'

const store = useGeneratorStore()
</script>

<template>
  <div class="image-params">
    <div class="param-group">
      <label class="field-label">宽高比</label>
      <div class="aspect-ratio-grid">
        <button
          v-for="ratio in ASPECT_RATIOS"
          :key="ratio"
          class="ratio-btn"
          :class="{ active: store.aspectRatio === ratio }"
          @click="store.setAspectRatio(ratio)"
        >
          {{ ratio }}
        </button>
      </div>
    </div>
    
    <div class="param-group">
      <label class="field-label">分辨率</label>
      <div class="resolution-options">
        <button
          v-for="size in IMAGE_SIZES"
          :key="size"
          class="resolution-btn"
          :class="{ active: store.resolution === size }"
          @click="store.setResolution(size)"
        >
          <span class="resolution-value">{{ size }}</span>
          <span class="resolution-label">
            {{ size === '1K' ? '快速' : size === '2K' ? '平衡' : '高清' }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-params {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.param-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.field-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-secondary);
}

.aspect-ratio-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--spacing-xs);
}

.ratio-btn {
  padding: var(--spacing-xs) 0;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: var(--bg-primary);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.ratio-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.ratio-btn.active {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: white;
}

.resolution-options {
  display: flex;
  gap: var(--spacing-sm);
}

.resolution-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.resolution-btn:hover {
  border-color: var(--color-primary);
}

.resolution-btn.active {
  border-color: var(--color-primary);
  background: rgba(66, 133, 244, 0.1);
}

.resolution-value {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
}

.resolution-label {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin-top: 2px;
}
</style>
