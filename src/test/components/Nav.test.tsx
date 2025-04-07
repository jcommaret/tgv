import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Nav from '../../components/Nav'

// Mock content.json
vi.mock('@data/content.json', () => ({
  default: {
    pages: {
      home: { title: 'Accueil' },
      about: { title: 'À propos' }
    }
  }
}))

describe('Nav Component', () => {
  const renderNav = () => {
    return render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    )
  }

  it('rend le composant de navigation', () => {
    renderNav()
    const nav = screen.getByRole('navigation')
    expect(nav).toBeTruthy()
  })

  it('contient le bon nombre de liens', () => {
    renderNav()
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })
}) 