import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Global error handlers to catch any runtime errors
window.addEventListener('error', (e) => {
  console.error('[window.onerror]', e.message, e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('[unhandledrejection]', e.reason);
});

console.log('🔍 Main.tsx: Starting React app...');
console.log('🔍 Main.tsx: Current URL:', window.location.href);

try {
  const rootElement = document.getElementById('root');
  console.log('🔍 Main.tsx: Root element found:', !!rootElement);
  
  if (rootElement) {
    console.log('🔍 Main.tsx: Creating React root...');
    const root = ReactDOM.createRoot(rootElement);
    
    console.log('🔍 Main.tsx: Rendering React app...');
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
    );
    console.log('🔍 Main.tsx: React app rendered successfully');
  } else {
    console.error('❌ Main.tsx: Root element not found!');
  }
} catch (error) {
  console.error('❌ Main.tsx: Error rendering React app:', error);
  console.error('❌ Main.tsx: Error stack:', (error as Error).stack);
}
