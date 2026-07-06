'use client';

import { useCallback } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { MAX_TOKENS } from '@/lib/constants';

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
    toggleFavorite,
    setGenerating,
    getActiveChat,
    getMessagesForAPI,
  } = useChatStore();

  const { model, temperature, maxTokens, selectedProvider } = useSettingsStore();

  const stopStream = useCallback(() => {
    console.log('Stop stream called (non-streaming mode)');
    setGenerating(false);
  }, [setGenerating]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isGenerating) return;

    let chatId = activeChatId;
    let isNewChat = false;
    
    if (!chatId) {
      chatId = createChat();
      isNewChat = true;
    }

    const currentChat = chats.find(c => c.id === chatId);
    const needsTitleUpdate = isNewChat || 
      !currentChat?.title || 
      currentChat.title === 'New Chat' ||
      currentChat.messages.length === 0;

    if (needsTitleUpdate) {
      const title = content.length > 40 
        ? content.substring(0, 40) + '...' 
        : content;
      updateChatTitle(chatId, title);
    }

    addMessage(chatId, { role: 'user', content });
    addMessage(chatId, { role: 'assistant', content: '...', isStreaming: true });

    setGenerating(true);

    try {
      const messages = getMessagesForAPI(chatId);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          model,
          temperature,
          max_tokens: maxTokens || MAX_TOKENS,
          provider: selectedProvider,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const aiContent = data.choices?.[0]?.message?.content || 'No response';
      const usedProvider = data.provider || selectedProvider;

      console.log('Response from:', usedProvider);

      updateLastMessage(chatId, aiContent);

    } catch (error: any) {
      console.error('Error:', error);
      updateLastMessage(chatId, `Error: ${error.message}. Please try again.`);
    } finally {
      setGenerating(false);
    }
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
    updateLastMessage,
  ]);

  return {
    chats,
    activeChatId,
    activeChat: getActiveChat(),
    isGenerating,
    sendMessage,
    createChat,
    deleteChat,
    setActiveChat,
    toggleFavorite,
    updateChatTitle,
    stopStream,
  };
}
