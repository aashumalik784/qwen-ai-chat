'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { Header } from '@/components/layout/Header';
import { useChatStore } from '@/stores/chatStore';
import { useTheme } from '@/hooks/useTheme';

export default function ChatIdPage() {
  const params = useParams();
  const chatId = params.chatId as string;
  const { setActiveChat, chats } = useChatStore();
  useTheme();

  useEffect(() => {
    if (chatId && chats.some((c) => c.id === chatId)) {
      setActiveChat(chatId);
    }
  }, [chatId, chats, setActiveChat]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden">
          <ChatWindow />
        </main>
      </div>
    </div>
  );
}
