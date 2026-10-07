/**
 * useDarkMode Hook
 *
 * Custom hook for managing dark mode with system preference detection
 * and localStorage persistence. Now integrated with Zustand store.
 */

import { useEffect } from 'react'
import { useAppStore, useIsDarkMode, useToggleDarkMode } from '@store/appStore'

/** Browser UI colors, matching --color-surface in src/styles/index.scss */
const THEME_COLORS = { light: '#ffffff', dark: '#0a0a0a' }

interface UseDarkModeReturn {
  isDarkMode: boolean
  toggleDarkMode: () => void
  setDarkMode: (enabled: boolean) => void
}

/**
 * Hook to manage dark mode state
 *
 * @returns {UseDarkModeReturn} Dark mode state and controls
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { isDarkMode, toggleDarkMode } = useDarkMode()
 *   return (
 *     <button onClick={toggleDarkMode}>
 *       {isDarkMode ? '☀️' : '🌙'}
 *     </button>
 *   )
 * }
 * ```
 */
export function useDarkMode(): UseDarkModeReturn {
  const isDarkMode = useIsDarkMode()
  const toggleDarkMode = useToggleDarkMode()
  const setDarkMode = useAppStore((state) => state.setDarkMode)

  // Apply dark mode class (and browser UI color) to document on mount and change
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', isDarkMode ? THEME_COLORS.dark : THEME_COLORS.light)
  }, [isDarkMode])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      const { preferences } = useAppStore.getState()
      // Only update if user hasn't set a preference
      if (preferences.theme === 'system') {
        setDarkMode(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [setDarkMode])

  return {
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
  }
}

export default useDarkMode
