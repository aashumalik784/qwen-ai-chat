import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const keys = {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    COHERE_API_KEY: process.env.COHERE_API_KEY,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    CEREBRAS_API_KEY: process.env.CEREBRAS_API_KEY,
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  };

  const results: Record<string, { status: string; message: string }> = {};

  // Test GROQ
  if (keys.GROQ_API_KEY) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/models', {
        headers: { 'Authorization': `Bearer ${keys.GROQ_API_KEY}` },
      });
      results.GROQ_API_KEY = {
        status: response.ok ? '✅ Working' : '❌ Failed',
        message: response.ok ? 'Key is valid' : `Error: ${response.status}`,
      };
    } catch (error) {
      results.GROQ_API_KEY = { status: '❌ Error', message: 'Network error' };
    }
  } else {
    results.GROQ_API_KEY = { status: '⚠️ Missing', message: 'Key not configured' };
  }

  // Test GEMINI
  if (keys.GEMINI_API_KEY) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${keys.GEMINI_API_KEY}`
      );
      results.GEMINI_API_KEY = {
        status: response.ok ? '✅ Working' : '❌ Failed',
        message: response.ok ? 'Key is valid' : `Error: ${response.status}`,
      };
    } catch (error) {
      results.GEMINI_API_KEY = { status: '❌ Error', message: 'Network error' };
    }
  } else {
    results.GEMINI_API_KEY = { status: '⚠️ Missing', message: 'Key not configured' };
  }

  // Test CEREBRAS
  if (keys.CEREBRAS_API_KEY) {
    try {
      const response = await fetch('https://api.cerebras.ai/v1/models', {
        headers: { 'Authorization': `Bearer ${keys.CEREBRAS_API_KEY}` },
      });
      results.CEREBRAS_API_KEY = {
        status: response.ok ? '✅ Working' : '❌ Failed',
        message: response.ok ? 'Key is valid' : `Error: ${response.status}`,
      };
    } catch (error) {
      results.CEREBRAS_API_KEY = { status: '❌ Error', message: 'Network error' };
    }
  } else {
    results.CEREBRAS_API_KEY = { status: '⚠️ Missing', message: 'Key not configured' };
  }

  // Test OPENAI
  if (keys.OPENAI_API_KEY) {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: { 'Authorization': `Bearer ${keys.OPENAI_API_KEY}` },
      });
      results.OPENAI_API_KEY = {
        status: response.ok ? '✅ Working' : '❌ Failed',
        message: response.ok ? 'Key is valid' : `Error: ${response.status}`,
      };
    } catch (error) {
      results.OPENAI_API_KEY = { status: '❌ Error', message: 'Network error' };
    }
  } else {
    results.OPENAI_API_KEY = { status: '⚠️ Missing', message: 'Key not configured' };
  }

  // Test DEEPSEEK
  if (keys.DEEPSEEK_API_KEY) {
    try {
      const response = await fetch('https://api.deepseek.com/v1/models', {
        headers: { 'Authorization': `Bearer ${keys.DEEPSEEK_API_KEY}` },
      });
      results.DEEPSEEK_API_KEY = {
        status: response.ok ? '✅ Working' : '❌ Failed',
        message: response.ok ? 'Key is valid' : `Error: ${response.status}`,
      };
    } catch (error) {
      results.DEEPSEEK_API_KEY = { status: '❌ Error', message: 'Network error' };
    }
  } else {
    results.DEEPSEEK_API_KEY = { status: '⚠️ Missing', message: 'Key not configured' };
  }

  // Test OPENROUTER
  if (keys.OPENROUTER_API_KEY) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/models', {
        headers: { 'Authorization': `Bearer ${keys.OPENROUTER_API_KEY}` },
      });
      results.OPENROUTER_API_KEY = {
        status: response.ok ? '✅ Working' : '❌ Failed',
        message: response.ok ? 'Key is valid' : `Error: ${response.status}`,
      };
    } catch (error) {
      results.OPENROUTER_API_KEY = { status: '❌ Error', message: 'Network error' };
    }
  } else {
    results.OPENROUTER_API_KEY = { status: '⚠️ Missing', message: 'Key not configured' };
  }

  // Test COHERE
  if (keys.COHERE_API_KEY) {
    try {
      const response = await fetch('https://api.cohere.ai/v1/models', {
        headers: {
          'Authorization': `Bearer ${keys.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      results.COHERE_API_KEY = {
        status: response.ok ? '✅ Working' : '❌ Failed',
        message: response.ok ? 'Key is valid' : `Error: ${response.status}`,
      };
    } catch (error) {
      results.COHERE_API_KEY = { status: '❌ Error', message: 'Network error' };
    }
  } else {
    results.COHERE_API_KEY = { status: '⚠️ Missing', message: 'Key not configured' };
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    appName: keys.NEXT_PUBLIC_APP_NAME,
    keys: results,
  });
          }
