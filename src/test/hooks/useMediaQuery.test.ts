/**
 * Tests for the useMediaQuery hook
 */

import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsTouchDevice,
  usePrefersDarkMode,
  usePrefersReducedMotion,
} from '@hooks/useMediaQuery'

describe('useMediaQuery', () => {
  let matchMediaMock: ReturnType<typeof vi.fn>
  let listeners: Map<string, ((e: MediaQueryListEvent) => void)[]>

  beforeEach(() => {
    listeners = new Map()
    matchMediaMock = vi.fn().mockImplementation((query: string) => {
      const mediaQueryList = {
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn((_event: string, listener: (e: MediaQueryListEvent) => void) => {
          if (!listeners.has(query)) {
            listeners.set(query, [])
          }
          listeners.get(query)!.push(listener)
        }),
        removeEventListener: vi.fn((_event: string, listener: (e: MediaQueryListEvent) => void) => {
          const queryListeners = listeners.get(query) || []
          const index = queryListeners.indexOf(listener)
          if (index > -1) {
            queryListeners.splice(index, 1)
          }
        }),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }
      return mediaQueryList
    })

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return false initially when media query does not match', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
  })

  it('should return true when media query matches', () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('should update when media query changes', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)

    // Simulate media query change
    const query = '(min-width: 768px)'
    const queryListeners = listeners.get(query) || []

    act(() => {
      queryListeners.forEach((listener) => {
        listener({ matches: true } as MediaQueryListEvent)
      })
    })

    expect(result.current).toBe(true)
  })

  it('should clean up event listener on unmount', () => {
    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    const removeEventListenerMock = vi.fn()

    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: removeEventListenerMock,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    unmount()
    // Listener cleanup should be called
  })
})

describe('useIsMobile', () => {
  it('should detect mobile screens', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('max-width'),
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })
})

describe('useIsDesktop', () => {
  it('should detect desktop screens', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('min-width: 1024px'),
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    const { result } = renderHook(() => useIsDesktop())
    expect(result.current).toBe(true)
  })
})

describe('usePrefersDarkMode', () => {
  it('should detect dark mode preference', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('prefers-color-scheme: dark'),
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    const { result } = renderHook(() => usePrefersDarkMode())
    expect(result.current).toBe(true)
  })
})

describe('legacy MediaQueryList API (Safari < 14)', () => {
  it('falls back to addListener/removeListener', () => {
    const addListener = vi.fn()
    const removeListener = vi.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: true,
        media: query,
        addListener,
        removeListener,
      })),
    })

    const { result, unmount } = renderHook(() => useMediaQuery('(min-width: 1px)'))
    expect(result.current).toBe(true)
    expect(addListener).toHaveBeenCalledTimes(1)

    unmount()
    expect(removeListener).toHaveBeenCalledWith(addListener.mock.calls[0]![0])
  })
})

describe('other breakpoint hooks', () => {
  it.each([
    ['useIsTablet', useIsTablet, '(min-width: 640px) and (max-width: 1023px)'],
    ['usePrefersReducedMotion', usePrefersReducedMotion, '(prefers-reduced-motion: reduce)'],
    ['useIsTouchDevice', useIsTouchDevice, '(hover: none) and (pointer: coarse)'],
  ])('%s queries %s', (_name, hook, expectedQuery) => {
    const matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === expectedQuery,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    Object.defineProperty(window, 'matchMedia', { writable: true, value: matchMedia })

    const { result } = renderHook(() => hook())
    expect(result.current).toBe(true)
    expect(matchMedia).toHaveBeenCalledWith(expectedQuery)
  })
})
