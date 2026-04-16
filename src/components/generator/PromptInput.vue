<script setup lang="ts">
import { useGeneratorStore } from '../../stores/generatorStore'
import { PLACEHOLDER_PROMPT } from '../../utils/constants'

const store = useGeneratorStore()

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  store.setPrompt(target.value)
}
</script>

<template>
  <div class="prompt-input">
    <label class="field-label">提示词</label>
    <div class="textarea-wrapper">
      <textarea
        :value="store.prompt"
        :placeholder="PLACEHOLDER_PROMPT"
        rows="4"
        class="prompt-textarea"
        @input="handleInput"
      ></textarea>
      <div class="textarea-footer">
        <span class="char-count">{{ store.prompt.length }} 字符</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prompt-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.field-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-secondary);
}

.textarea-wrapper {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  transition: border-color 0.2s ease;
}

.textarea-wrapper:focus-within {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
}

.prompt-textarea {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  background: transparent;
  font-size: var(--font-size-md);
  color: var(--text-primary);
  resize: vertical;
  min-height: 100px;
  outline: none;
  font-family: inherit;
  line-height: 1.5;
}

.prompt-textarea::placeholder {
  color: var(--text-tertiary);
}

.textarea-footer {
  display: flex;
  justify-content: flex-end;
  padding: var(--spacing-xs) var(--spacing-md);
  border-top: 1px solid var(--border-color);
  background: var(--bg-tertiary);
  border-radius: 0 0 var(--radius-md) var(--radius-md);
}

.char-count {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}
</style>
