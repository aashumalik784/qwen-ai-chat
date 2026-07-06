'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useSettingsStore } from '@/stores/settingsStore';
import { useTheme } from '@/hooks/useTheme';
import { AI_PROVIDERS, AIProvider } from '@/lib/constants';
import { useState } from 'react';

export default function SettingsPage() {
  const { model, setModel, temperature, setTemperature, maxTokens, setMaxTokens } = useSettingsStore();
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('groq');
  useTheme();

  const provider = AI_PROVIDERS[selectedProvider];
  const models = Object.entries(provider.models);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Settings</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-6 space-y-6">
        {/* AI Provider Selection */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Provider</h2>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value as AIProvider)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          >
            {Object.entries(AI_PROVIDERS).map(([key, config]) => (
              <option key={key} value={key}>
                {config.name} {config.speed}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Using: {provider.name}
          </p>
        </section>

        {/* Model Selection */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Model</h2>
          <div className="space-y-2">
            {models.map(([modelKey, modelName]) => (
              <label
                key={modelKey}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <input
                  type="radio"
                  name="model"
                  value={modelKey}
                  checked={model === modelKey}
                  onChange={() => setModel(modelKey)}
                  className="text-brand-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{modelName}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Temperature */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Temperature</h2>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Precise ({temperature.toFixed(1)})</span>
              <span>Creative</span>
            </div>
          </div>
        </section>

        {/* Max Tokens */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Max Tokens</h2>
          <input
            type="number"
            min="100"
            max="8192"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value) || 4096)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
        </section>

        <section className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            💡 <strong>Tip:</strong> Your API keys are stored securely on Cloudflare.
            They're never exposed to the browser.
          </p>
        </section>
      </main>
    </div>
  );
}
