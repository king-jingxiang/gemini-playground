<script setup lang="ts">
import { ref, watch } from 'vue'
import { useConfigStore } from '../../stores/configStore'
import BaseModal from '../common/BaseModal.vue'
import BaseButton from '../common/BaseButton.vue'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
}>()

const configStore = useConfigStore()

const localApiKey = ref('')
const localBaseUrl = ref('')
const showApiKey = ref(false)
const isTesting = ref(false)
const testResult = ref<{ success: boolean; message: string } | null>(null)

// 同步配置
watch(() => props.show, (newVal) => {
  if (newVal) {
    localApiKey.value = configStore.apiKey
    localBaseUrl.value = configStore.baseUrl
    testResult.value = null
  }
})

function saveConfig() {
  configStore.setConfig({
    apiKey: localApiKey.value.trim(),
    baseUrl: localBaseUrl.value.trim()
  })
  emit('update:show', false)
  
  // 显示成功提示
  if ((window as any).__showToast) {
    (window as any).__showToast('配置已保存', 'success')
  }
}

async function testConnection() {
  if (!localApiKey.value.trim()) {
    testResult.value = { success: false, message: '请输入 API Key' }
    return
  }
  
  isTesting.value = true
  testResult.value = null
  
  try {
    const { GoogleGenAI } = await import('@google/genai')
    
    const httpOptions: { baseUrl?: string } = {}
    if (localBaseUrl.value.trim()) {
      httpOptions.baseUrl = localBaseUrl.value.trim()
    }
    
    const ai = new GoogleGenAI({
      apiKey: localApiKey.value.trim(),
      httpOptions
    })
    
    // 简单测试 - 获取模型列表或发送简单请求
    await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: 'test',
      config: {
        responseModalities: ['TEXT']
      }
    })
    
    testResult.value = { success: true, message: '连接测试成功！' }
  } catch (error: any) {
    testResult.value = { 
      success: false, 
      message: error.message || '连接测试失败，请检查配置'
    }
  } finally {
    isTesting.value = false
  }
}
</script>

<template>
  <BaseModal
    :show="show"
    title="API 配置"
    width="500px"
    @update:show="emit('update:show', $event)"
  >
    <div class="api-config">
      <div class="security-warning">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 1L2 5v4c0 5.5 3.4 10.5 8 12 4.6-1.5 8-6.5 8-12V5l-8-4z" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M10 6v4M10 12v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <div class="warning-content">
          <strong>安全提示</strong>
          <p>API Key 将存储在浏览器本地存储中，请勿在公共电脑上保存敏感信息。</p>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">
          API Key <span class="required">*</span>
        </label>
        <div class="input-with-toggle">
          <input
            v-model="localApiKey"
            :type="showApiKey ? 'text' : 'password'"
            placeholder="输入您的 Gemini API Key"
            class="form-input"
          />
          <button 
            type="button" 
            class="toggle-btn"
            @click="showApiKey = !showApiKey"
          >
            {{ showApiKey ? '隐藏' : '显示' }}
          </button>
        </div>
        <p class="form-hint">
          从 
          <a href="https://aistudio.google.com/apikey" target="_blank">Google AI Studio</a> 
          获取 API Key
        </p>
      </div>
      
      <div class="form-group">
        <label class="form-label">Base URL <span class="optional">(可选)</span></label>
        <input
          v-model="localBaseUrl"
          type="text"
          placeholder="默认为 https://generativelanguage.googleapis.com"
          class="form-input"
        />
        <p class="form-hint">
          用于配置第三方代理服务地址，留空则使用官方地址
        </p>
      </div>
      
      <div v-if="testResult" class="test-result" :class="testResult.success ? 'success' : 'error'">
        {{ testResult.message }}
      </div>
      
      <div class="form-actions">
        <BaseButton variant="secondary" @click="testConnection" :loading="isTesting">
          测试连接
        </BaseButton>
        <BaseButton @click="saveConfig" :disabled="!localApiKey.trim()">
          保存配置
        </BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.api-config {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.security-warning {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: rgba(251, 188, 4, 0.1);
  border-radius: var(--radius-md);
  color: var(--color-warning);
}

.warning-content strong {
  display: block;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
}

.warning-content p {
  font-size: var(--font-size-xs);
  margin: 0;
  color: var(--text-secondary);
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

.required {
  color: var(--color-error);
}

.optional {
  color: var(--text-tertiary);
  font-weight: normal;
}

.form-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
}

.input-with-toggle {
  display: flex;
  gap: var(--spacing-xs);
}

.input-with-toggle .form-input {
  flex: 1;
}

.toggle-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  cursor: pointer;
  white-space: nowrap;
}

.toggle-btn:hover {
  background: var(--bg-hover);
}

.form-hint {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin: 0;
}

.form-hint a {
  color: var(--color-primary);
}

.test-result {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

.test-result.success {
  background: rgba(52, 168, 83, 0.1);
  color: var(--color-success);
}

.test-result.error {
  background: rgba(234, 67, 53, 0.1);
  color: var(--color-error);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
}
</style>
