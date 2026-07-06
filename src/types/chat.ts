export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
  error?: boolean; // Agar API fail ho
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  favorite?: boolean;
  model?: string; // Kaunsa model use hua
  provider?: string; // Kaunsa provider use hua
}

export interface AIProvider {
  id: string;
  name: string;
  apiKey: string;
  models: string[];
  enabled: boolean;
}

export interface Settings {
  selectedProvider: string;
  selectedModel: string;
  temperature: number;
  maxTokens: number;
  theme: 'light' | 'dark' | 'system';
}
