/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

declare module 'vitest' {
  export interface TestContext {
    cleanup: () => void;
  }
} 