import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  appType: "spa",
  base: "/",
  server: { port: 8084, host: true, strictPort: true },
  preview:{ port: 8084, host: true }
});
