<script setup lang="ts">
import { useHistoryStore } from '../../stores/historyStore'
import { useGeneratorStore } from '../../stores/generatorStore'
import BaseButton from '../common/BaseButton.vue'

const historyStore = useHistoryStore()
const generatorStore = useGeneratorStore()

function useHistoryPrompt(prompt: string) {
  generatorStore.setPrompt(prompt)
}

function formatTime(timestamp: number) {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`
  return date.toLocaleDateString('zh-CN')
}
</script>

<template>
  <div class="prompt-history">
    <div class="section-header">
      <h4>历史记录</h4>
      <BaseButton
        v-if="historyStore.hasHistory"
        variant="text"
        size="small"
        @click="historyStore.clearPromptHistory"
      >
        清空
      </BaseButton>
    </div>
    
    <div v-if="historyStore.hasHistory" class="history-list">
      <div
        v-for="item in historyStore.recentPrompts"
        :key="item.id"
        class="history-item"
        @click="useHistoryPrompt(item.prompt)"
      >
        <p class="history-prompt">{{ item.prompt }}</p>
        <span class="history-time">{{ formatTime(item.timestamp) }}</span>
      </div>
    </div>
    
    <div v-else class="empty-state">
      <p>暂无历史记录</p>
    </div>
  </div>
</template>

<style scoped>
.prompt-history {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-sm);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.section-header h4 {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  max-height: 200px;
  overflow-y: auto;
}

.history-item {
  padding: var(--spacing-sm);
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.2s ease;
}

.history-item:hover {
  background: var(--bg-hover);
}

.history-prompt {
  font-size: var(--font-size-xs);
  color: var(--text-primary);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.history-time {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin-top: var(--spacing-xs);
  display: block;
}

.empty-state {
  text-align: center;
  padding: var(--spacing-md);
  color: var(--text-tertiary);
  font-size: var(--font-size-xs);
}
</style>
