'use client';

import { useEffect, useRef } from 'react';
import { Message } from '@/types';
import { MessageBubble } from './MessageBubble';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Bot, Sparkles } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Welcome to Qwen AI Chat
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            I'm Qwen, your AI assistant. Ask me anything - coding, writing, analysis, or just chat!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
            {[
              { icon: '💻', text: 'Help me write code' },
              { icon: '✍️', text: 'Write an email' },
              { icon: '📊', text: 'Analyze data' },
              { icon: '💡', text: 'Brainstorm ideas' },
            ].map((item, i) => (
              <div 
                key={i}
                className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="max-w-3xl mx-auto">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
