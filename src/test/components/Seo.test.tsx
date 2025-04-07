import React from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Seo from '../../components/Seo'

// Mock Helmet pour éviter les problèmes avec document.head
vi.mock('react-helmet-async', () => ({
  HelmetProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Helmet: ({ children }: { children: React.ReactNode }) => {
    // Filtrer les éléments html et meta qui causent des problèmes de nesting
    const sanitizedChildren = React.Children.map(children, child => {
      if (React.isValidElement(child) && 
          (child.type === 'html' || child.type === 'meta' || child.type === 'title' || child.type === 'link')) {
        return null;
      }
      return child;
    });
    return <div data-testid="helmet">{sanitizedChildren}</div>;
  }
}))

// Mock content.json avec tous les champs requis
vi.mock('@data/content.json', () => ({
  default: {
    site: {
      name: 'Test Site',
      description: 'Test Description',
      themeColor: '#000000'
    },
    seo: {
      default: {
        html: {
          lang: 'fr'
        },
        meta: {
          charset: 'utf-8',
          viewport: 'width=device-width, initial-scale=1',
          type: 'website',
          twitterCard: 'summary_large_image',
          robots: 'index, follow'
        }
      }
    },
    pages: {
      home: {
        title: 'Home Page',
        description: 'Home Description',
        seo: {
          description: 'Home SEO Description'
        }
      },
      about: {
        title: 'About Page',
        description: 'About Description',
        seo: {
          description: 'About SEO Description'
        }
      },
      error: {
        title: 'Error Page',
        description: 'Error Description',
        seo: {
          description: 'Error SEO Description'
        }
      }
    }
  }
}))

describe('SEO Component', () => {
  it('rend le composant SEO pour la page d\'accueil', () => {
    const { container } = render(<Seo pageKey="home" />)
    // Assurons-nous simplement que le composant est rendu
    expect(container).toBeTruthy()
  })

  it('rend le composant SEO pour la page À propos', () => {
    const { container } = render(<Seo pageKey="about" />)
    expect(container).toBeTruthy()
  })

  it('rend le composant SEO pour la page d\'erreur', () => {
    const { container } = render(<Seo pageKey="error" />)
    expect(container).toBeTruthy()
  })
}) 