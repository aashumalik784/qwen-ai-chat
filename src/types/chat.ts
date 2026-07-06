export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  favorite?: boolean;
}

export interface ChatCompletionMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  messages: ChatCompletionMessage[];
  model?: string;
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
  provider?: string;
}

export interface ChatResponse {
  id: string;
  choices: Array<{
    message: {
      role: 'assistant';
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface StreamDelta {
  choices: Array<{
    delta: {
      content?: string;
      role?: string;
    };
    finish_reason: string | null;
  }>;
}
