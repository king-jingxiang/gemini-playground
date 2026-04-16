<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import ModelSelect from './components/generator/ModelSelect.vue'
import PromptInput from './components/generator/PromptInput.vue'
import ImageParams from './components/generator/ImageParams.vue'
import GenerateButton from './components/generator/GenerateButton.vue'
import ImageDisplay from './components/generator/ImageDisplay.vue'
import PromptHistory from './components/history/PromptHistory.vue'
import PromptTemplates from './components/history/PromptTemplates.vue'
import GalleryPanel from './components/history/GalleryPanel.vue'
import ApiConfig from './components/config/ApiConfig.vue'
import Toast from './components/common/Toast.vue'

import { ref } from 'vue'
import { useGeneratorStore } from './stores/generatorStore'

const store = useGeneratorStore()
const showApiConfig = ref(false)

const openApiConfig = () => {
  showApiConfig.value = true
}

const handleGenerate = async () => {
  await store.generateImage()
}
</script>

<template>
  <div class="app-container">
    <AppHeader @open-config="openApiConfig" />
    
    <main class="main-content">
      <div class="left-panel">
        <div class="config-section">
          <ModelSelect />
          <PromptInput />
          <ImageParams />
          <GenerateButton @generate="handleGenerate" />
        </div>
        
        <div class="history-section">
          <PromptHistory />
          <PromptTemplates />
        </div>
      </div>
      
      <div class="right-panel">
        <ImageDisplay />
        <GalleryPanel />
      </div>
    </main>
    
    <AppFooter />
    
    <ApiConfig v-model:show="showApiConfig" />
    <Toast />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  gap: var(--spacing-lg);
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.left-panel {
  width: 400px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.config-section {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.history-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }
  
  .left-panel {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: var(--spacing-md);
  }
}
</style>
