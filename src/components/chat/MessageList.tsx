'use client';

import { Message } from '@/types';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function MessageList({ messages }: { messages: Message[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
          <p className="text-lg">Start a conversation</p>
          <p className="text-sm mt-2">Ask me anything and I&apos;ll help you out!</p>
        </div>
      )}
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              message.role === 'user'
                ? 'bg-brand-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
            }`}
          >
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
            {message.role === 'assistant' && (
              <button
                onClick={() => copyToClipboard(message.content, message.id)}
                className="mt-2 flex items-center gap-1 text-xs opacity-70 hover:opacity-100 transition-opacity"
              >
                {copiedId === message.id ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {copiedId === message.id ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
