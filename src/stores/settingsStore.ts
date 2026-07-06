import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AIProvider } from '@/lib/constants';

interface SettingsState {
  model: string;
  setModel: (model: string) => void;
  temperature: number;
  setTemperature: (temperature: number) => void;
  maxTokens: number;
  setMaxTokens: (maxTokens: number) => void;
  selectedProvider: AIProvider;
  setSelectedProvider: (provider: AIProvider) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      model: 'llama-3.3-70b-versatile',
      setModel: (model) => set({ model }),
      temperature: 0.7,
      setTemperature: (temperature) => set({ temperature }),
      maxTokens: 4096,
      setMaxTokens: (maxTokens) => set({ maxTokens }),
      selectedProvider: 'groq',
      setSelectedProvider: (selectedProvider) => set({ selectedProvider }),
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'aashu_settings',
    }
  )
);
