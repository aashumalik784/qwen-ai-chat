'use client';

import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { TypingIndicator } from './TypingIndicator';

interface StreamingTextProps {
  content: string;
  isStreaming?: boolean;
}

export function StreamingText({ content, isStreaming }: StreamingTextProps) {
  if (!content && isStreaming) {
    return <TypingIndicator />;
  }

  return (
    <div className="prose dark:prose-invert max-w-none">
      <MarkdownRenderer content={content} />
      {isStreaming && (
        <span className="inline-block w-2 h-4 bg-brand-500 animate-pulse ml-0.5 align-middle" />
      )}
    </div>
  );
}
