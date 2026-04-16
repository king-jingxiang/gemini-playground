import { ASPECT_RATIOS, IMAGE_SIZES, GEMINI_MODELS } from '../types'

export { ASPECT_RATIOS, IMAGE_SIZES, GEMINI_MODELS }

export const MAX_GALLERY_ITEMS = 50

export const APP_NAME = 'Gemini Playground'
export const APP_DESCRIPTION = 'Gemini 文生图模型测试平台'

export const DEFAULT_ASPECT_RATIO = '16:9'
export const DEFAULT_IMAGE_SIZE = '2K'
export const DEFAULT_MODEL = 'gemini-3.1-flash-image-preview'

export const PLACEHOLDER_PROMPT = '描述你想要生成的图像，例如：一只可爱的橘猫坐在窗边看日落，柔和的暖色调光线，写实风格'

export const ERROR_MESSAGES = {
  NO_API_KEY: '请先配置 API Key',
  NO_PROMPT: '请输入提示词',
  GENERATION_FAILED: '图像生成失败，请稍后重试',
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  INVALID_RESPONSE: '服务器返回数据格式错误'
}

export const SUCCESS_MESSAGES = {
  CONFIG_SAVED: '配置已保存',
  IMAGE_GENERATED: '图像生成成功',
  IMAGE_DOWNLOADED: '图像已下载',
  TEMPLATE_SAVED: '模板已保存'
}
