import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_MODEL, TEMPERATURE, MAX_TOKENS } from '@/lib/constants';

interface Settings {
  model: string;
  temperature: number;
  maxTokens: number;
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
}

interface SettingsStore extends Settings {
  setModel: (model: string) => void;
  setTemperature: (temp: number) => void;
  setMaxTokens: (tokens: number) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      model: DEFAULT_MODEL,
      temperature: TEMPERATURE,
      maxTokens: MAX_TOKENS,
      theme: 'system',
      sidebarOpen: true,

      setModel: (model) => set({ model }),
      setTemperature: (temperature) => set({ temperature }),
      setMaxTokens: (maxTokens) => set({ maxTokens }),
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'qwen-settings-storage',
    }
  )
);
