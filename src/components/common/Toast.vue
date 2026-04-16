<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface ToastMessage {
  id: string
  text: string
  type: 'success' | 'error' | 'info'
}

const messages = ref<ToastMessage[]>([])
let toastId = 0

function addToast(text: string, type: ToastMessage['type'] = 'info', duration = 3000) {
  const id = `toast-${++toastId}`
  messages.value.push({ id, text, type })
  
  if (duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }
  
  return id
}

function removeToast(id: string) {
  const index = messages.value.findIndex(m => m.id === id)
  if (index > -1) {
    messages.value.splice(index, 1)
  }
}

// 全局方法
onMounted(() => {
  ;(window as any).__showToast = addToast
})

onUnmounted(() => {
  delete (window as any).__showToast
})

function getToastIcon(type: ToastMessage['type']) {
  switch (type) {
    case 'success':
      return '✓'
    case 'error':
      return '✕'
    default:
      return 'ℹ'
  }
}
</script>

<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="message in messages"
          :key="message.id"
          class="toast"
          :class="`toast-${message.type}`"
        >
          <span class="toast-icon">{{ getToastIcon(message.type) }}</span>
          <span class="toast-text">{{ message.text }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  max-width: 400px;
}

.toast-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  flex-shrink: 0;
}

.toast-text {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

.toast-success .toast-icon {
  background: var(--color-success);
  color: white;
}

.toast-error .toast-icon {
  background: var(--color-error);
  color: white;
}

.toast-info .toast-icon {
  background: var(--color-primary);
  color: white;
}

/* 过渡动画 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
