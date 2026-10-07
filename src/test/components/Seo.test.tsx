import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { describe, expect, it, vi } from 'vitest'
import Seo from '../../components/Seo'

// Mock content.json avec tous les champs requis
vi.mock('@data/content.json', () => ({
  default: {
    site: {
      name: 'Test Site',
      description: 'Test Description',
      themeColor: '#000000',
    },
    seo: {
      default: {
        html: {
          lang: 'fr',
        },
        meta: {
          charset: 'utf-8',
          viewport: 'width=device-width, initial-scale=1',
          type: 'website',
          twitterCard: 'summary_large_image',
          robots: 'index, follow',
        },
      },
    },
    pages: {
      home: {
        title: 'Home Page',
        description: 'Home Description',
        seo: {
          description: 'Home SEO Description',
        },
      },
      documentation: {
        title: 'Documentation',
        description: 'Documentation Description',
        seo: {
          description: 'Documentation SEO Description',
        },
      },
      error: {
        title: 'Error Page',
        description: 'Error Description',
        seo: {
          description: 'Error SEO Description',
        },
      },
    },
  },
}))

// Wrapper avec HelmetProvider
const renderWithHelmet = (ui: React.ReactElement) => {
  return render(<HelmetProvider>{ui}</HelmetProvider>)
}

describe('SEO Component', () => {
  it("rend le composant SEO pour la page d'accueil", () => {
    const { container } = renderWithHelmet(<Seo pageKey="home" />)
    expect(container).toBeTruthy()
  })

  it('rend le composant SEO pour la page Documentation', () => {
    const { container } = renderWithHelmet(<Seo pageKey="documentation" />)
    expect(container).toBeTruthy()
  })

  it("rend le composant SEO pour la page d'erreur", () => {
    const { container } = renderWithHelmet(<Seo pageKey="error" />)
    expect(container).toBeTruthy()
  })
})
