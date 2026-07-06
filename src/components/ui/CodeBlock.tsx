'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="relative my-4 rounded-lg overflow-hidden bg-gray-900">
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <span className="text-xs text-gray-400 lowercase">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code with line numbers - FIX KIYA */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm">
          <code className={`language-${language}`}>  {/* ✅ Yaha fix kiya */} 
            {lines.map((line, index) => (
              <div key={index} className="table-row">
                <span className="table-cell text-right pr-4 text-gray-500 select-none">
                  {index + 1}
                </span>
                <span className="table-cell text-gray-100">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
