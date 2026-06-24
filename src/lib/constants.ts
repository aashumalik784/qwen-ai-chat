export const APP_NAME = 'Qwen AI Chat';
export const DEFAULT_MODEL = 'qwen-max';
export const MAX_TOKENS = 4096;
export const TEMPERATURE = 0.7;

export const SYSTEM_PROMPT = `You are Qwen, a helpful, harmless, and honest AI assistant created by Alibaba Cloud. You are knowledgeable, friendly, and provide clear, accurate responses. You can help with coding, writing, analysis, math, and general questions.

Guidelines:
- Be concise but thorough
- Use markdown formatting when helpful
- Provide code examples in proper code blocks with language tags
- If unsure, admit it rather than guessing
- Be respectful and professional`;

export const STORAGE_KEYS = {
  CHATS: 'qwen_chats',
  SETTINGS: 'qwen_settings',
  THEME: 'qwen_theme',
  ACTIVE_CHAT: 'qwen_active_chat',
};
