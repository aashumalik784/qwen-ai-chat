import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Chat, Message } from '@/types';
import { generateId, generateChatTitle } from '@/lib/utils';
import { SYSTEM_PROMPT } from '@/lib/constants';

interface ChatStore {
  chats: Chat[];
  activeChatId: string | null;
  isGenerating: boolean;
  
  // Actions
  createChat: () => string;
  deleteChat: (id: string) => void;
  setActiveChat: (id: string | null) => void;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateLastMessage: (chatId: string, content: string) => void;
  setGenerating: (value: boolean) => void;
  getActiveChat: () => Chat | null;
  getMessagesForAPI: (chatId: string) => { role: 'user' | 'assistant' | 'system'; content: string }[];
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      activeChatId: null,
      isGenerating: false,

      createChat: () => {
        const id = generateId();
        const newChat: Chat = {
          id,
          title: 'New Chat',
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set((state) => ({
          chats: [newChat, ...state.chats],
          activeChatId: id,
        }));
        return id;
      },

      deleteChat: (id) => {
        set((state) => {
          const newChats = state.chats.filter((c) => c.id !== id);
          return {
            chats: newChats,            activeChatId: state.activeChatId === id 
              ? (newChats[0]?.id || null) 
              : state.activeChatId,
          };
        });
      },

      setActiveChat: (id) => set({ activeChatId: id }),

      addMessage: (chatId, message) => {
        const newMessage: Message = {
          ...message,
          id: generateId(),
          timestamp: Date.now(),
        };
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id !== chatId) return chat;
            
            const updatedMessages = [...chat.messages, newMessage];
            const title = chat.messages.length === 0 && message.role === 'user'
              ? generateChatTitle(message.content)
              : chat.title;
            
            return {
              ...chat,
              messages: updatedMessages,
              title,
              updatedAt: Date.now(),
            };
          }),
        }));
      },

      updateLastMessage: (chatId, content) => {
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id !== chatId) return chat;
            const messages = [...chat.messages];
            const lastMsg = messages[messages.length - 1];
            if (lastMsg && lastMsg.role === 'assistant') {
              messages[messages.length - 1] = {
                ...lastMsg,
                content,
                isStreaming: false,
              };
            }
            return { ...chat, messages, updatedAt: Date.now() };
          }),
        }));      },

      setGenerating: (value) => set({ isGenerating: value }),

      getActiveChat: () => {
        const state = get();
        return state.chats.find((c) => c.id === state.activeChatId) || null;
      },

      getMessagesForAPI: (chatId) => {
        const chat = get().chats.find((c) => c.id === chatId);
        if (!chat) return [];
        
        return [
          { role: 'system' as const, content: SYSTEM_PROMPT },
          ...chat.messages.map((m) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
          })),
        ];
      },
    }),
    {
      name: 'qwen-chats-storage',
      partialize: (state) => ({ 
        chats: state.chats,
        activeChatId: state.activeChatId,
      }),
    }
  )
);
