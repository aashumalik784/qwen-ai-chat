export const APP_NAME = 'Aashu AI Chat';
export const DEFAULT_MODEL = 'llama-3.3-70b-versatile';
export const MAX_TOKENS = 4096;
export const TEMPERATURE = 0.7;

export const SYSTEM_PROMPT = `You are Aashu AI, a helpful, harmless, and honest AI assistant. You are knowledgeable, friendly, and provide clear, accurate responses. You can help with coding, writing, analysis, math, and general questions.

Guidelines:
- Be concise but thorough
- Use markdown formatting when helpful
- Provide code examples in proper code blocks with language tags
- If unsure, admit it rather than guessing
- Be respectful and professional
- Ask clarifying questions when needed`;

export const STORAGE_KEYS = {
  CHATS: 'aashu_chats',
  SETTINGS: 'aashu_settings',
  THEME: 'aashu_theme',
  ACTIVE_CHAT: 'aashu_active_chat',
};

// Groq-specific configurations
export const GROQ_CONFIG = {
  models: {
    'llama-3.3-70b-versatile': 'Llama 3.3 70B (Most Capable)',
    'llama-3.1-8b-instant': 'Llama 3.1 8B (Fastest)',
    'mixtral-8x7b-32768': 'Mixtral 8x7B',
    'gemma2-9b-it': 'Gemma 2 9B',
  },
  defaultModel: 'llama-3.3-70b-versatile',
  maxOutputTokens: 8192,
  temperatureRange: {
    min: 0.0,
    max: 1.0,
    default: 0.7,
  },
};
