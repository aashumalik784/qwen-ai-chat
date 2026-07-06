# 🤖 Aashu AI Chat - Multi-AI Provider Chat Application

> 🚀 **Live Demo**: [Try on Vercel](https://qwen-ai-chat.vercel.app) | [Try on Cloudflare](https://qwen-ai-chat.pages.dev)

Ek powerful AI chat application jo **7 AI providers** ke saath kaam karta hai with automatic fallback system. Agar ek provider fail ho, toh automatically doosra try karega!

![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.10-blue)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)
![Cloudflare](https://img.shields.io/badge/Deployed-Cloudflare-orange)

## ✨ Features

- 🚀 **7 AI Providers Support** - Groq, Gemini, Cerebras, OpenAI, DeepSeek, OpenRouter, Cohere
- 🔄 **Automatic Fallback System** - Ek provider fail ho toh doosra automatically try kare
- 💬 **Chat History** - Saari chats save hoti hain with auto-title
- ⭐ **Favorite Chats** - Important chats ko star karein
- 🗑️ **Delete & Rename** - Chats ko manage karein
- 🌙 **Dark/Light Mode** - Theme toggle support
- 📱 **Mobile Responsive** - Phone, tablet, desktop par perfect
- 🔢 **Code Line Numbers** - Code blocks mein line numbers
- 📋 **Copy Code** - One-click code copy
- ⚡ **Fast Performance** - Edge runtime par deploy
- 💾 **Local Storage** - Chats browser mein save hote hain

## 🛠️ Tech Stack

- **Framework:** Next.js 14.2.5 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Icons:** Lucide React
- **Markdown:** react-markdown + remark-gfm
- **Code Highlighting:** react-syntax-highlighter
- **Deployment:** Vercel & Cloudflare Pages

## 📁 Project Structure

qwen-ai-chat/
│
├── 📂 src/
│ ├── 📂 app/ # Next.js App Router
│ │ ├── 📄 layout.tsx # Root layout
│ │ ├── 📄 page.tsx # Home page
│ │ ├── 📂 chat/
│ │ │ └── 📂 [chatId]/
│ │ │ └── 📄 page.tsx # Individual chat page
│ │ ├── 📄 settings/
│ │ │ └── 📄 page.tsx # Settings page
│ │ └── 📂 api/
│ │ └── 📂 chat/
│ │ └── 📄 route.ts # AI API handler (with fallback)
│ │
│ ├── 📂 components/
│ │ ├── 📂 chat/
│ │ │ ├── 📄 ChatWindow.tsx
│ │ │ ├── 📄 ChatMessage.tsx
│ │ │ └── 📄 ChatInput.tsx
│ │ ├── 📂 sidebar/
│ │ │ ├── 📄 Sidebar.tsx
│ │ │ ├── 📄 SidebarHeader.tsx
│ │ │ ├── 📄 ChatHistoryList.tsx
│ │ │ └── 📄 NewChatButton.tsx
│ │ ├── 📂 layout/
│ │ │ └── 📄 ThemeToggle.tsx
│ │ └── 📂 ui/
│ │ ├── 📄 Button.tsx
│ │ ├── 📄 CodeBlock.tsx
│ │ ├── 📄 Dropdown.tsx
│ │ └── 📄 ScrollArea.tsx
│ │
│ ├── 📂 hooks/
│ │ ├── 📄 useChat.ts # Chat logic
│ │ ├── 📄 useStream.ts # Streaming logic
│ │ └── 📄 useTheme.ts # Theme logic
│ │
│ ├── 📂 stores/
│ │ ├── 📄 chatStore.ts # Chat state (Zustand)
│ │ └── 📄 settingsStore.ts # Settings state
│ │
│ ├── 📂 lib/
│ │ ├── 📄 constants.ts # AI providers config
│ │ ├── 📄 utils.ts # Helper functions
│ │ └── 📄 api.ts # API utilities
│ │
│ └── 📂 types/
│ ├── 📄 index.ts # Type exports
│ └── 📄 chat.ts # Chat types
│
├── 📂 public/ # Static assets
├── 📄 package.json # Dependencies
├── 📄 tsconfig.json # TypeScript config
├── 📄 tailwind.config.ts # Tailwind config
├── 📄 next.config.mjs # Next.js config
├── 📄 wrangler.toml # Cloudflare config
└── 📄 README.md # This file
