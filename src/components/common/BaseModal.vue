<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  show: boolean
  title?: string
  width?: string
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  close: []
}>()

function close() {
  emit('update:show', false)
  emit('close')
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    close()
  }
}

// 监听 ESC 键关闭
watch(() => props.show, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-backdrop" @click="handleBackdropClick">
        <div class="modal-container" :style="{ width: width || '480px' }">
          <div v-if="title" class="modal-header">
            <h3 class="modal-title">{{ title }}</h3>
            <button class="modal-close" @click="close">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="modal-content">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-md);
}

.modal-container {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.modal-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.2s ease;
}

.modal-close:hover {
  background: var(--bg-hover);
}

.modal-content {
  padding: var(--spacing-lg);
  overflow-y: auto;
}

/* 过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
}
</style>
