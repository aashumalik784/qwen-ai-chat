// Helper utilities for streaming responses

export function parseSSELine(line: string): string | null {
  const trimmed = line.trim();
  if (!trimmed || !trimmed.startsWith('data: ')) return null;
  
  const data = trimmed.slice(6);
  if (data === '[DONE]') return null;
  
  try {
    const parsed = JSON.parse(data);
    return parsed.choices?.[0]?.delta?.content || null;
  } catch {
    return null;
  }
}

export async function* streamReader(reader: ReadableStreamDefaultReader<Uint8Array>) {
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const content = parseSSELine(line);
        if (content !== null) {
          yield content;
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
