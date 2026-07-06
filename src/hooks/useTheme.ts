'use client';
import { useEffect } from 'react';
import { useSettingsStore } from '@/stores/settingsStore';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const { theme } = useSettingsStore();
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);
}
