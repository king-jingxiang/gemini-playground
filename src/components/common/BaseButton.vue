<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'danger' | 'text'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  block?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="base-button"
    :class="[
      `btn-${variant || 'primary'}`,
      `btn-${size || 'medium'}`,
      { 'btn-block': block, 'btn-loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 变体 */
.btn-primary {
  background: var(--color-primary);
  color: var(--text-inverse);
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--border-color);
}

.btn-danger {
  background: var(--color-error);
  color: var(--text-inverse);
}

.btn-danger:hover:not(:disabled) {
  opacity: 0.9;
}

.btn-text {
  background: transparent;
  color: var(--color-primary);
}

.btn-text:hover:not(:disabled) {
  background: rgba(66, 133, 244, 0.1);
}

/* 尺寸 */
.btn-small {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-xs);
}

.btn-medium {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
}

.btn-large {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-md);
}

/* 块级 */
.btn-block {
  width: 100%;
}

/* 加载状态 */
.btn-loading {
  pointer-events: none;
}

.loading-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
