'use client';

import { SidebarHeader } from './SidebarHeader';
import { NewChatButton } from './NewChatButton';
import { ChatHistoryList } from './ChatHistoryList';
import { useSettingsStore } from '@/stores/settingsStore';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useSettingsStore();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:relative inset-y-0 left-0 z-50 w-72 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:border-0'
      )}>
        <SidebarHeader isOpen={sidebarOpen} onToggle={toggleSidebar} />
        <div className="p-3">
          <NewChatButton />
        </div>
        <ChatHistoryList />
      </aside>
    </>
  );
}
