'use client';

import { useState, useCallback, useRef } from 'react';
import { streamChatMessage } from '@/lib/api';
import { ChatRequest } from '@/types';

interface UseStreamOptions {
  onChunk?: (chunk: string, fullText: string) => void;
  onDone?: (fullText: string) => void;
  onError?: (error: Error) => void;
}

export function useStream(options: UseStreamOptions = {}) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const startStream = useCallback(async (request: ChatRequest) => {
    setIsStreaming(true);
    setStreamedText('');
    setError(null);
    abortControllerRef.current = new AbortController();

    let accumulated = '';

    await streamChatMessage(
      request,
      (chunk) => {
        accumulated += chunk;
        setStreamedText(accumulated);
        options.onChunk?.(chunk, accumulated);
      },
      () => {
        setIsStreaming(false);
        options.onDone?.(accumulated);
      },
      (err) => {
        setError(err);
        setIsStreaming(false);
        options.onError?.(err);
      }
    );
  }, [options]);

  const stopStream = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsStreaming(false);
  }, []);

  const reset = useCallback(() => {
    setStreamedText('');
    setError(null);
    setIsStreaming(false);
  }, []);

  return {
    isStreaming,
    streamedText,
    error,
    startStream,
    stopStream,
    reset,
  };
}
