export const APP_NAME = 'Aashu AI Chat';
export const MAX_TOKENS = 4096;
export const TEMPERATURE = 0.7;

export const SYSTEM_PROMPT = `You are Aashu AI, a helpful, harmless, and honest AI assistant. You are knowledgeable, friendly, and provide clear, accurate responses. You can help with coding, writing, analysis, math, and general questions.

Guidelines:
- Be concise and direct
- Provide ONE clear solution unless explicitly asked for alternatives
- When writing code, provide ONLY ONE code example (the best and most efficient approach)
- Do NOT show multiple approaches or variations unless the user specifically asks
- Use markdown formatting with proper code blocks and language tags
- Include helpful comments in code for better understanding
- If unsure, admit it rather than guessing
- Be respectful and professional
- Ask clarifying questions when needed

Code Style Rules:
- Always provide complete, working code
- Use proper indentation and formatting
- Add comments for complex logic
- Show the BEST approach only (not alternatives)
- If user wants alternatives, they will explicitly ask`;

export const STORAGE_KEYS = {
  CHATS: 'aashu_chats',
  SETTINGS: 'aashu_settings',
  THEME: 'aashu_theme',
  ACTIVE_CHAT: 'aashu_active_chat',
  SELECTED_PROVIDER: 'aashu_provider',
} as const;

export const AI_PROVIDERS = {
  groq: {
    name: 'Groq',
    models: {
      'llama-3.3-70b-versatile': 'Llama 3.3 70B (Fastest)',
      'llama-3.1-8b-instant': 'Llama 3.1 8B',
      'mixtral-8x7b-32768': 'Mixtral 8x7B',
      'gemma2-9b-it': 'Gemma 2 9B',
    },
    defaultModel: 'llama-3.3-70b-versatile',
    envVar: 'GROQ_API_KEY',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    speed: '⚡⚡',
  },
  gemini: {
    name: 'Google Gemini',
    models: {
      'gemini-pro': 'Gemini Pro',
      'gemini-1.5-flash': 'Gemini 1.5 Flash',
      'gemini-1.5-pro': 'Gemini 1.5 Pro',
    },
    defaultModel: 'gemini-pro',
    envVar: 'GEMINI_API_KEY',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
    speed: '⚡',
  },
  cerebras: {
    name: 'Cerebras',
    models: {
      'llama-3.3-70b': 'Llama 3.3 70B',
      'llama3.1-8b': 'Llama 3.1 8B',
      'qwen-2.5-72b': 'Qwen 2.5 72B',
    },
    defaultModel: 'llama-3.3-70b',
    envVar: 'CEREBRAS_API_KEY',
    endpoint: 'https://api.cerebras.ai/v1/chat/completions',
    speed: '⚡⚡⚡',
  },
  openai: {
    name: 'OpenAI',
    models: {
      'gpt-4o': 'GPT-4o (Best)',
      'gpt-4o-mini': 'GPT-4o Mini',
      'gpt-4-turbo': 'GPT-4 Turbo',
      'gpt-3.5-turbo': 'GPT-3.5 Turbo',
    },
    defaultModel: 'gpt-4o-mini',
    envVar: 'OPENAI_API_KEY',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    speed: '⚡',
  },
  deepseek: {
    name: 'DeepSeek',
    models: {
      'deepseek-chat': 'DeepSeek Chat',
      'deepseek-coder': 'DeepSeek Coder',
    },
    defaultModel: 'deepseek-chat',
    envVar: 'DEEPSEEK_API_KEY',
    endpoint: 'https://api.deepseek.com/v1/chat/completions',
    speed: '⚡⚡',
  },
  openrouter: {
    name: 'OpenRouter',
    models: {
      'openai/gpt-4o': 'GPT-4o',
      'anthropic/claude-3.5-sonnet': 'Claude 3.5 Sonnet',
      'google/gemini-pro-1.5': 'Gemini Pro 1.5',
      'meta-llama/llama-3.3-70b-instruct': 'Llama 3.3 70B',
    },
    defaultModel: 'openai/gpt-4o',
    envVar: 'OPENROUTER_API_KEY',
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    speed: '⚡⚡',
  },
  cohere: {
    name: 'Cohere',
    models: {
      'command-r-plus': 'Command R+ (Best)',
      'command-r': 'Command R',
      'command': 'Command',
    },
    defaultModel: 'command-r',
    envVar: 'COHERE_API_KEY',
    endpoint: 'https://api.cohere.ai/v1/chat',
    speed: '⚡',
  },
} as const;

export type AIProvider = keyof typeof AI_PROVIDERS;
