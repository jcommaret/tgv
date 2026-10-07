/// <reference types="vite/client" />

/**
 * Vite environment variables type definitions
 * Add your custom environment variables here for type safety
 */
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_APP_VERSION: string
  readonly VITE_API_URL?: string
  readonly VITE_ENABLE_ANALYTICS?: string
  readonly VITE_ENABLE_DARK_MODE?: string
  readonly VITE_BASE_URL?: string
  // Add more environment variables as needed
}

/** Build-time constants injected via `define` in vite.config.ts */
declare const __APP_VERSION__: string
declare const __BUILD_TIME__: string

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/**
 * Type definitions for imported assets
 */
declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.svg' {
  import type * as React from 'react'
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.avif' {
  const src: string
  export default src
}

declare module '*.ico' {
  const src: string
  export default src
}

declare module '*.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}
