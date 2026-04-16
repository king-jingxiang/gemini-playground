# Gemini Playground

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.5-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A web application for image generation powered by Google Gemini AI, providing a user-friendly interface to create images from text using Gemini 3 Pro and Gemini 3.1 Flash models.

## 🌟 Features

- 🎨 **Text-to-Image Generation** - Convert text descriptions into high-quality images using Gemini AI models
- 🤖 **Multi-Model Support** - Supports both Gemini 3 Pro and Gemini 3.1 Flash models
- 📐 **Flexible Image Configuration** - Multiple aspect ratios (1:1 to 21:9) and resolutions (1K-4K)
- 🖼️ **Gallery Management** - Automatically save generated images to local gallery with browsing and management capabilities
- 📝 **Prompt History** - Track your used prompts for easy reuse
- ⚙️ **Custom Configuration** - Support for custom API Key and Base URL
- 💾 **Local Storage** - All data stored locally for privacy protection
- 🌐 **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🏗️ Architecture

```
gemini-playground/
├── src/
│   ├── components/          # Vue components
│   │   ├── common/         # Common components (buttons, inputs, modals, etc.)
│   │   ├── config/         # API configuration components
│   │   ├── generator/      # Image generation related components
│   │   ├── history/        # History and gallery components
│   │   └── layout/         # Layout components (header, footer)
│   ├── stores/             # Pinia state management
│   │   ├── configStore.ts      # Configuration state
│   │   ├── generatorStore.ts   # Generator state
│   │   └── historyStore.ts     # History state
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.vue             # Root component
│   └── main.ts             # Application entry point
├── examples/               # Example code
├── public/                 # Static assets
└── vite.config.ts         # Vite configuration
```

### Tech Stack

- **Frontend Framework**: Vue 3.5 + TypeScript
- **State Management**: Pinia
- **Build Tool**: Vite 6
- **AI SDK**: @google/genai
- **Styling**: Native CSS

## 📋 Current Features

### ✅ Implemented

1. **Image Generation**
   - Support for Gemini 3 Pro (high quality) and Gemini 3.1 Flash (fast) models
   - Configurable aspect ratios: 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9
   - Configurable resolutions: 1K, 2K, 4K

2. **Configuration Management**
   - Custom API Key
   - Custom Base URL (supports proxies and custom endpoints)
   - Persistent configuration storage

3. **History & Gallery**
   - Prompt history tracking
   - Prompt templates support
   - Gallery browsing and management

4. **User Experience**
   - Generation progress indicators
   - Error handling and notifications
   - Image download functionality
   - Responsive interface design

## 🚀 Local Deployment

### Prerequisites

- Node.js 18+
- npm or yarn
- Google AI Studio API Key (obtain from https://aistudio.google.com/)

### Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/gemini-playground.git
cd gemini-playground
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm run dev
```

The application will start at `http://localhost:5173`

4. **Build for Production**
```bash
npm run build
```

5. **Preview Production Build**
```bash
npm run preview
```

### Configuration

On first use, you'll need to configure the application:

1. Click the settings icon to open the configuration panel
2. Enter your Google AI Studio API Key
3. (Optional) Configure a custom Base URL if you need to use a proxy
4. Save the configuration

## 🔮 Roadmap

### 🎯 Short-term Goals

- [ ] Support batch image generation
- [ ] Add more prompt templates
- [ ] Support image editing and modification
- [ ] Add image comparison features
- [ ] Support configuration export and import

### 🌈 Mid-term Goals

- [ ] Support additional Gemini models
- [ ] Add user account system
- [ ] Cloud synchronization features
- [ ] Image style transfer
- [ ] Video generation support

### 💡 Long-term Vision

- [ ] Community sharing features
- [ ] Model fine-tuning support
- [ ] Open API platform
- [ ] Multi-language support
- [ ] Mobile application

## 🤝 Contributing

We welcome contributions of all kinds! Here's how you can help:

### Reporting Bugs

1. Search existing issues to see if the bug has already been reported
2. If not found, create a new Issue
3. Include the following information:
   - Bug description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment information (browser, OS, etc.)

### Suggesting Features

1. Create a Feature Request Issue
2. Clearly describe the feature you want
3. Explain why this feature would be valuable

### Code Contributions

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

### Development Guide

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run build

# Build for production
npm run build
```

### Code Standards

- Write code in TypeScript
- Follow Vue 3 Composition API style
- Use `<script setup>` syntax for components
- Keep code clean and readable
- Add necessary comments

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) - For providing powerful AI models
- [Vue.js](https://vuejs.org/) - Excellent frontend framework
- [Vite](https://vitejs.dev/) - Fast build tool
- [Google GenAI SDK](https://github.com/googleapis/js-genai) - JavaScript AI SDK

## 📞 Contact

- Project Home: https://github.com/your-username/gemini-playground
- Issue Tracker: https://github.com/your-username/gemini-playground/issues

## 🌍 Languages

- [中文](README.md)

---

⭐ If this project helps you, please give us a Star!
