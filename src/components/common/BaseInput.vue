<script setup lang="ts">
defineProps<{
  modelValue: string
  type?: 'text' | 'password'
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="base-input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <div class="input-container" :class="{ 'has-error': error }">
      <input
        :type="type || 'text'"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="base-input"
        @input="handleInput"
      />
    </div>
    <span v-if="error" class="input-error">{{ error }}</span>
  </div>
</template>

<style scoped>
.base-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.input-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-secondary);
}

.input-container {
  position: relative;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  transition: border-color 0.2s ease;
}

.input-container:focus-within {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
}

.input-container.has-error {
  border-color: var(--color-error);
}

.base-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  background: transparent;
  font-size: var(--font-size-md);
  color: var(--text-primary);
  outline: none;
}

.base-input::placeholder {
  color: var(--text-tertiary);
}

.base-input:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.input-error {
  font-size: var(--font-size-xs);
  color: var(--color-error);
}
</style>
