import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Vite configuration
export default defineConfig(({ mode }) => ({
  server: {
    port: 8080,
    host: true, // Bind to 0.0.0.0
    strictPort: false,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react({
      jsxImportSource: 'react',
      tsDecorators: true,
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
  build: {
    target: 'esnext',
    sourcemap: mode === 'development',
  },
}));
