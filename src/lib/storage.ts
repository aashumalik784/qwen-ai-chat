import { Chat } from '@/types';
import { STORAGE_KEYS } from './constants';

export const storage = {
  getChats(): Chat[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHATS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveChats(chats: Chat[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
    } catch (error) {
      console.error('Failed to save chats:', error);
    }
  },

  getActiveChatId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_CHAT);
  },

  setActiveChatId(id: string | null): void {
    if (typeof window === 'undefined') return;
    if (id) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_CHAT, id);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_CHAT);
    }
  },

  getTheme(): 'light' | 'dark' | 'system' {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark' | 'system') || 'system';
  },

  setTheme(theme: 'light' | 'dark' | 'system'): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },
};
