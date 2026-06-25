'use client';

import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { APP_NAME } from '@/lib/constants';

interface SidebarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SidebarHeader({ isOpen, onToggle }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold">
          A
        </div>
        {isOpen && (
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {APP_NAME}
          </span>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="lg:hidden"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>
    </div>
  );
}
