import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '@infrastructure/adapters/primary/components/Footer'

describe('Footer Component', () => {
  it('renders copyright notice', () => {
    render(<Footer />)
    
    // Vérifie que l'année actuelle est présente
    const currentYear = new Date().getFullYear().toString()
    expect(screen.getByText(RegExp(currentYear))).toBeInTheDocument()
  })

  it('renders MIT license link', () => {
    render(<Footer />)
    
    // Vérifie que le lien vers la licence MIT est présent
    const licenseLink = screen.getByRole('link', { name: /MIT/i })
    expect(licenseLink).toHaveAttribute('href', 'https://opensource.org/licenses/MIT')
    expect(licenseLink).toHaveAttribute('target', '_blank')
    expect(licenseLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has correct footer structure', () => {
    const { container } = render(<Footer />)
    
    // Vérifie la structure du footer
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
    
    const paragraph = screen.getByText(/Licence MIT/i)
    expect(paragraph).toBeInTheDocument()
  })
}) 