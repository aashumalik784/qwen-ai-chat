import { NextRequest, NextResponse } from 'next/server';
import { AI_PROVIDERS } from '@/lib/constants';

export const runtime = 'edge';

// Fallback order - jo pehle try hoga
const FALLBACK_ORDER = [
  'groq',
  'cerebras',
  'deepseek',
  'openrouter',
  'gemini',
  'cohere',
  'openai',
];

async function tryProvider(
  provider: string,
  messages: any[],
  temperature: number,
  max_tokens: number
): Promise<{ success: boolean; data?: any; error?: string }> {
  const providerConfig = AI_PROVIDERS[provider as keyof typeof AI_PROVIDERS];
  
  if (!providerConfig) {
    return { success: false, error: `Invalid provider: ${provider}` };
  }

  const apiKey = process.env[providerConfig.envVar];
  
  if (!apiKey) {
    console.log(`️ ${providerConfig.name} key not configured, skipping...`);
    return { success: false, error: `${providerConfig.name} API key not configured` };
  }

  const selectedModel = providerConfig.defaultModel;
  console.log(`🔄 Trying ${providerConfig.name} with model: ${selectedModel}`);

  try {
    let response;

    if (provider === 'gemini') {
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
        return { success: false, error: `Gemini API error: ${response.status}` };
      }

      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

      return {
        success: true,
        data: {
          id: `gemini-${Date.now()}`,
          choices: [{
            message: { role: 'assistant', content },
            finish_reason: 'stop',
          }],
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
          provider: providerConfig.name,
        },
      };

    } else if (provider === 'cohere') {
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
        return { success: false, error: `Cohere API error: ${response.status}` };
      }

      return {
        success: true,
        data: {
          id: `cohere-${Date.now()}`,
          choices: [{
            message: { role: 'assistant', content: data.text },
            finish_reason: 'stop',
          }],
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
          provider: providerConfig.name,
        },
      };

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
        console.error(`❌ ${providerConfig.name} failed:`, response.status, errorText);
        return { success: false, error: `${providerConfig.name} API error: ${response.status}` };
      }

      const data = await response.json();
      console.log(`✅ ${providerConfig.name} success!`);

      return {
        success: true,
        data: {
          id: data.id,
          choices: data.choices,
          usage: data.usage,
          provider: providerConfig.name,
        },
      };
    }
  } catch (error) {
    return { 
      success: false, 
      error: `${providerConfig.name} error: ${error instanceof Error ? error.message : 'Unknown'}` 
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, temperature = 0.7, max_tokens = 4096 } = body;

    console.log('📩 Request received:', { messages: messages?.length });

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Try each provider in fallback order
    const errors: string[] = [];
    
    for (const provider of FALLBACK_ORDER) {
      console.log(`\n🔄 Attempting with ${provider}...`);
      
      const result = await tryProvider(provider, messages, temperature, max_tokens);
      
      if (result.success) {
        console.log(`\n🎉 Success with ${provider}!`);
        return NextResponse.json(result.data);
      } else {
        console.log(`❌ ${provider} failed: ${result.error}`);
        errors.push(`${provider}: ${result.error}`);
      }
    }

    // All providers failed
    console.error('\n💥 All providers failed!');
    return NextResponse.json(
      { 
        error: 'All AI providers failed. Please try again later.',
        details: errors,
      },
      { status: 503 }
    );

  } catch (error) {
    console.error('💥 API route error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
          }
