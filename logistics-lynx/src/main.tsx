
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppAuthenticated from './AppAuthenticated.tsx';
import './index.css';
import { initObservability, session } from './observability';

// Initialize observability (Sentry, Web Vitals, performance monitoring)
initObservability();

// Start user session tracking
session.start();

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <AppAuthenticated />
  </StrictMode>
);
