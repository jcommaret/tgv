/**
 * Tests for the Zustand app store
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createJSONStorage } from 'zustand/middleware'
import { useAppStore } from '@store/appStore'

// Reset store before each test
const initialState = useAppStore.getState()

describe('App Store', () => {
  beforeEach(() => {
    // Reset the store to initial state
    useAppStore.setState(initialState, true)
    vi.clearAllMocks()
  })

  describe('Theme', () => {
    it('should have initial dark mode state', () => {
      const { isDarkMode } = useAppStore.getState()
      expect(typeof isDarkMode).toBe('boolean')
    })

    it('should toggle dark mode', () => {
      const initialDarkMode = useAppStore.getState().isDarkMode
      useAppStore.getState().toggleDarkMode()
      expect(useAppStore.getState().isDarkMode).toBe(!initialDarkMode)
    })

    it('should set dark mode explicitly', () => {
      useAppStore.getState().setDarkMode(true)
      expect(useAppStore.getState().isDarkMode).toBe(true)

      useAppStore.getState().setDarkMode(false)
      expect(useAppStore.getState().isDarkMode).toBe(false)
    })

    it('should set theme preference', () => {
      useAppStore.getState().setTheme('dark')
      expect(useAppStore.getState().preferences.theme).toBe('dark')
      expect(useAppStore.getState().isDarkMode).toBe(true)

      useAppStore.getState().setTheme('light')
      expect(useAppStore.getState().preferences.theme).toBe('light')
      expect(useAppStore.getState().isDarkMode).toBe(false)
    })
  })

  describe('Preferences', () => {
    it('should have default preferences', () => {
      const { preferences } = useAppStore.getState()
      expect(preferences.language).toBe('fr')
      expect(preferences.theme).toBeDefined()
      expect(preferences.reducedMotion).toBeDefined()
    })

    it('should set language', () => {
      useAppStore.getState().setLanguage('en')
      expect(useAppStore.getState().preferences.language).toBe('en')

      useAppStore.getState().setLanguage('fr')
      expect(useAppStore.getState().preferences.language).toBe('fr')
    })

    it('should set reduced motion', () => {
      useAppStore.getState().setReducedMotion(true)
      expect(useAppStore.getState().preferences.reducedMotion).toBe(true)

      useAppStore.getState().setReducedMotion(false)
      expect(useAppStore.getState().preferences.reducedMotion).toBe(false)
    })
  })

  describe('Loading', () => {
    it('should have initial loading state as false', () => {
      expect(useAppStore.getState().isLoading).toBe(false)
      expect(useAppStore.getState().loadingMessage).toBeNull()
    })

    it('should set loading state', () => {
      useAppStore.getState().setLoading(true, 'Chargement...')
      expect(useAppStore.getState().isLoading).toBe(true)
      expect(useAppStore.getState().loadingMessage).toBe('Chargement...')
    })

    it('should clear loading state', () => {
      useAppStore.getState().setLoading(true, 'Chargement...')
      useAppStore.getState().setLoading(false)
      expect(useAppStore.getState().isLoading).toBe(false)
      expect(useAppStore.getState().loadingMessage).toBeNull()
    })
  })

  describe('Notifications', () => {
    it('should have empty notifications initially', () => {
      expect(useAppStore.getState().notifications).toEqual([])
    })

    it('should add a notification', () => {
      useAppStore.getState().addNotification({
        type: 'success',
        message: 'Test notification',
        duration: 0, // Don't auto-remove
      })

      const { notifications } = useAppStore.getState()
      expect(notifications).toHaveLength(1)
      expect(notifications[0].message).toBe('Test notification')
      expect(notifications[0].type).toBe('success')
      expect(notifications[0].id).toBeDefined()
    })

    it('should remove a notification', () => {
      useAppStore.getState().addNotification({
        type: 'info',
        message: 'To be removed',
        duration: 0,
      })

      const { notifications } = useAppStore.getState()
      const id = notifications[0].id

      useAppStore.getState().removeNotification(id)
      expect(useAppStore.getState().notifications).toHaveLength(0)
    })

    it('should clear all notifications', () => {
      useAppStore.getState().addNotification({
        type: 'success',
        message: 'Notification 1',
        duration: 0,
      })
      useAppStore.getState().addNotification({
        type: 'error',
        message: 'Notification 2',
        duration: 0,
      })

      expect(useAppStore.getState().notifications).toHaveLength(2)

      useAppStore.getState().clearNotifications()
      expect(useAppStore.getState().notifications).toHaveLength(0)
    })

    it('should generate unique IDs for notifications', () => {
      useAppStore.getState().addNotification({
        type: 'info',
        message: 'First',
        duration: 0,
      })
      useAppStore.getState().addNotification({
        type: 'info',
        message: 'Second',
        duration: 0,
      })

      const { notifications } = useAppStore.getState()
      expect(notifications[0].id).not.toBe(notifications[1].id)
    })
  })

  describe('Persistence', () => {
    // The store captured jsdom's storage at import time, before setup.ts mocked it
    beforeEach(() => {
      useAppStore.persist.setOptions({ storage: createJSONStorage(() => window.localStorage) })
    })

    const mockSystemDark = (dark: boolean) =>
      vi
        .mocked(window.matchMedia)
        .mockImplementation((query: string) => ({ matches: dark, media: query }) as MediaQueryList)

    it('recalcule le mode sombre depuis le système au rechargement en mode "system"', async () => {
      mockSystemDark(true)
      localStorage.setItem(
        'tgv-app-store',
        JSON.stringify({ state: { preferences: { theme: 'system' } }, version: 0 })
      )
      await useAppStore.persist.rehydrate()
      expect(useAppStore.getState().isDarkMode).toBe(true)
    })

    it('respecte un thème clair choisi même si le système est sombre', async () => {
      mockSystemDark(true)
      localStorage.setItem(
        'tgv-app-store',
        JSON.stringify({ state: { preferences: { theme: 'light' } }, version: 0 })
      )
      await useAppStore.persist.rehydrate()
      expect(useAppStore.getState().isDarkMode).toBe(false)
    })
  })
})
