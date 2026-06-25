'use client';

import { Menu, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSettingsStore } from '@/stores/settingsStore';
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';

export function Header() {
  const { toggleSidebar } = useSettingsStore();

  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold text-gray-900 dark:text-gray-100">
          Aashu AI Chat
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
