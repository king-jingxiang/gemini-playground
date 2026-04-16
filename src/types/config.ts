import type { GeminiConfig } from './gemini'

export interface AppConfig extends GeminiConfig {
  isConfigured: boolean
}

export const DEFAULT_CONFIG: GeminiConfig = {
  apiKey: '',
  baseUrl: ''
}

export const STORAGE_KEYS = {
  CONFIG: 'gemini-config',
  PROMPT_HISTORY: 'gemini-prompt-history',
  TEMPLATES: 'gemini-templates',
  GALLERY: 'gemini-gallery'
} as const
