import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { fileURLToPath } from "url"

// Get the directory name from the URL
const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Vite configuration
 * - Configures React plugin
 * - Sets the base URL for deployment
 * - Defines path aliases for easier imports
 */
export default defineConfig({
  plugins: [react()],
  base: '/tgv/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
})
