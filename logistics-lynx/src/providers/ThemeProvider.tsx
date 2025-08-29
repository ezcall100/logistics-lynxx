import React from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="mcp-v2" className="min-h-screen bg-[color:var(--bg-app)] text-[color:var(--fg)]">
      {children}
    </div>
  );
}
