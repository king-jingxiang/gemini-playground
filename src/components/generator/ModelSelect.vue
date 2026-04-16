<script setup lang="ts">
import { useGeneratorStore } from '../../stores/generatorStore'
import { GEMINI_MODELS } from '../../types'

const store = useGeneratorStore()
</script>

<template>
  <div class="model-select">
    <label class="field-label">选择模型</label>
    <div class="model-options">
      <button
        v-for="model in GEMINI_MODELS"
        :key="model.value"
        class="model-option"
        :class="{ active: store.model === model.value }"
        @click="store.setModel(model.value)"
      >
        <span class="model-name">{{ model.label }}</span>
        <span class="model-desc">{{ model.description }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.model-select {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.field-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-secondary);
}

.model-options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.model-option {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.model-option:hover {
  border-color: var(--color-primary);
  background: rgba(66, 133, 244, 0.05);
}

.model-option.active {
  border-color: var(--color-primary);
  background: rgba(66, 133, 244, 0.1);
}

.model-name {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.model-desc {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin-top: 2px;
}
</style>
