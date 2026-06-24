'use client';

import { useChat } from '@/hooks/useChat';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

export function ChatWindow() {
  const { activeChat, isGenerating, sendMessage, stopStream } = useChat();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950">
      <MessageList messages={activeChat?.messages || []} />
      <ChatInput
        onSend={sendMessage}
        onStop={stopStream}
        isGenerating={isGenerating}
      />
    </div>
  );
}
