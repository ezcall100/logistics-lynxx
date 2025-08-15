
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': process.env,
  },
  esbuild: {
    jsx: 'automatic',
    target: 'es2020',
    jsxDev: mode === 'development',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
  build: {
    target: 'es2020',
    sourcemap: mode === 'development',
    minify: mode === 'production',
  },
  server: {
    host: "::",
    port: 8080,
  },
}));
