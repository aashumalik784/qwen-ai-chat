'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, Square } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop?: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, onStop, isGenerating, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (input.trim() && !isGenerating && !disabled) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
      <div className="max-w-3xl mx-auto">
        <div className={cn(
          'flex items-end gap-2 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 shadow-sm focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all',
          disabled && 'opacity-50'
        )}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Qwen..."
            disabled={disabled}
            rows={1}
            className="flex-1 resize-none bg-transparent px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none max-h-[200px]"
          />
          {isGenerating ? (
            <Button
              variant="danger"
              size="icon"
              onClick={onStop}
              className="flex-shrink-0"
            >
              <Square className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="primary"
              size="icon"
              onClick={handleSubmit}
              disabled={!input.trim() || disabled}
              className="flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          )}
        </div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          Qwen can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}
