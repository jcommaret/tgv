import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Home from '../../pages/Home'

// Mock pour @assets/images
vi.mock('@assets/images', () => ({
  default: {
    logo: 'logo.png',
    bannerBlack: 'banner-black.png',
    bannerTransparent: 'banner-transparent.png',
  },
}))

// Mock pour @assets/alias (utilisé par Home)
vi.mock('@assets/alias', () => ({
  img: {
    logo: 'logo.png',
    bannerBlack: 'banner-black.png',
    bannerTransparent: 'banner-transparent.png',
  },
}))

// Mock content.json
vi.mock('@data/content.json', () => ({
  default: {
    site: { name: 'TGV' },
    pages: {
      home: {
        title: 'Accueil',
        path: '/',
        seo: {
          description: "Description de la page d'accueil",
        },
      },
    },
  },
}))

// Mock framer-motion pour les tests - version simplifiée
vi.mock('framer-motion', () => import('../mocks/framer-motion'))

describe('Home Page', () => {
  const renderHome = () => {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
  }

  it('rend le titre de la page', () => {
    renderHome()
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent('TGV')
    expect(title).not.toHaveTextContent('Accueil')
  })

  it('rend le conteneur de la page', () => {
    const { container } = renderHome()
    const homeContainer = container.querySelector('[data-testid="home-container"]')
    expect(homeContainer).toBeInTheDocument()
  })

  it('a un conteneur principal avec le bon testid', () => {
    renderHome()
    const container = screen.getByTestId('home-container')
    expect(container).toBeInTheDocument()
  })

  it('affiche le badge Micro Framework', () => {
    renderHome()
    expect(screen.getByText(/Micro Framework/i)).toBeInTheDocument()
  })

  it('affiche les boutons CTA', () => {
    renderHome()
    expect(screen.getByRole('link', { name: /documentation/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
  })

  it('affiche la section des fonctionnalités', () => {
    renderHome()
    expect(screen.getByText(/Pourquoi choisir TGV/i)).toBeInTheDocument()
  })

  it('affiche les features avec leurs titres', () => {
    renderHome()
    expect(screen.getByText('Ultra Rapide')).toBeInTheDocument()
    expect(screen.getByText('Design Moderne')).toBeInTheDocument()
    expect(screen.getByText('Type Safe')).toBeInTheDocument()
    expect(screen.getByText('Accessible')).toBeInTheDocument()
  })

  it('affiche la section CTA finale', () => {
    renderHome()
    expect(screen.getByText(/Prêt à commencer/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /commencer/i })).toBeInTheDocument()
  })
})
