<script setup lang="ts">
import { useGeneratorStore } from '../../stores/generatorStore'
import { useConfigStore } from '../../stores/configStore'
import BaseButton from '../common/BaseButton.vue'

const emit = defineEmits<{
  generate: []
}>()

const generatorStore = useGeneratorStore()
const configStore = useConfigStore()

function handleGenerate() {
  if (!configStore.isConfigured) {
    if ((window as any).__showToast) {
      (window as any).__showToast('请先配置 API Key', 'error')
    }
    return
  }
  
  if (!generatorStore.prompt.trim()) {
    if ((window as any).__showToast) {
      (window as any).__showToast('请输入提示词', 'error')
    }
    return
  }
  
  emit('generate')
}
</script>

<template>
  <div class="generate-button">
    <BaseButton
      size="large"
      block
      :disabled="!generatorStore.canGenerate"
      :loading="generatorStore.isGenerating"
      @click="handleGenerate"
    >
      <template v-if="generatorStore.isGenerating">
        生成中...
      </template>
      <template v-else>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L12.5 7L18 8L14 12L15 18L10 15L5 18L6 12L2 8L7.5 7L10 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
        生成图像
      </template>
    </BaseButton>
    
    <div v-if="generatorStore.error" class="error-message">
      {{ generatorStore.error }}
    </div>
  </div>
</template>

<style scoped>
.generate-button {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.error-message {
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(234, 67, 53, 0.1);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--color-error);
}
</style>
