'use client';

import { AI_PROVIDERS, AIProvider } from '@/lib/constants';

interface ProviderSelectorProps {
  selectedProvider: AIProvider;
  onProviderChange: (provider: AIProvider) => void;
}

export function ProviderSelector({ selectedProvider, onProviderChange }: ProviderSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        AI Provider
      </label>
      <select
        value={selectedProvider}
        onChange={(e) => onProviderChange(e.target.value as AIProvider)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      >
        {Object.entries(AI_PROVIDERS).map(([key, config]) => (
          <option key={key} value={key}>
            {config.name} {config.speed}
          </option>
        ))}
      </select>
    </div>
  );
}
