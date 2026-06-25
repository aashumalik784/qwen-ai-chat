# 🤖 Gemini AI Chat

A modern, ChatGPT-style AI chatbot powered by **Google Gemini API**, built with Next.js 14 and deployed on Cloudflare Pages.

## ✨ Features

- 🚀 **100% FREE** - Uses Google Gemini API (no credit card required)
- 💬 **Streaming Responses** - Real-time token-by-token generation
- 📝 **Markdown Support** - Rich text with code highlighting
- 🌓 **Dark/Light Mode** - Beautiful theme switching
- 💾 **Chat History** - Save and manage multiple conversations
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- ⚡ **Edge Deployed** - Lightning fast on Cloudflare's global network

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand
- **AI:** Google Gemini API
- **Hosting:** Cloudflare Pages

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Get Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### 3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Gemini API key:
```bash
GEMINI_API_KEY=AIzaSy...your_gemini_api_key_here
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Cloudflare Pages
```bash
npm run pages:deploy
```

## 🔑 Gemini API Limits

- ✅ **1500 requests/day** (FREE)
- ✅ **60 requests/minute**
- ✅ **No credit card required**
- ✅ **Lifetime free**

## 📄 License

MIT
