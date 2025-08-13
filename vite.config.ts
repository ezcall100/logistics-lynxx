
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
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
  },
  build: {
    target: 'es2020',
    sourcemap: mode === 'development',
    minify: mode === 'production',
  },
  server: {
    port: 5173,
    host: true,
  },
}));
