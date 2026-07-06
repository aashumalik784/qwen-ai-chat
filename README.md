# 🤖 Aashu AI Chat - Multi-AI Provider Chat Application

> 🚀 **Live Demo**: [Try on Vercel](
https://qwen-ai-chat.vercel.app)
 | [Try on Cloudflare](
https://qwen-ai-chat.pages.dev)

Ek powerful AI chat application jo **7 AI providers** ke saath kaam karta hai with automatic fallback system. Agar ek provider fail ho, toh automatically doosra try karega!

[Next.js](
https://img.shields.io/badge/Next.js-14.2.5-black)
[TypeScript](
https://img.shields.io/badge/TypeScript-5.5.3-blue)
[Tailwind CSS](
https://img.shields.io/badge/Tailwind-3.4.10-blue)
[Vercel](
https://img.shields.io/badge/Deployed-Vercel-black)
[Cloudflare](
https://img.shields.io/badge/Deployed-Cloudflare-orange)

## ✨ Features
...

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
```
## 🚀 Deployment Guide - Complete Safar

### 📍 Step 1: GitHub Repository Setup

1. **GitHub par jayein:** 
https://github.com
2. **New Repository** banayein:
- Name: `qwen-ai-chat`
- Public ya Private (aapki choice)
- "Add a README file" check karein
3. **Repository create** karein
4. **Apne saare files upload** karein

---

### 📍 Step 2: Vercel Par Deploy Karein

#### **2.1 Vercel Account Banayein**

1. 
https://vercel.com
 par jayein
2. **"Sign Up"** par click karein
3. **GitHub se login** karein (recommended)

#### **2.2 Project Import Karein**

1. **"Add New..."** → **"Project"**
2. **"Import Git Repository"** par click karein
3. Apna `qwen-ai-chat` repository select karein
4. **"Import"** button dabayein

#### **2.3 Build Settings Configure Karein**

Vercel automatically detect karega, lekin check karein:

| Setting | Value |
|---------|-------|
| Framework Preset | `Next.js` |
| Root Directory | `./` |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

#### **2.4 Environment Variables Add Karein** ⚠️ IMPORTANT

**"Environment Variables"** section mein yeh add karein:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `GROQ_API_KEY` | `gsk_xxxxx...` | Production, Preview, Development |
| `GEMINI_API_KEY` | `AIzaSy...` | Production, Preview, Development |
| `COHERE_API_KEY` | Your Cohere key | Production, Preview, Development |
| `OPENROUTER_API_KEY` | `sk-or-...` | Production, Preview, Development |
| `CEREBRAS_API_KEY` | `csk-...` | Production, Preview, Development |
| `DEEPSEEK_API_KEY` | `sk-...` | Production, Preview, Development |
| `OPENAI_API_KEY` | `sk-...` | Production, Preview, Development |
| `NEXT_PUBLIC_APP_NAME` | `Aashu AI Chat` | Production, Preview, Development |

**Kaise Add Karein:**
1. **"Add New"** button dabayein
2. **Name** field mein variable ka naam likhein
3. **Value** field mein actual API key paste karein
4. **Environment** mein **Production**, **Preview**, **Development** - teeno select karein
5. **"Save"** dabayein
6. **Har key ke liye repeat karein**

#### **2.5 Deploy Karein**

1. **"Deploy"** button par click karein
2. Wait karein 2-3 minute
3. Jab **"Ready"** dikhe, toh **"Visit"** button dabayein
4. Aapki website live hai! 🎉

**URL:** `
https://qwen-ai-chat.vercel.app`
 (ya jo bhi Vercel ne diya)

---

### 📍 Step 3: Cloudflare Pages Par Deploy Karein

#### **3.1 Cloudflare Account Banayein**

1. 
https://dash.cloudflare.com
 par jayein
2. **Sign up** karein (free account)

#### **3.2 Pages Project Banayein**

1. Left sidebar mein **"Workers & Pages"** par click karein
2. **"Create application"** → **"Pages"** → **"Connect to Git"**
3. Apna `qwen-ai-chat` repository select karein

#### **3.3 Build Settings Configure Karein**

| Setting | Value |
|---------|-------|
| Framework preset | `Next.js` |
| Build command | `npx @cloudflare/next-on-pages@1` |
| Build output directory | `.vercel/output/static` |
| Root directory | `./` |

#### **3.4 Environment Variables Add Karein**

**Settings** → **Variables** mein same 8 variables add karein:

- `GROQ_API_KEY`
- `GEMINI_API_KEY`
- `COHERE_API_KEY`
- `OPENROUTER_API_KEY`
- `CEREBRAS_API_KEY`
- `DEEPSEEK_API_KEY`
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_APP_NAME`

**Note:** Cloudflare mein **Secrets** (encrypted) ke roop mein add karein.

#### **3.5 Deploy Karein**

1. **"Save and Deploy"** button dabayein
2. Wait karein 2-3 minute
3. Deployment complete hone par URL milega

**URL:** `
https://qwen-ai-chat.pages.dev`

---

## 🔑 API Keys Kahan Se Milein?

### **Groq (Recommended - Free & Fast)**
1. 
https://console.groq.com
 par jayein
2. Sign up karein
3. **API Keys** section mein jayein
4. **"Create API Key"** dabayein
5. Key copy karein: `gsk_...`

### **Google Gemini (Free Tier Available)**
1. 
https://aistudio.google.com/app/apikey
 par jayein
2. **"Create API Key"** dabayein
3. Key copy karein: `AIzaSy...`

### **Cerebras (Free & Super Fast)**
1. 
https://cloud.cerebras.ai
 par jayein
2. Sign up karein
3. **API Keys** section mein jayein
4. Key copy karein: `csk-...`

### **DeepSeek (Free Tier)**
1. 
https://platform.deepseek.com
 par jayein
2. Sign up karein
3. API keys section mein jayein
4. Key copy karein: `sk-...`

### **OpenRouter (Multiple Models)**
1. 
https://openrouter.ai
 par jayein
2. Sign up karein
3. **Keys** section mein jayein
4. Key copy karein: `sk-or-...`

### **OpenAI (Paid)**
1. 
https://platform.openai.com
 par jayein
2. Sign up karein
3. **API Keys** section mein jayein
4. Key copy karein: `sk-...`
5. **Note:** Billing setup karna padega

### **Cohere (Free Tier)**
1. 
https://dashboard.cohere.com
 par jayein
2. Sign up karein
3. **API Keys** section mein jayein
4. Key copy karein

---

## 🎯 How It Works - Automatic Fallback

**Benefit:** Agar ek provider down hai ya rate limit hit ho gayi, toh automatically doosra provider use hoga. User ko kabhi error nahi dikhega!

---

## 🎨 Features Detail

### **Chat Management**
- ✅ **Auto Title** - Pehle message se title automatically generate hota hai
- ✅ **Delete Chat** - 3 dots (⋮) → Delete
- ✅ **Rename Chat** - 3 dots (⋮) → Rename
- ✅ **Favorite Chat** - 3 dots (⋮) → Star (⭐ title ke saath dikhega)

### **Code Blocks**
- ✅ **Line Numbers** - Har line ke saath number
- ✅ **Syntax Highlighting** - Language ke according colors
- ✅ **Copy Button** - One-click copy
- ✅ **Language Tag** - Header mein language name

### **Settings**
- ✅ **AI Provider Selection** - 7 providers mein se choose karein
- ✅ **Model Selection** - Har provider ke multiple models
- ✅ **Temperature Control** - 0 se 1 tak
- ✅ **Max Tokens** - Response length control
- ✅ **Theme Toggle** - Light/Dark/System

---

## 🔧 Local Development

### **Prerequisites**
- Node.js 18+ installed
- npm ya yarn

### **Installation**

```bash
# Repository clone karein
git clone 
https://github.com/aashumalik784/qwen-ai-chat.git
cd qwen-ai-chat

# Dependencies install karein
npm install

# .env.local file banayein
touch .env.local
```

### **.env.local File Setup**

```env
GROQ_API_KEY=your_groq_key_here
GEMINI_API_KEY=your_gemini_key_here
COHERE_API_KEY=your_cohere_key_here
OPENROUTER_API_KEY=your_openrouter_key_here
CEREBRAS_API_KEY=your_cerebras_key_here
DEEPSEEK_API_KEY=your_deepseek_key_here
OPENAI_API_KEY=your_openai_key_here
NEXT_PUBLIC_APP_NAME=Aashu AI Chat
```

### **Run Development Server**

```bash
npm run dev
```

Browser mein kholein: 
http://localhost:3000

---

## 📱 Mobile Optimization

Yeh app mobile ke liye fully optimized hai:
- ✅ Touch-friendly buttons
- ✅ Responsive sidebar
- ✅ Optimized for small screens
- ✅ Fast loading on mobile networks

---

## 🐛 Troubleshooting

### **Issue 1: API Response Nahi Aa Raha**

**Solution:**
1. Vercel/Cloudflare logs check karein
2. Environment variables verify karein
3. API keys sahi hain check karein
4. Redeploy karein

### **Issue 2: Build Fail Ho Raha Hai**

**Solution:**
1. GitHub Actions/Deployments logs check karein
2. TypeScript errors fix karein
3. Missing dependencies install karein
4. Commit aur push karein

### **Issue 3: Chat Delete Nahi Ho Raha**

**Solution:**
1. Mobile par 3 dots (⋮) hamesha visible hain
2. Desktop par hover karein chat par
3. Delete button dabayein

### **Issue 4: Multiple Code Blocks Aa Rahe Hain**

**Solution:**
1. Naya chat start karein
2. Settings mein check karein
3. System prompt updated hai verify karein

---

## 📊 AI Providers Comparison

| Provider | Speed | Free Tier | Best For |
|----------|-------|-----------|----------|
| **Groq** | ⚡⚡⚡ | ✅ Yes | Fastest responses |
| **Cerebras** | ⚡⚡⚡ | ✅ Yes | Very fast |
| **DeepSeek** | ⚡⚡ | ✅ Yes | Coding |
| **OpenRouter** | ⚡⚡ | ✅ Yes | Multiple models |
| **Gemini** | ⚡ | ✅ Yes | Google AI |
| **Cohere** | ⚡ | ✅ Yes | Enterprise |
| **OpenAI** | ⚡ | ❌ Paid | Best quality |

---

## 🔒 Security

- ✅ API keys encrypted hain (Vercel/Cloudflare secrets)
- ✅ CORS properly configured
- ✅ No sensitive data in frontend
- ✅ Environment variables server-side only

---

## 📝 License

MIT License - Free to use, modify, and distribute.

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📧 Support

Agar koi problem ho toh:
1. GitHub Issues mein report karein
2. Vercel/Cloudflare logs check karein
3. Environment variables verify karein

---

## 🎉 Credits

- **Next.js** - Amazing framework
- **Vercel** - Deployment platform
- **Cloudflare** - Edge deployment
- **AI Providers** - Groq, Gemini, Cerebras, OpenAI, DeepSeek, OpenRouter, Cohere

---

## 🌟 Star History

Agar project pasand aaye toh **Star** zaroor dein! ⭐

---

**Made with ❤️ by Aashu Malik**

**Live Demo:**
- Vercel: 
https://qwen-ai-chat.vercel.app
- Cloudflare: 
https://qwen-ai-chat.pages.dev
