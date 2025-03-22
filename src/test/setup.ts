import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Nettoie après chaque test
afterEach(() => {
  cleanup()
}) 