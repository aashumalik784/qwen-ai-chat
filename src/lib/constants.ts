export const APP_NAME = 'Aashu AI Chat';
export const DEFAULT_MODEL = 'llama-3.3-70b';
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

// Cerebras-specific configurations
export const CEREBRAS_CONFIG = {
  models: {
    'llama-3.3-70b': 'Llama 3.3 70B (Most Capable)',
    'llama3.1-8b': 'Llama 3.1 8B (Fastest)',
    'qwen-2.5-72b': 'Qwen 2.5 72B',
  },
  defaultModel: 'llama-3.3-70b',
  maxOutputTokens: 8192,
  temperatureRange: {
    min: 0.0,
    max: 1.0,
    default: 0.7,
  },
};
