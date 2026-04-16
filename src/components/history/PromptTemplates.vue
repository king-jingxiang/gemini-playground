<script setup lang="ts">
import { ref } from 'vue'
import { useHistoryStore } from '../../stores/historyStore'
import { useGeneratorStore } from '../../stores/generatorStore'
import BaseButton from '../common/BaseButton.vue'
import BaseModal from '../common/BaseModal.vue'

const historyStore = useHistoryStore()
const generatorStore = useGeneratorStore()

const showAddModal = ref(false)
const newTemplateName = ref('')
const newTemplatePrompt = ref('')

function useTemplate(prompt: string) {
  generatorStore.setPrompt(prompt)
}

function openAddModal() {
  newTemplateName.value = ''
  newTemplatePrompt.value = generatorStore.prompt
  showAddModal.value = true
}

function saveTemplate() {
  if (!newTemplateName.value.trim() || !newTemplatePrompt.value.trim()) {
    return
  }
  
  historyStore.addTemplate(newTemplateName.value.trim(), newTemplatePrompt.value.trim())
  showAddModal.value = false
  
  if ((window as any).__showToast) {
    (window as any).__showToast('模板已保存', 'success')
  }
}

function deleteTemplate(id: string) {
  historyStore.deleteTemplate(id)
}
</script>

<template>
  <div class="prompt-templates">
    <div class="section-header">
      <h4>收藏模板</h4>
      <BaseButton variant="text" size="small" @click="openAddModal">
        + 添加
      </BaseButton>
    </div>
    
    <div v-if="historyStore.hasTemplates" class="template-list">
      <div
        v-for="template in historyStore.templates"
        :key="template.id"
        class="template-item"
      >
        <div class="template-content" @click="useTemplate(template.prompt)">
          <span class="template-name">{{ template.name }}</span>
          <span class="template-prompt">{{ template.prompt }}</span>
        </div>
        <button class="delete-btn" @click.stop="deleteTemplate(template.id)">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
    
    <div v-else class="empty-state">
      <p>暂无收藏模板</p>
      <p class="hint">点击"添加"保存常用提示词</p>
    </div>
    
    <BaseModal v-model:show="showAddModal" title="添加模板" width="400px">
      <div class="add-template-form">
        <div class="form-group">
          <label class="form-label">模板名称</label>
          <input
            v-model="newTemplateName"
            type="text"
            class="form-input"
            placeholder="例如：办公场景人物"
          />
        </div>
        <div class="form-group">
          <label class="form-label">提示词内容</label>
          <textarea
            v-model="newTemplatePrompt"
            class="form-textarea"
            rows="4"
            placeholder="输入提示词"
          ></textarea>
        </div>
        <div class="form-actions">
          <BaseButton variant="secondary" @click="showAddModal = false">
            取消
          </BaseButton>
          <BaseButton @click="saveTemplate" :disabled="!newTemplateName.trim() || !newTemplatePrompt.trim()">
            保存
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<style scoped>
.prompt-templates {
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

.template-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  max-height: 200px;
  overflow-y: auto;
}

.template-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
}

.template-content {
  flex: 1;
  cursor: pointer;
  min-width: 0;
}

.template-name {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--text-primary);
}

.template-prompt {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  border-radius: var(--radius-sm);
  color: var(--text-tertiary);
  cursor: pointer;
  flex-shrink: 0;
}

.delete-btn:hover {
  background: rgba(234, 67, 53, 0.1);
  color: var(--color-error);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-md);
  color: var(--text-tertiary);
  font-size: var(--font-size-xs);
}

.empty-state .hint {
  font-size: 10px;
  margin-top: var(--spacing-xs);
}

.add-template-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  font-family: inherit;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--border-focus);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  padding-top: var(--spacing-sm);
}
</style>
