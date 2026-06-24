'use client';

import { cn } from '@/lib/utils';

interface AvatarProps {
  type: 'user' | 'ai';
  className?: string;
}

export function Avatar({ type, className }: AvatarProps) {
  if (type === 'user') {
    return (
      <div className={cn(
        'w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0',
        className
      )}>
        U
      </div>
    );
  }

  return (
    <div className={cn(
      'w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0',
      className
    )}>
      Q
    </div>
  );
}
