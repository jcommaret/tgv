import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import Nav from '../../components/Nav'

// Mock content.json
vi.mock('@data/content.json', () => ({
  default: {
    pages: {
      home: { title: 'Accueil', path: '/' },
      documentation: { title: 'Documentation', path: '/documentation' },
      error: { title: 'Erreur', path: '/error' },
    },
  },
}))

// Mock images
vi.mock('@assets/images', () => ({
  default: {
    logo: 'logo.png',
    bannerBlack: 'banner-black.png',
    bannerTransparent: 'banner-transparent.png',
  },
}))

// Mock framer-motion pour les tests
vi.mock('framer-motion', () => import('../mocks/framer-motion'))

// Mock hooks
vi.mock('@hooks/useDarkMode', () => ({
  useDarkMode: () => ({
    isDarkMode: false,
    toggleDarkMode: vi.fn(),
    setDarkMode: vi.fn(),
  }),
}))

const media = vi.hoisted(() => ({ isMobile: false }))

vi.mock('@hooks/useMediaQuery', () => ({
  useIsMobile: () => media.isMobile,
  useIsTablet: () => false,
  useIsDesktop: () => true,
  usePrefersDarkMode: () => false,
  usePrefersReducedMotion: () => false,
  useMediaQuery: () => false,
}))

describe('Nav Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    media.isMobile = false
  })

  const renderNav = (initialEntries = ['/']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Nav />
      </MemoryRouter>
    )
  }

  it('rend le composant de navigation', () => {
    renderNav()
    const nav = screen.getByRole('navigation', { name: /navigation principale/i })
    expect(nav).toBeInTheDocument()
  })

  it('affiche le logo avec le bon alt', () => {
    renderNav()
    const logo = screen.getByAltText(/logo tgv/i)
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', 'logo.png')
  })

  it('contient les liens de navigation', () => {
    renderNav()
    expect(screen.getByRole('link', { name: /accueil/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /documentation/i })).toBeInTheDocument()
  })

  it('ne montre pas le lien error', () => {
    renderNav()
    expect(screen.queryByRole('link', { name: /erreur/i })).not.toBeInTheDocument()
  })

  it('a un bouton de toggle dark mode', () => {
    renderNav()
    const toggleButton = screen.getByRole('button', { name: /activer le mode/i })
    expect(toggleButton).toBeInTheDocument()
  })

  it('le lien actif a aria-current="page"', () => {
    renderNav(['/'])
    const homeLink = screen.getByRole('link', { name: /accueil/i })
    expect(homeLink).toHaveAttribute('aria-current', 'page')
  })

  it('le lien documentation est actif sur /documentation', () => {
    renderNav(['/documentation'])
    const docLink = screen.getByRole('link', { name: /documentation/i })
    expect(docLink).toHaveAttribute('aria-current', 'page')
  })

  it('affiche un menu mobile repliable', () => {
    media.isMobile = true
    renderNav()
    const toggle = screen.getByRole('button', { name: 'Ouvrir le menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('link', { name: 'Documentation' })).not.toBeInTheDocument()

    fireEvent.click(toggle)
    expect(screen.getByRole('button', { name: 'Fermer le menu' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    fireEvent.click(screen.getByRole('link', { name: 'Documentation' }))
    expect(screen.queryByRole('link', { name: 'Documentation' })).not.toBeInTheDocument()
  })
})
