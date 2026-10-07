import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useDarkMode } from '@hooks/useDarkMode'
import { useAppStore } from '@store/appStore'

describe('useDarkMode', () => {
  beforeEach(() => {
    useAppStore.setState({
      isDarkMode: false,
      preferences: { theme: 'system', language: 'fr', reducedMotion: false },
    })
  })

  it('applique la classe dark au document', () => {
    const { result } = renderHook(() => useDarkMode())
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    act(() => result.current.toggleDarkMode())
    expect(result.current.isDarkMode).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    act(() => result.current.setDarkMode(false))
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('suit la préférence système uniquement en mode "system"', () => {
    let listener: ((e: MediaQueryListEvent) => void) | undefined
    vi.mocked(window.matchMedia).mockImplementation(
      (query: string) =>
        ({
          matches: false,
          media: query,
          addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
            listener = cb
          },
          removeEventListener: vi.fn(),
        }) as unknown as MediaQueryList
    )

    const { result } = renderHook(() => useDarkMode())
    act(() => listener?.({ matches: true } as MediaQueryListEvent))
    expect(result.current.isDarkMode).toBe(true)

    act(() => useAppStore.getState().setTheme('light'))
    act(() => listener?.({ matches: true } as MediaQueryListEvent))
    expect(result.current.isDarkMode).toBe(false)
  })
})
