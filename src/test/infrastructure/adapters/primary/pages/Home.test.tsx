import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@infrastructure/adapters/primary/pages/Home'

describe('Home Component', () => {
  it('renders home title', () => {
    render(<Home />)
    
    // Vérifie que le titre est présent
    const title = screen.getByRole('heading', { name: /home/i })
    expect(title).toBeInTheDocument()
  })

  it('renders banner image', () => {
    render(<Home />)
    
    // Vérifie que l'image de la bannière est présente
    const banner = screen.getByRole('img', { name: /banner/i })
    expect(banner).toBeInTheDocument()
  })

  it('has correct structure', () => {
    const { container } = render(<Home />)
    
    // Vérifie la structure du composant
    const homeDiv = container.querySelector('.home')
    expect(homeDiv).toBeInTheDocument()
    
    const bannerDiv = container.querySelector('.home__banner')
    expect(bannerDiv).toBeInTheDocument()
  })
}) 