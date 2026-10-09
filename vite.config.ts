import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { visualizer } from 'rollup-plugin-visualizer'

// Get the directory name from the URL
const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Vite configuration
 * - Configures React plugin with Fast Refresh
 * - Sets the base URL for deployment (GitHub Pages)
 * - Defines path aliases for cleaner imports
 * - Optimizes build output with manual chunk splitting
 * - Includes bundle analyzer in analyze mode
 * - Configures security headers for preview server
 */
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), '')

  const isAnalyze = mode === 'analyze'
  const isProduction = mode === 'production'

  return {
    plugins: [
      react(),
      // Bundle analyzer (only in analyze mode)
      isAnalyze &&
        visualizer({
          filename: './dist/stats.html',
          open: !process.env.CI,
          gzipSize: true,
          brotliSize: true,
          template: 'treemap', // 'sunburst', 'treemap', 'network'
        }),
    ].filter(Boolean),

    // Base URL for GitHub Pages deployment
    base: env.VITE_BASE_URL || '/tgv/',

    // Path aliases for cleaner imports
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@app-types': path.resolve(__dirname, './src/types'),
        '@store': path.resolve(__dirname, './src/store'),
        '@data': path.resolve(__dirname, './src/data'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@features': path.resolve(__dirname, './src/features'),
        '@shared': path.resolve(__dirname, './src/shared'),
        '@app': path.resolve(__dirname, './src/app'),
      },
    },

    // Development server configuration
    server: {
      port: 3000,
      strictPort: false,
      host: 'localhost',
      open: true, // Open browser on server start
      cors: true,
      // Proxy configuration for API calls (uncomment if needed)
      // proxy: {
      //   '/api': {
      //     target: env.VITE_API_URL || 'http://localhost:8000',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },

    // Preview server configuration
    preview: {
      port: 4173,
      strictPort: false,
      host: 'localhost',
      open: true,
      headers: {
        // Security headers
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        // Content Security Policy (adjust as needed)
        'Content-Security-Policy': [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          "style-src 'self' 'unsafe-inline'",
          "font-src 'self'",
          "img-src 'self' data: https:",
          "connect-src 'self'",
          "frame-ancestors 'none'",
        ].join('; '),
      },
    },

    // Build configuration
    build: {
      // Output directory
      outDir: 'dist',
      // Generate sourcemaps for production debugging
      sourcemap: isProduction ? 'hidden' : true,
      // Target modern browsers
      target: 'esnext',
      // Minification
      minify: isProduction,
      // Chunk size warning limit (500kb)
      chunkSizeWarningLimit: 500,
      // Rollup options for advanced optimization
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: (id) => {
            // Vendor chunks
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'vendor-react'
              }
              if (id.includes('framer-motion')) {
                return 'vendor-motion'
              }
              if (id.includes('zustand')) {
                return 'vendor-state'
              }
              if (id.includes('@fontsource')) {
                return 'vendor-fonts'
              }
              // Other vendor libraries
              return 'vendor'
            }
            // Feature chunks
            if (id.includes('src/features/')) {
              const match = id.match(/src\/features\/([^/]+)/)
              if (match) return `feature-${match[1]}`
            }
          },
          // Asset file naming
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split('.') || []
            const ext = info[info.length - 1]
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`
            }
            return `assets/[name]-[hash][extname]`
          },
          // Chunk file naming
          chunkFileNames: 'assets/js/[name]-[hash].js',
          // Entry file naming
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
      // CSS code splitting
      cssCodeSplit: true,
      // Report compressed size
      reportCompressedSize: true,
    },

    // CSS configuration
    css: {
      // PostCSS configuration is in postcss.config.js
      devSourcemap: true,
      // CSS modules configuration
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: isProduction ? '[hash:base64:5]' : '[name]__[local]__[hash:base64:5]',
      },
      // Preprocessor options
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@styles/variables" as *;`,
          // Silence deprecation warnings from dependencies
          silenceDeprecations: ['legacy-js-api', 'import'],
        },
      },
    },

    // Dependency optimization
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-helmet-async',
        'zustand',
        'framer-motion',
      ],
      exclude: [],
    },

    // Define global constants
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
  }
})
