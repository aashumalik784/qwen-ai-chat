'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useChat } from '@/hooks/useChat';

interface NewChatButtonProps {
  collapsed?: boolean;
}

export function NewChatButton({ collapsed }: NewChatButtonProps) {
  const { createChat } = useChat();

  return (
    <Button
      variant="primary"
      className="w-full justify-start gap-2"
      onClick={() => createChat()}
    >
      <Plus className="w-4 h-4" />
      {!collapsed && <span>New Chat</span>}
    </Button>
  );
}
