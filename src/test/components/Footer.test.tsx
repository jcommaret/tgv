import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Footer from '../../components/Footer'

// Mock content.json
vi.mock('@data/content.json', () => ({
  default: {
    components: {
      footer: {
        text: 'Footer Text',
      },
    },
  },
}))

// Wrapper avec Router pour les composants qui utilisent Link
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('Footer Component', () => {
  it('rend le footer avec le bon rôle', () => {
    renderWithRouter(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('affiche le texte du footer', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByText(/Footer Text/)).toBeInTheDocument()
  })

  it("affiche l'année courante", () => {
    renderWithRouter(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
  })

  it('contient des liens de navigation', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByRole('link', { name: /accueil/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /documentation/i })).toBeInTheDocument()
  })
})
