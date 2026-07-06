import { NextRequest, NextResponse } from 'next/server';
import { AI_PROVIDERS } from '@/lib/constants';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, provider = 'groq', model, temperature = 0.7, max_tokens = 4096 } = body;

    console.log('📩 Request received:', { provider, messages: messages?.length });

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Get provider config
    const providerConfig = AI_PROVIDERS[provider as keyof typeof AI_PROVIDERS];
    if (!providerConfig) {
      return NextResponse.json(
        { error: `Invalid provider: ${provider}` },
        { status: 400 }
      );
    }

    // Get API key
    const apiKey = process.env[providerConfig.envVar];

    if (!apiKey) {
      console.error(`❌ ${providerConfig.envVar} not configured`);
      return NextResponse.json(
        { error: `${providerConfig.name} API key is not configured. Please add it in Cloudflare settings.` },
        { status: 500 }
      );
    }

    const selectedModel = model || providerConfig.defaultModel;
    console.log(`🔑 Using ${providerConfig.name} with model: ${selectedModel}`);

    let response;

    // Call appropriate API based on provider
    if (provider === 'gemini') {
      // Gemini API has different format
      const geminiMessages = messages.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

      response = await fetch(
        `${providerConfig.endpoint}/${selectedModel}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: geminiMessages,
            generationConfig: {
              temperature: temperature,
              maxOutputTokens: max_tokens,
            },
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        console.error('❌ Gemini API error:', data);
        throw new Error(data.error?.message || 'Gemini API error');
      }

      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

      return NextResponse.json({
        id: `gemini-${Date.now()}`,
        choices: [{
          message: { role: 'assistant', content },
          finish_reason: 'stop',
        }],
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      });

    } else if (provider === 'cohere') {
      // Cohere API has different format
      const lastMessage = messages[messages.length - 1];
      
      response = await fetch(`${providerConfig.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          message: lastMessage.content,
          model: selectedModel,
          temperature: temperature,
          max_tokens: max_tokens,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('❌ Cohere API error:', data);
        throw new Error(data.message || 'Cohere API error');
      }

      return NextResponse.json({
        id: `cohere-${Date.now()}`,
        choices: [{
          message: { role: 'assistant', content: data.text },
          finish_reason: 'stop',
        }],
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      });

    } else {
      // OpenAI-compatible APIs (Groq, Cerebras, OpenAI, DeepSeek, OpenRouter)
      response = await fetch(providerConfig.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: messages,
          temperature: temperature,
          max_tokens: max_tokens,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ ${providerConfig.name} API error:`, response.status, errorText);
        
        if (response.status === 401) {
          return NextResponse.json(
            { error: `Invalid ${providerConfig.name} API key. Please check your key in Cloudflare settings.` },
            { status: 401 }
          );
        }
        
        if (response.status === 429) {
          return NextResponse.json(
            { error: 'Rate limit exceeded. Please wait a moment.' },
            { status: 429 }
          );
        }
        
        throw new Error(`${providerConfig.name} API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ ${providerConfig.name} success!`);

      return NextResponse.json({
        id: data.id,
        choices: data.choices,
        usage: data.usage,
      });
    }

  } catch (error) {
    console.error('💥 API route error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
          }
