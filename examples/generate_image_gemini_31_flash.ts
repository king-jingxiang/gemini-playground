/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import {GoogleGenAI} from '@google/genai';
import * as types from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径（ES 模块兼容）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 从环境变量获取 API 密钥和基础 URL
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_BASE_URL = process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com';

async function generateImageWithGemini31Flash() {
  // 初始化 Google GenAI 客户端
  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
    httpOptions: {
      baseUrl: GEMINI_BASE_URL,
    },
  });

  console.log('[Image Generation] 开始使用 gemini-3.1-flash-image-preview 生成图像...');

  // 定义提示词
  const prompt = 'A futuristic cityscape at sunset with flying cars and neon lights';

  // 设置图像配置：2K 分辨率，16:9 宽高比
  const aspectRatio = '9:16'; //'16:9'; // 支持的宽高比: "1:1","2:3","3:2","3:4","4:3","4:5","5:4","9:16","16:9","21:9"
  const resolution = '2K';    // 支持的分辨率: "1K", "2K", "4K"

  try {
    // 调用 generateContent 方法生成图像
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: prompt,
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          imageSize: resolution,
        },
        // 指定响应模态为图像
        responseModalities: ['IMAGE'],
      },
    });

    console.log('[Image Generation] 图像生成成功！');

    // 处理响应中的图像数据
    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      
      if (candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.text) {
            console.log('文本响应:', part.text);
          } else if (part.inlineData && part.inlineData.data) {
            // 获取 base64 编码的图像数据
            const base64ImageBytes: string = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/png';
                      
            // 创建数据 URL,可用于在浏览器中显示或保存到文件
            const imageUrl = `data:${mimeType};base64,${base64ImageBytes}`;
                      
            console.log(`图像已生成 (MIME类型: ${mimeType})`);
            console.log('图像数据URL前缀:', imageUrl.substring(0, 50) + '...');
                      
            // 保存图像到本地文件
            const fileExtension = mimeType.split('/')[1] || 'png';
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const fileName = `generated_image_${timestamp}.${fileExtension}`;
            const filePath = path.join(__dirname, fileName);
            
            const buffer = Buffer.from(base64ImageBytes, 'base64');
            fs.writeFileSync(filePath, buffer);
            console.log(`图像已保存为: ${filePath}`);
            console.log(`图像大小: ${(buffer.length / 1024).toFixed(2)} KB`);
          }
        }
      }
    } else {
      console.log('[Image Generation] 未收到有效的响应候选者');
    }

  } catch (error) {
    console.error('[Image Generation] 图像生成失败:', error);
    throw error;
  }
}

// 执行图像生成函数
generateImageWithGemini31Flash().catch(console.error);