import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
    jsxImportSource: 'react'
  })],
  server: {
    port: 8088,
    host: true,
    proxy: {
      "/functions/v1": "http://127.0.0.1:54321"
    },
    // Add custom middleware for deprecated routes
    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        const retired = ["/carrier-admin","/broker-admin","/shipper-admin","/carrier-dispatch"];
        if (retired.includes(req.url)) {
          res.statusCode = 410;
          res.setHeader("Content-Type","application/json");
          res.setHeader("X-Portal-Status","decommissioned");
          const map = {
            "/carrier-admin": "/carrier",
            "/broker-admin": "/broker",
            "/shipper-admin": "/shipper",
            "/carrier-dispatch": "/load-board"
          };
          res.end(JSON.stringify({error:"gone", use: map[req.url]}));
          return;
        }
        next();
      });
    }
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
