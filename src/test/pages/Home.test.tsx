import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Home from '../../pages/Home'

// Mock pour @assets/alias
vi.mock('@assets/alias', () => ({
  img: {
    bannerBlack: '/mock-banner.jpg'
  }
}))

// Mock content.json
vi.mock('@data/content.json', () => ({
  default: {
    site: {
      description: 'Déployez gratuitement vos sites sur Github pages'
    },
    pages: {
      home: {
        title: 'Bienvenue sur TGV'
      }
    }
  }
}))

describe('Home Page', () => {
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  }

  it('rend le titre de la page', () => {
    renderHome()
    const title = screen.getByText('Bienvenue sur TGV')
    expect(title).toBeTruthy()
  })

  it('rend la description', () => {
    renderHome()
    const description = screen.getByText('Déployez gratuitement vos sites sur Github pages')
    expect(description).toBeTruthy()
  })

  it('rend une image', () => {
    renderHome()
    const image = screen.getByRole('img')
    expect(image).toBeTruthy()
  })
}) 