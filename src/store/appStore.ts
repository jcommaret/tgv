/**
 * Application Store (Zustand)
 *
 * Global state management using Zustand.
 * Includes dark mode toggle, loading states, and user preferences.
 */

import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: 'fr' | 'en'
  reducedMotion: boolean
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

interface AppState {
  // Theme & UI
  isDarkMode: boolean
  preferences: UserPreferences

  // Loading states
  isLoading: boolean
  loadingMessage: string | null

  // Notifications/Toast
  notifications: Notification[]

  // Actions - Theme
  toggleDarkMode: () => void
  setDarkMode: (enabled: boolean) => void
  setTheme: (theme: UserPreferences['theme']) => void

  // Actions - Preferences
  setLanguage: (language: UserPreferences['language']) => void
  setReducedMotion: (enabled: boolean) => void

  // Actions - Loading
  setLoading: (loading: boolean, message?: string) => void

  // Actions - Notifications
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

// Helper to safely check if matchMedia is available
const isMatchMediaAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
}

// Helper to detect system dark mode preference
const getSystemDarkMode = (): boolean => {
  if (!isMatchMediaAvailable()) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

// Resolve the effective dark mode from a theme preference
const resolveDarkMode = (theme: UserPreferences['theme']): boolean =>
  theme === 'system' ? getSystemDarkMode() : theme === 'dark'

// Helper to detect reduced motion preference
const getSystemReducedMotion = (): boolean => {
  if (!isMatchMediaAvailable()) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        isDarkMode: getSystemDarkMode(),
        preferences: {
          theme: 'system',
          language: 'fr',
          reducedMotion: getSystemReducedMotion(),
        },
        isLoading: false,
        loadingMessage: null,
        notifications: [],

        // Theme actions
        toggleDarkMode: () =>
          set((state) => {
            state.isDarkMode = !state.isDarkMode
            state.preferences.theme = state.isDarkMode ? 'dark' : 'light'
            // Apply to document
            if (typeof document !== 'undefined') {
              document.documentElement.classList.toggle('dark', state.isDarkMode)
            }
          }),

        setDarkMode: (enabled: boolean) =>
          set((state) => {
            state.isDarkMode = enabled
            state.preferences.theme = enabled ? 'dark' : 'light'
            if (typeof document !== 'undefined') {
              document.documentElement.classList.toggle('dark', enabled)
            }
          }),

        setTheme: (theme: UserPreferences['theme']) =>
          set((state) => {
            state.preferences.theme = theme
            state.isDarkMode = resolveDarkMode(theme)
            if (typeof document !== 'undefined') {
              document.documentElement.classList.toggle('dark', state.isDarkMode)
            }
          }),

        // Preference actions
        setLanguage: (language: UserPreferences['language']) =>
          set((state) => {
            state.preferences.language = language
            if (typeof document !== 'undefined') {
              document.documentElement.lang = language
            }
          }),

        setReducedMotion: (enabled: boolean) =>
          set((state) => {
            state.preferences.reducedMotion = enabled
          }),

        // Loading actions
        setLoading: (loading: boolean, message?: string) =>
          set((state) => {
            state.isLoading = loading
            state.loadingMessage = message || null
          }),

        // Notification actions
        addNotification: (notification: Omit<Notification, 'id'>) =>
          set((state) => {
            const id = Math.random().toString(36).substring(2, 9)
            state.notifications.push({ ...notification, id })

            // Auto-remove after duration (default 5 seconds)
            const duration = notification.duration ?? 5000
            if (duration > 0 && typeof setTimeout !== 'undefined') {
              setTimeout(() => {
                get().removeNotification(id)
              }, duration)
            }
          }),

        removeNotification: (id: string) =>
          set((state) => {
            state.notifications = state.notifications.filter(
              (notification) => notification.id !== id
            )
          }),

        clearNotifications: () =>
          set((state) => {
            state.notifications = []
          }),
      })),
      {
        name: 'tgv-app-store',
        // Only persist preferences, not transient state
        partialize: (state) => ({
          preferences: state.preferences,
        }),
        // Derive dark mode from the saved theme so "system" follows the OS on every load
        merge: (persisted, current) => {
          const preferences = {
            ...current.preferences,
            ...(persisted as Partial<Pick<AppState, 'preferences'>> | undefined)?.preferences,
          }
          return { ...current, preferences, isDarkMode: resolveDarkMode(preferences.theme) }
        },
      }
    ),
    {
      name: 'TGV App Store',
      enabled: import.meta.env.DEV,
    }
  )
)

// Selector hooks for better performance
export const useIsDarkMode = () => useAppStore((state) => state.isDarkMode)
export const useToggleDarkMode = () => useAppStore((state) => state.toggleDarkMode)
export const useIsLoading = () => useAppStore((state) => state.isLoading)
export const useLoadingMessage = () => useAppStore((state) => state.loadingMessage)
export const useSetLoading = () => useAppStore((state) => state.setLoading)
export const useNotifications = () => useAppStore((state) => state.notifications)
export const useAddNotification = () => useAppStore((state) => state.addNotification)
export const useRemoveNotification = () => useAppStore((state) => state.removeNotification)
export const useLanguage = () => useAppStore((state) => state.preferences.language)
export const useSetLanguage = () => useAppStore((state) => state.setLanguage)
export const useReducedMotion = () => useAppStore((state) => state.preferences.reducedMotion)

export default useAppStore
