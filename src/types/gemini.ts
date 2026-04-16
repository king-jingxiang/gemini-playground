// Gemini API 相关类型定义

export interface GeminiConfig {
  apiKey: string
  baseUrl: string
}

export interface ImageConfig {
  aspectRatio: AspectRatio
  imageSize: ImageSize
}

export type AspectRatio = '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '4:5' | '5:4' | '9:16' | '16:9' | '21:9'
export type ImageSize = '1K' | '2K' | '4K'

export type GeminiModel = 'gemini-3-pro-image-preview' | 'gemini-3.1-flash-image-preview'

export interface GenerateImageParams {
  model: GeminiModel
  prompt: string
  imageConfig: ImageConfig
}

export interface GenerateImageResponse {
  success: boolean
  imageData?: string
  mimeType?: string
  error?: string
}

export const ASPECT_RATIOS: AspectRatio[] = [
  '1:1', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '21:9'
]

export const IMAGE_SIZES: ImageSize[] = ['1K', '2K', '4K']

export const GEMINI_MODELS: { value: GeminiModel; label: string; description: string }[] = [
  {
    value: 'gemini-3.1-flash-image-preview',
    label: 'Gemini 3.1 Flash',
    description: '快速生成，适合日常使用'
  },
  {
    value: 'gemini-3-pro-image-preview',
    label: 'Gemini 3 Pro',
    description: '高质量生成，细节更丰富'
  }
]
