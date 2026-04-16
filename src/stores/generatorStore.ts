import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GeminiModel, AspectRatio, ImageSize, GalleryItem } from '../types'
import { DEFAULT_MODEL, DEFAULT_ASPECT_RATIO, DEFAULT_IMAGE_SIZE, MAX_GALLERY_ITEMS } from '../utils/constants'
import { useConfigStore } from './configStore'
import { useHistoryStore } from './historyStore'
import { GoogleGenAI } from '@google/genai'
import { createImageThumbnail, loadFromStorage, saveToStorage } from '../utils'

export const useGeneratorStore = defineStore('generator', () => {
  const configStore = useConfigStore()
  const historyStore = useHistoryStore()
  
  // 状态
  const model = ref<GeminiModel>(DEFAULT_MODEL)
  const prompt = ref('')
  const aspectRatio = ref<AspectRatio>(DEFAULT_ASPECT_RATIO)
  const resolution = ref<ImageSize>(DEFAULT_IMAGE_SIZE)
  
  // 生成状态
  const isGenerating = ref(false)
  const error = ref<string | null>(null)
  
  // 当前生成的图像
  const currentImage = ref<{
    base64: string
    mimeType: string
    prompt: string
    model: string
    aspectRatio: string
    resolution: string
    timestamp: number
  } | null>(null)
  
  // 计算属性
  const canGenerate = computed(() => {
    return configStore.isConfigured && prompt.value.trim() && !isGenerating.value
  })
  
  // 生成图像
  async function generateImage(): Promise<void> {
    if (!configStore.isConfigured) {
      error.value = '请先配置 API Key'
      return
    }
    
    if (!prompt.value.trim()) {
      error.value = '请输入提示词'
      return
    }
    
    isGenerating.value = true
    error.value = null
    
    try {
      const httpOptions: { baseUrl?: string } = {}
      if (configStore.baseUrl) {
        httpOptions.baseUrl = configStore.baseUrl
      }
      
      const ai = new GoogleGenAI({
        apiKey: configStore.apiKey,
        httpOptions
      })
      
      const response = await ai.models.generateContent({
        model: model.value,
        contents: prompt.value,
        config: {
          imageConfig: {
            aspectRatio: aspectRatio.value,
            imageSize: resolution.value
          },
          responseModalities: ['IMAGE']
        },
        
      } as any)
      
      if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0]
        
        if (candidate.content?.parts) {
          for (const part of candidate.content.parts) {
            if (part.inlineData?.data) {
              const base64Data = part.inlineData.data
              const mimeType = part.inlineData.mimeType || 'image/png'
              
              currentImage.value = {
                base64: base64Data,
                mimeType,
                prompt: prompt.value,
                model: model.value,
                aspectRatio: aspectRatio.value,
                resolution: resolution.value,
                timestamp: Date.now()
              }
              
              // 添加到历史记录
              historyStore.addPromptToHistory(prompt.value)
              
              // 添加到画廊
              await addToGallery({
                base64: base64Data,
                mimeType,
                prompt: prompt.value,
                model: model.value,
                aspectRatio: aspectRatio.value,
                resolution: resolution.value
              })
              
              return
            }
          }
        }
      }
      
      error.value = '服务器返回数据格式错误'
    } catch (err: any) {
      console.error('Image generation failed:', err)
      error.value = err.message || '图像生成失败，请稍后重试'
    } finally {
      isGenerating.value = false
    }
  }
  
  // 添加到画廊
  async function addToGallery(item: {
    base64: string
    mimeType: string
    prompt: string
    model: string
    aspectRatio: string
    resolution: string
  }): Promise<void> {
    try {
      const gallery = loadFromStorage<GalleryItem[]>('gallery', [])
      
      // 创建缩略图
      const thumbnailBase64 = await createImageThumbnail(item.base64, item.mimeType, 200, 0.7)
      
      const newItem: GalleryItem = {
        id: `gallery-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        thumbnailBase64,
        fullImageBase64: item.base64,
        prompt: item.prompt,
        model: item.model,
        aspectRatio: item.aspectRatio,
        resolution: item.resolution,
        mimeType: item.mimeType,
        createdAt: Date.now()
      }
      
      gallery.unshift(newItem)
      
      // 限制数量
      if (gallery.length > MAX_GALLERY_ITEMS) {
        gallery.splice(MAX_GALLERY_ITEMS)
      }
      
      saveToStorage('gallery', gallery)
    } catch (err) {
      console.error('Failed to add to gallery:', err)
    }
  }
  
  // 清空当前图像
  function clearCurrentImage() {
    currentImage.value = null
  }
  
  // 设置提示词
  function setPrompt(newPrompt: string) {
    prompt.value = newPrompt
  }
  
  // 设置模型
  function setModel(newModel: GeminiModel) {
    model.value = newModel
  }
  
  // 设置宽高比
  function setAspectRatio(ratio: AspectRatio) {
    aspectRatio.value = ratio
  }
  
  // 设置分辨率
  function setResolution(size: ImageSize) {
    resolution.value = size
  }
  
  return {
    // 状态
    model,
    prompt,
    aspectRatio,
    resolution,
    isGenerating,
    error,
    currentImage,
    
    // 计算属性
    canGenerate,
    
    // 方法
    generateImage,
    clearCurrentImage,
    setPrompt,
    setModel,
    setAspectRatio,
    setResolution
  }
})
