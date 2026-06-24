import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // Cloudflare Edge Runtime

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, model = 'qwen-max', stream = false, temperature = 0.7, max_tokens = 4096 } = body;

    // Validate
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Get API credentials from environment
    const apiKey = process.env.QWEN_API_KEY;
    const endpoint = process.env.QWEN_API_ENDPOINT || 
      'https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'QWEN_API_KEY is not configured' },
        { status: 500 }
      );
    }

    // Call Qwen API
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
        temperature,
        max_tokens,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Qwen API error:', errorText);
      return NextResponse.json(
        { error: `AI service error: ${response.status}` },        { status: response.status }
      );
    }

    // Streaming response
    if (stream) {
      const reader = response.body?.getReader();
      if (!reader) {
        return NextResponse.json(
          { error: 'No response stream' },
          { status: 500 }
        );
      }

      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      const streamResponse = new ReadableStream({
        async start(controller) {
          try {
            let buffer = '';
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                controller.close();
                break;
              }

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop() || '';

              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || !trimmed.startsWith('data: ')) continue;
                
                // Forward each SSE chunk to client
                controller.enqueue(encoder.encode(`${trimmed}\n\n`));
              }
            }
          } catch (error) {
            console.error('Stream error:', error);
            controller.error(error);
          }
        },
      });

      return new Response(streamResponse, {
        headers: {          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Non-streaming response
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
