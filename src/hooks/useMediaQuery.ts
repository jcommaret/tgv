/**
 * useMediaQuery Hook
 *
 * Custom hook for responsive design using CSS media queries.
 * Returns a boolean indicating if the media query matches.
 */

import { useState, useEffect, useCallback } from 'react'

/**
 * Hook to detect if a media query matches
 *
 * @param query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns {boolean} Whether the media query currently matches
 *
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const isMobile = useMediaQuery('(max-width: 768px)')
 *   const isDark = useMediaQuery('(prefers-color-scheme: dark)')
 *   const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
 *
 *   return <div>{isMobile ? 'Mobile View' : 'Desktop View'}</div>
 * }
 * ```
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with current match state
  const getMatches = useCallback((mediaQuery: string): boolean => {
    // Return false during SSR
    if (typeof window === 'undefined') return false
    return window.matchMedia(mediaQuery).matches
  }, [])

  const [matches, setMatches] = useState<boolean>(() => getMatches(query))

  useEffect(() => {
    // Return early during SSR
    if (typeof window === 'undefined') return

    const mediaQueryList = window.matchMedia(query)

    // Set initial value
    setMatches(mediaQueryList.matches)

    // Define listener
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange)
      return () => mediaQueryList.removeEventListener('change', handleChange)
    }
    // Legacy browsers (Safari < 14)
    else if (mediaQueryList.addListener) {
      mediaQueryList.addListener(handleChange)
      return () => mediaQueryList.removeListener(handleChange)
    }
    return undefined
  }, [query])

  return matches
}

/**
 * Predefined breakpoint hooks for common use cases
 */

/** Hook to detect mobile screens (< 640px) */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 639px)')
}

/** Hook to detect tablet screens (640px - 1023px) */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
}

/** Hook to detect desktop screens (>= 1024px) */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)')
}

/** Hook to detect dark mode preference */
export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

/** Hook to detect reduced motion preference */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/** Hook to detect touch devices */
export function useIsTouchDevice(): boolean {
  return useMediaQuery('(hover: none) and (pointer: coarse)')
}

export default useMediaQuery
