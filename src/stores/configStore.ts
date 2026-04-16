import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GeminiConfig } from '../types'
import { loadConfig, saveConfig } from '../utils/storage'

export const useConfigStore = defineStore('config', () => {
  const config = ref<GeminiConfig>(loadConfig())
  
  const apiKey = computed(() => config.value.apiKey)
  const baseUrl = computed(() => config.value.baseUrl)
  const isConfigured = computed(() => !!config.value.apiKey)
  
  function setConfig(newConfig: Partial<GeminiConfig>) {
    config.value = { ...config.value, ...newConfig }
    saveConfig(config.value)
  }
  
  function setApiKey(key: string) {
    config.value.apiKey = key
    saveConfig(config.value)
  }
  
  function setBaseUrl(url: string) {
    config.value.baseUrl = url
    saveConfig(config.value)
  }
  
  function clearConfig() {
    config.value = { apiKey: '', baseUrl: '' }
    saveConfig(config.value)
  }
  
  return {
    config,
    apiKey,
    baseUrl,
    isConfigured,
    setConfig,
    setApiKey,
    setBaseUrl,
    clearConfig
  }
})
