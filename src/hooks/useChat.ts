'use client';

import { useCallback } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useStream } from './useStream';
import { MAX_TOKENS, TEMPERATURE } from '@/lib/constants';

export function useChat() {
  const {
    chats,
    activeChatId,
    isGenerating,
    createChat,
    deleteChat,
    setActiveChat,
    addMessage,
    updateLastMessage,
    updateChatTitle,
    setGenerating,
    getActiveChat,
    getMessagesForAPI,
  } = useChatStore();

  const { model, temperature, maxTokens, selectedProvider } = useSettingsStore();

  const { isStreaming, startStream, stopStream } = useStream({
    onDone: () => {
      setGenerating(false);
    },
    onError: (error) => {
      console.error('Stream error:', error);
      setGenerating(false);
    },
  });

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isGenerating) return;

    let chatId = activeChatId;
    let isNewChat = false;
    
    if (!chatId) {
      chatId = createChat();
      isNewChat = true;
    }

    // Check if this is the first message (title update needed)
    const currentChat = chats.find(c => c.id === chatId);
    const needsTitleUpdate = isNewChat || 
      !currentChat?.title || 
      currentChat.title === 'New Chat' ||
      currentChat.messages.length === 0;

    // Generate title from first message
    if (needsTitleUpdate) {
      const title = content.length > 40 
        ? content.substring(0, 40) + '...' 
        : content;
      updateChatTitle(chatId, title);
    }

    // Add user message
    addMessage(chatId, { role: 'user', content });

    // Add placeholder assistant message
    addMessage(chatId, { role: 'assistant', content: '', isStreaming: true });

    setGenerating(true);

    // Get updated messages (including the new user message)
    const messages = getMessagesForAPI(chatId);

    let accumulated = '';
    await startStream({
      messages,
      model,
      temperature,
      max_tokens: maxTokens || MAX_TOKENS,
      provider: selectedProvider,
      stream: true,
    });
  }, [
    activeChatId, 
    isGenerating, 
    createChat, 
    addMessage, 
    setGenerating, 
    getMessagesForAPI, 
    model, 
    temperature, 
    maxTokens, 
    selectedProvider,
    chats,
    updateChatTitle,
    startStream
  ]);

  return {
    chats,
    activeChatId,
    activeChat: getActiveChat(),
    isGenerating: isGenerating || isStreaming,
    sendMessage,
    createChat,
    deleteChat,
    setActiveChat,
    stopStream,
  };
}
