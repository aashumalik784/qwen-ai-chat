import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, model = 'llama-3.3-70b-versatile', temperature = 0.7, max_tokens = 4096 } = body;

    console.log(' Received request:', { messages: messages.length, model });

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error('❌ No messages provided');
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Get Groq API key
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error('❌ GROQ_API_KEY not configured');
      return NextResponse.json(
        { error: 'GROQ_API_KEY is not configured. Please add it in Cloudflare environment variables.' },
        { status: 500 }
      );
    }

    console.log('🔑 API Key found, calling Groq API...');

    // Call Groq API (OpenAI-compatible format)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: temperature,
        max_tokens: max_tokens,
        stream: false,
      }),
    });

    console.log('📡 API Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Groq API error:', response.status, errorText);
      
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid Groq API key. Please check your GROQ_API_KEY in Cloudflare settings.' },
          { status: 401 }
        );
      }
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please wait a moment and try again.' },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: `Groq API error: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Success! Response received');

    // Return response in OpenAI-compatible format
    return NextResponse.json({
      id: data.id,
      object: 'chat.completion',
      created: data.created,
      model: data.model,
      choices: data.choices,
      usage: data.usage,
    });

  } catch (error) {
    console.error('💥 API route error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
