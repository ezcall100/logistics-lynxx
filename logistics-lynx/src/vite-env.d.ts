/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_TRACES_URL_TEMPLATE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Ensure global DOM types are available
declare global {
  interface Window {
    [key: string]: unknown;
  }
  
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
  
  // Ensure JSX namespace is properly declared
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: unknown;
    }
  }
}

export {}
