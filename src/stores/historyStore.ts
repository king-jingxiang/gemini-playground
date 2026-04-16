import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { PromptHistoryItem, PromptTemplate } from '../types'
import { MAX_PROMPT_HISTORY } from '../types'
import { loadFromStorage, saveToStorage } from '../utils'

export const useHistoryStore = defineStore('history', () => {
  // 提示词历史
  const promptHistory = ref<PromptHistoryItem[]>(
    loadFromStorage<PromptHistoryItem[]>('prompt-history', [])
  )
  
  // 模板列表
  const templates = ref<PromptTemplate[]>(
    loadFromStorage<PromptTemplate[]>('templates', [])
  )
  
  // 计算属性
  const recentPrompts = computed(() => promptHistory.value.slice(0, 10))
  const hasHistory = computed(() => promptHistory.value.length > 0)
  const hasTemplates = computed(() => templates.value.length > 0)
  
  // 添加提示词到历史
  function addPromptToHistory(prompt: string): void {
    const trimmedPrompt = prompt.trim()
    if (!trimmedPrompt) return
    
    // 移除已存在的相同提示词
    const existingIndex = promptHistory.value.findIndex(
      item => item.prompt === trimmedPrompt
    )
    if (existingIndex > -1) {
      promptHistory.value.splice(existingIndex, 1)
    }
    
    // 添加新记录
    const newItem: PromptHistoryItem = {
      id: `history-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      prompt: trimmedPrompt,
      timestamp: Date.now()
    }
    
    promptHistory.value.unshift(newItem)
    
    // 限制数量
    if (promptHistory.value.length > MAX_PROMPT_HISTORY) {
      promptHistory.value.splice(MAX_PROMPT_HISTORY)
    }
    
    saveToStorage('prompt-history', promptHistory.value)
  }
  
  // 清空历史
  function clearPromptHistory(): void {
    promptHistory.value = []
    saveToStorage('prompt-history', [])
  }
  
  // 删除单条历史
  function deletePromptFromHistory(id: string): void {
    promptHistory.value = promptHistory.value.filter(item => item.id !== id)
    saveToStorage('prompt-history', promptHistory.value)
  }
  
  // 添加模板
  function addTemplate(name: string, prompt: string): void {
    const trimmedName = name.trim()
    const trimmedPrompt = prompt.trim()
    
    if (!trimmedName || !trimmedPrompt) return
    
    const newTemplate: PromptTemplate = {
      id: `template-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: trimmedName,
      prompt: trimmedPrompt,
      createdAt: Date.now()
    }
    
    templates.value.unshift(newTemplate)
    saveToStorage('templates', templates.value)
  }
  
  // 删除模板
  function deleteTemplate(id: string): void {
    templates.value = templates.value.filter(item => item.id !== id)
    saveToStorage('templates', templates.value)
  }
  
  // 更新模板
  function updateTemplate(id: string, name: string, prompt: string): void {
    const index = templates.value.findIndex(item => item.id === id)
    if (index > -1) {
      templates.value[index] = {
        ...templates.value[index],
        name: name.trim(),
        prompt: prompt.trim()
      }
      saveToStorage('templates', templates.value)
    }
  }
  
  return {
    // 状态
    promptHistory,
    templates,
    
    // 计算属性
    recentPrompts,
    hasHistory,
    hasTemplates,
    
    // 方法
    addPromptToHistory,
    clearPromptHistory,
    deletePromptFromHistory,
    addTemplate,
    deleteTemplate,
    updateTemplate
  }
})
