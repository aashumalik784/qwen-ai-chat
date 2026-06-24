# 🤖 Qwen AI Chat

A modern, ChatGPT-style AI chatbot powered by Qwen (Alibaba Cloud), built with Next.js 14 and deployed on Cloudflare Pages.

## ✨ Features

- 🚀 **Streaming Responses** - Real-time token-by-token generation
- 💬 **Chat History** - Save and manage multiple conversations
- 🌓 **Dark/Light Mode** - Beautiful theme switching
- 📝 **Markdown Support** - Rich text with code highlighting
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- ⚡ **Edge Deployed** - Lightning fast on Cloudflare's global network

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand
- **AI:** Qwen API (DashScope)
- **Hosting:** Cloudflare Pages

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local` and add your Qwen API key.

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy to Cloudflare Pages
```bash
npm run pages:deploy
```

## 🔑 Get Qwen API Key

1. Visit [Alibaba Cloud DashScope](https://dashscope.console.aliyun.com/)
2. Sign up and create an API key
3. Add it to your `.env.local` file

## 📄 License

MIT
