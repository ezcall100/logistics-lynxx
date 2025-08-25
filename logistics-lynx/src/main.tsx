import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

console.log('🔍 Main.tsx: Starting React app...');

try {
  const rootElement = document.getElementById('root');
  console.log('🔍 Main.tsx: Root element found:', !!rootElement);
  
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
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
}
