<script setup lang="ts">
defineProps<{
  modelValue: string
  options: { value: string; label: string }[]
  label?: string
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="base-select-wrapper">
    <label v-if="label" class="select-label">{{ label }}</label>
    <div class="select-container">
      <select
        :value="modelValue"
        :disabled="disabled"
        class="base-select"
        @change="handleChange"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <span class="select-arrow">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
  </div>
</template>

<style scoped>
.base-select-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.select-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-secondary);
}

.select-container {
  position: relative;
}

.base-select {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-xl) var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  font-size: var(--font-size-md);
  color: var(--text-primary);
  cursor: pointer;
  appearance: none;
  outline: none;
  transition: border-color 0.2s ease;
}

.base-select:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
}

.base-select:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.select-arrow {
  position: absolute;
  right: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-tertiary);
}
</style>
