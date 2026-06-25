'use client';

import { Message } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { StreamingText } from './StreamingText';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      'flex gap-3 px-4 py-4 animate-fade-in',
      isUser ? 'flex-row-reverse' : 'flex-row'
    )}>
      <Avatar type={isUser ? 'user' : 'ai'} />
      <div className={cn(
        'flex-1 max-w-[80%]',
        isUser ? 'flex flex-col items-end' : 'flex flex-col items-start'
      )}>
        <div className={cn(
          'text-xs font-medium mb-1 text-gray-500 dark:text-gray-400',
        )}>
          {isUser ? 'You' : 'Aashu AI'}
        </div>
        <div className={cn(
          'rounded-2xl px-4 py-3',
          isUser
            ? 'bg-brand-600 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        )}>
          {isUser ? (
            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
          ) : (
            <StreamingText 
              content={message.content} 
              isStreaming={message.isStreaming} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
