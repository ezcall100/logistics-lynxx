
/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Ensure global DOM types are available
declare global {
  interface Window {
    [key: string]: any;
  }
  
  // Add document and other DOM globals
  var document: Document;
  var window: Window & typeof globalThis;
}

export {};
