
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
  interface Window extends Window {
    [key: string]: any;
  }
  
  interface Document extends Document {
    getElementById(elementId: string): HTMLElement | null;
  }
  
  // Ensure these are available globally
  var document: Document;
  var window: Window & typeof globalThis;
  var HTMLElement: HTMLElement;
  var Element: Element;
}

// Add React JSX types with proper configuration
declare namespace JSX {
  interface Element extends React.ReactElement<any, any> { }
  interface ElementClass extends React.Component<any> {
    render(): React.ReactNode
  }
  interface ElementAttributesProperty { props: {} }
  interface ElementChildrenAttribute { children: {} }
  interface IntrinsicElements extends React.JSX.IntrinsicElements {}
}

export {};
