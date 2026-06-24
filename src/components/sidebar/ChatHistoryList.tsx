'use client';

import { MessageSquare, MoreVertical, Trash2 } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { cn, formatDate } from '@/lib/utils';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { ScrollArea } from '@/components/ui/ScrollArea';

export function ChatHistoryList() {
  const { chats, activeChatId, setActiveChat, deleteChat } = useChat();

  if (chats.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
        No conversations yet
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 px-2 py-2">
      <div className="space-y-1">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={cn(
              'group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors',
              activeChatId === chat.id
                ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-900 dark:text-brand-100'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
            )}
            onClick={() => setActiveChat(chat.id)}
          >
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{chat.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(chat.updatedAt)}
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Dropdown
                align="right"
                trigger={
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                }
              >
                <DropdownItem
                  danger
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => deleteChat(chat.id)}
                >
                  Delete
                </DropdownItem>
              </Dropdown>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
