export function downloadBase64Image(
  base64Data: string,
  mimeType: string,
  filename?: string
): void {
  const link = document.createElement('a')
  const extension = mimeType.split('/')[1] || 'png'
  const defaultFilename = `gemini-image-${Date.now()}.${extension}`
  
  link.href = `data:${mimeType};base64,${base64Data}`
  link.download = filename || defaultFilename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mimeType })
}

export function createImageThumbnail(
  base64Data: string,
  mimeType: string,
  maxWidth: number = 200,
  quality: number = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const scale = maxWidth / img.width
      const width = maxWidth
      const height = img.height * scale
      
      canvas.width = width
      canvas.height = height
      
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Failed to get canvas context'))
        return
      }
      
      ctx.drawImage(img, 0, 0, width, height)
      
      const thumbnailMimeType = 'image/jpeg'
      const thumbnail = canvas.toDataURL(thumbnailMimeType, quality)
      const base64Thumbnail = thumbnail.split(',')[1]
      
      resolve(base64Thumbnail)
    }
    
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = `data:${mimeType};base64,${base64Data}`
  })
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}
