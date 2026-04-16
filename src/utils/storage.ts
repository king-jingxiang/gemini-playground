import type { GeminiConfig } from '../types'

const STORAGE_PREFIX = 'gemini-'

export function getStorageKey(key: string): string {
  return STORAGE_PREFIX + key
}

export function saveToStorage<T>(key: string, data: T): void {
  try {
    const fullKey = getStorageKey(key)
    localStorage.setItem(fullKey, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const fullKey = getStorageKey(key)
    const data = localStorage.getItem(fullKey)
    return data ? JSON.parse(data) : defaultValue
  } catch (error) {
    console.error('Failed to load from localStorage:', error)
    return defaultValue
  }
}

export function removeFromStorage(key: string): void {
  try {
    const fullKey = getStorageKey(key)
    localStorage.removeItem(fullKey)
  } catch (error) {
    console.error('Failed to remove from localStorage:', error)
  }
}

export function saveConfig(config: GeminiConfig): void {
  saveToStorage('config', config)
}

export function loadConfig(): GeminiConfig {
  return loadFromStorage<GeminiConfig>('config', { apiKey: '', baseUrl: '' })
}
