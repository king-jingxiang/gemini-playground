<script setup lang="ts">
import { useConfigStore } from '../../stores/configStore'
import BaseButton from '../common/BaseButton.vue'

const emit = defineEmits<{
  openConfig: []
}>()

const configStore = useConfigStore()
</script>

<template>
  <header class="app-header">
    <div class="header-left">
      <div class="logo">
        <svg width="32" height="32" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="header-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4285f4"/>
              <stop offset="50%" style="stop-color:#9b72cb"/>
              <stop offset="100%" style="stop-color:#d96570"/>
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#header-gradient)"/>
          <path d="M50 20 L65 40 L50 80 L35 40 Z" fill="white" opacity="0.9"/>
          <circle cx="50" cy="50" r="10" fill="white"/>
        </svg>
      </div>
      <div class="header-title">
        <h1>Gemini Playground</h1>
        <span class="subtitle">文生图测试平台</span>
      </div>
    </div>
    
    <div class="header-right">
      <div v-if="!configStore.isConfigured" class="config-warning">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L15 14H1L8 1Z" stroke="currentColor" stroke-linejoin="round"/>
          <path d="M8 6V9" stroke="currentColor" stroke-linecap="round"/>
          <circle cx="8" cy="11.5" r="0.5" fill="currentColor"/>
        </svg>
        <span>请先配置 API</span>
      </div>
      <BaseButton size="small" @click="emit('openConfig')">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 10a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor"/>
          <path d="M1.5 8.5v-1l1.5-.5.3-.7-.8-1.4.7-.7 1.4.8.7-.3.5-1.5h1l.5 1.5.7.3 1.4-.8.7.7-.8 1.4.3.7 1.5.5v1l-1.5.5-.3.7.8 1.4-.7.7-1.4-.8-.7.3-.5 1.5h-1l-.5-1.5-.7-.3-1.4.8-.7-.7.8-1.4-.3-.7-1.5-.5z" stroke="currentColor" stroke-linejoin="round"/>
        </svg>
        API 配置
      </BaseButton>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-title h1 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.subtitle {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.config-warning {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(251, 188, 4, 0.1);
  border-radius: var(--radius-sm);
  color: var(--color-warning);
  font-size: var(--font-size-xs);
}

@media (max-width: 768px) {
  .app-header {
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .header-title h1 {
    font-size: var(--font-size-md);
  }
  
  .subtitle {
    display: none;
  }
}
</style>
