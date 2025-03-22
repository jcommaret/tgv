/// <reference types="vitest" />
/// <reference types="vite/client" />

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R
  toHaveAttribute(attr: string, value?: string): R
  toHaveClass(className: string): R
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
} 