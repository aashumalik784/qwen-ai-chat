'use client';

import { useEffect } from 'react';
import { useSettingsStore, Theme } from '@/stores/settingsStore';

// ✅ Theme type re-export kiya
export type { Theme } from '@/stores/settingsStore';

export function useTheme() {
  const { theme } = useSettingsStore();
  
  useEffect(() => {
    const root = window.document.documentElement;
