import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
    jsxImportSource: 'react'
  }), tsconfigPaths()],
  appType: 'spa',          // ensures index.html fallback
  base: '/',               // local root
  server: {
    port: 8084,
    host: true,
    strictPort: true,
    open: true,
    proxy: {
      "/functions/v1": "http://127.0.0.1:54321"
    }
  },
  preview: {
    port: 8084,
    host: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react'
  },
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-popover'],
          'utils-vendor': ['clsx', 'tailwind-merge', 'class-variance-authority'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
