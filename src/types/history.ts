// 历史记录相关类型定义

export interface PromptHistoryItem {
  id: string
  prompt: string
  timestamp: number
}

export interface PromptTemplate {
  id: string
  name: string
  prompt: string
  createdAt: number
}

export interface GalleryItem {
  id: string
  thumbnailBase64: string
  fullImageBase64?: string
  prompt: string
  model: string
  aspectRatio: string
  resolution: string
  mimeType: string
  createdAt: number
}

export const MAX_PROMPT_HISTORY = 20
export const MAX_GALLERY_ITEMS = 50
