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
    setGenerating,
    getActiveChat,
    getMessagesForAPI,
  } = useChatStore();

  const { model, temperature, maxTokens } = useSettingsStore();

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
    if (!chatId) {
      chatId = createChat();
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
      stream: true,
    });
  }, [activeChatId, isGenerating, createChat, addMessage, setGenerating, getMessagesForAPI, model, temperature, maxTokens, startStream]);

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
