# Gemini Playground

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.5-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

一个基于 Google Gemini AI 的图像生成 Web 应用，提供友好的用户界面来使用 Gemini 3 Pro 和 Gemini 3.1 Flash 模型进行文本到图像的生成。

## 🌟 特性

- 🎨 **文本生成图像** - 使用 Gemini AI 模型将文字描述转换为高质量图像
- 🤖 **多模型支持** - 支持 Gemini 3 Pro 和 Gemini 3.1 Flash 两种模型
- 📐 **灵活的图像配置** - 支持多种宽高比（1:1 到 21:9）和分辨率（1K-4K）
- 🖼️ **画廊管理** - 自动保存生成的图像到本地画廊，支持浏览和管理
- 📝 **提示词历史** - 记录使用过的提示词，方便重复使用
- ⚙️ **自定义配置** - 支持自定义 API Key 和 Base URL
- 💾 **本地存储** - 所有数据保存在本地，保护隐私
- 🌐 **响应式设计** - 适配桌面和移动设备

## 🏗️ 架构

```
gemini-playground/
├── src/
│   ├── components/          # Vue 组件
│   │   ├── common/         # 通用组件（按钮、输入框、模态框等）
│   │   ├── config/         # API 配置组件
│   │   ├── generator/      # 图像生成相关组件
│   │   ├── history/        # 历史记录和画廊组件
│   │   └── layout/         # 布局组件（头部、尾部）
│   ├── stores/             # Pinia 状态管理
│   │   ├── configStore.ts      # 配置状态
│   │   ├── generatorStore.ts   # 生成器状态
│   │   └── historyStore.ts     # 历史记录状态
│   ├── types/              # TypeScript 类型定义
│   ├── utils/              # 工具函数
│   ├── App.vue             # 根组件
│   └── main.ts             # 应用入口
├── examples/               # 示例代码
├── public/                 # 静态资源
└── vite.config.ts         # Vite 配置
```

### 技术栈

- **前端框架**: Vue 3.5 + TypeScript
- **状态管理**: Pinia
- **构建工具**: Vite 6
- **AI SDK**: @google/genai
- **样式**: 原生 CSS

## 📋 当前功能

### ✅ 已实现

1. **图像生成**
   - 支持 Gemini 3 Pro（高质量）和 Gemini 3.1 Flash（快速）模型
   - 可配置宽高比：1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9
   - 可配置分辨率：1K, 2K, 4K

2. **配置管理**
   - 自定义 API Key
   - 自定义 Base URL（支持代理和自定义端点）
   - 配置持久化存储

3. **历史记录**
   - 提示词历史记录
   - 提示词模板支持
   - 画廊浏览和管理

4. **用户体验**
   - 生成进度提示
   - 错误处理和提示
   - 图像下载功能
   - 响应式界面设计

## 🚀 本地部署

### 前置要求

- Node.js 18+ 
- npm 或 yarn
- Google AI Studio API Key（从 https://aistudio.google.com/ 获取）

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/gemini-playground.git
cd gemini-playground
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

4. **构建生产版本**
```bash
npm run build
```

5. **预览生产构建**
```bash
npm run preview
```

### 配置

首次使用时，需要在应用界面中配置：

1. 点击设置图标打开配置面板
2. 输入你的 Google AI Studio API Key
3. （可选）配置自定义 Base URL，如果需要使用代理
4. 保存配置

## 🔮 后续计划

### 🎯 短期目标

- [ ] 支持批量生成图像
- [ ] 添加更多提示词模板
- [ ] 支持图像编辑和修改
- [ ] 添加图像对比功能
- [ ] 支持导出配置和导入配置

### 🌈 中期目标

- [ ] 支持更多 Gemini 模型
- [ ] 添加用户账户系统
- [ ] 云端同步功能
- [ ] 图像风格迁移
- [ ] 支持视频生成

### 💡 长期愿景

- [ ] 社区分享功能
- [ ] 模型微调支持
- [ ] API 开放平台
- [ ] 多语言支持
- [ ] 移动端 App

## 🤝 如何贡献

我们欢迎任何形式的贡献！以下是参与方式：

### 提交 Bug 报告

1. 在 Issues 中搜索是否已存在相关问题
2. 如果没有，创建一个新的 Issue
3. 包含以下信息：
   - 问题描述
   - 复现步骤
   - 预期行为
   - 实际行为
   - 环境信息（浏览器、操作系统等）

### 提交功能建议

1. 创建 Feature Request Issue
2. 清晰描述你想要的功能
3. 说明为什么这个功能有价值

### 代码贡献

1. Fork 本仓库
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 开发指南

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行类型检查
npm run build

# 构建生产版本
npm run build
```

### 代码规范

- 使用 TypeScript 编写代码
- 遵循 Vue 3 Composition API 风格
- 组件使用 `<script setup>` 语法
- 保持代码简洁和可读性
- 添加必要的注释

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Google Gemini AI](https://ai.google.dev/) - 提供强大的 AI 模型
- [Vue.js](https://vuejs.org/) - 优秀的前端框架
- [Vite](https://vitejs.dev/) - 快速的构建工具
- [Google GenAI SDK](https://github.com/googleapis/js-genai) - JavaScript AI SDK

## 📞 联系方式

- 项目主页: https://github.com/your-username/gemini-playground
- 问题反馈: https://github.com/your-username/gemini-playground/issues

## 🌍 其他语言

- [English](README.en.md)

---

⭐ 如果这个项目对你有帮助，请给我们一个 Star！
