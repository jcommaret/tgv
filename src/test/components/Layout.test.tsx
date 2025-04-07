import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Layout from '../../components/Layout'

// Mock content.json
vi.mock('@data/content.json', () => ({
  default: {
    pages: {
      home: { title: 'Accueil' },
      about: { title: 'À propos' }
    },
    components: {
      footer: {
        text: 'Footer Text'
      }
    }
  }
}))

describe('Layout Component', () => {
  const renderLayout = (children: React.ReactNode) => {
    return render(
      <BrowserRouter>
        <Layout>{children}</Layout>
      </BrowserRouter>
    )
  }

  it('rend les enfants', () => {
    const testContent = <div data-testid="test-content">Test Content</div>
    renderLayout(testContent)
    expect(screen.getByTestId('test-content')).toBeTruthy()
  })

  it('rend le composant Nav', () => {
    renderLayout(<div>Test</div>)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeTruthy()
  })

  it('rend le composant Footer', () => {
    renderLayout(<div>Test</div>)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeTruthy()
  })
}) 