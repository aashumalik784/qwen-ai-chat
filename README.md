# 🤖 Aashu AI Chat

A modern, ChatGPT-style AI chatbot powered by **Groq AI**, built with Next.js 14 and deployed on Cloudflare Pages.

## ✨ Features

- 🚀 **100% FREE** - Uses Groq AI API (no credit card required)
- 💬 **Streaming Responses** - Real-time token-by-token generation
-  **Markdown Support** - Rich text with code highlighting
- 🌓 **Dark/Light Mode** - Beautiful theme switching
- 💾 **Chat History** - Save and manage multiple conversations
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- ⚡ **Edge Deployed** - Lightning fast on Cloudflare's global network
- 🌍 **India Compatible** - No VPN required
- ️ **World's Fastest AI** - Powered by Groq's LPU technology

## ️ Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand
- **AI:** Groq AI (Llama 3.3 70B)
- **Hosting:** Cloudflare Pages

##  Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Get Groq API Key
1. Visit [Groq Console](https://console.groq.com/keys)
2. Sign up with Google account
3. Create an API key
4. Copy your API key

### 3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Groq API key:
```bash
GROQ_API_KEY=gsk_xxxxx...your_api_key_here
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

## 🔑 Groq API Limits

- ✅ **Free tier** available
- ✅ **No credit card required**
- ✅ **30 requests/minute**
- ✅ **Works in India**
- ✅ **Llama 3.3 70B model**

## 📄 License

MIT
