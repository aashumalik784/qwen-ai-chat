import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AI_PROVIDERS, AIProvider, TEMPERATURE, MAX_TOKENS } from '@/lib/constants';

interface SettingsState {
  // Provider & Model
  selectedProvider: AIProvider;
  model: string;
  selectedModel: string;
  
  // Generation Settings
  temperature: number;
  maxTokens: number;
  
  // UI Settings
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  sidebarOpen: boolean;  // ✅ NAYA ADD KIYA
  
  // Actions
  setSelectedProvider: (provider: AIProvider) => void;
  setModel: (model: string) => void;
  setSelectedModel: (model: string) => void;
  setTemperature: (temp: number) => void;
  setMaxTokens: (tokens: number) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSidebarOpen: (open: boolean) => void;  // ✅ NAYA ADD KIYA
  toggleSidebar: () => void;
  resetSettings: () => void;
}

const defaultProvider: AIProvider = 'groq';
const defaultModel = AI_PROVIDERS[defaultProvider].defaultModel;

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Provider & Model
      selectedProvider: defaultProvider,
      model: defaultModel,
      selectedModel: defaultModel,
      
      // Generation Settings
      temperature: TEMPERATURE,
      maxTokens: MAX_TOKENS,
      
      // UI Settings
      theme: 'system',
      sidebarCollapsed: false,
      sidebarOpen: true,  // ✅ NAYA ADD KIYA (default open)
      
      // Actions
      setSelectedProvider: (provider) => {
        const newDefaultModel = AI_PROVIDERS[provider].defaultModel;
        set({ 
          selectedProvider: provider,
          model: newDefaultModel,
          selectedModel: newDefaultModel,
        });
      },
      
      setModel: (model) => set({ 
        model,
        selectedModel: model,
      }),
      
      setSelectedModel: (model) => set({ 
        model,
        selectedModel: model,
      }),
      
      setTemperature: (temp) => set({ temperature: temp }),
      setMaxTokens: (tokens) => set({ maxTokens: tokens }),
      setTheme: (theme) => set({ theme }),
      
      setSidebarCollapsed: (collapsed) => set({ 
        sidebarCollapsed: collapsed,
        sidebarOpen: !collapsed,  // ✅ SYNC
      }),
      
      setSidebarOpen: (open) => set({ 
        sidebarOpen: open,
        sidebarCollapsed: !open,  // ✅ SYNC
      }),
      
      toggleSidebar: () => set((state) => ({ 
        sidebarCollapsed: !state.sidebarCollapsed,
        sidebarOpen: !state.sidebarOpen,  // ✅ DONO TOGGLE
      })),
      
      resetSettings: () => set({
        selectedProvider: defaultProvider,
        model: defaultModel,
        selectedModel: defaultModel,
        temperature: TEMPERATURE,
        maxTokens: MAX_TOKENS,
        theme: 'system',
        sidebarCollapsed: false,
        sidebarOpen: true,
      }),
    }),
    {
      name: 'aashu-settings-storage',
    }
  )
);
