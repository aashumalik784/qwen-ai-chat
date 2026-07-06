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
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        {(Object.keys(AI_PROVIDERS) as AIProvider[]).map((key) => {
          const config = AI_PROVIDERS[key];
          return (
            <option key={key} value={key}>
              {config.name} {config.speed}
            </option>
          );
        })}
      </select>
    </div>
  );
}
