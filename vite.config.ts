import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import * as path from "path"
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
  base: "/tgv/", // Base path for deployment
  resolve: {
    alias: {
      // Path aliases for cleaner imports
      "@": path.resolve(__dirname, "./src"),
      // Hexagonal architecture layers
      "@domain": path.resolve(__dirname, "./src/domain"),           // Domain models and ports
      "@application": path.resolve(__dirname, "./src/application"), // Use cases and services
      "@infrastructure": path.resolve(__dirname, "./src/infrastructure"), // Adapters and configuration
      "@assets": path.resolve(__dirname, "./src/assets"),          // Images and static assets
      "@styles": path.resolve(__dirname, "./src/styles"),          // Global styles
    },
  },
})
