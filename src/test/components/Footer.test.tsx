import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../../components/Footer'

describe('Footer Component', () => {
  const renderFooter = () => {
    return render(<Footer />)
  }

  it('renders footer text', () => {
    renderFooter()
    const footerText = screen.getByText(/Jérôme Commaret/i)
    expect(footerText).toBeVisible()
  })

  it('has correct structure', () => {
    renderFooter()
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeVisible()
  })

  it('has correct styling classes', () => {
    renderFooter()
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('text-light')
  })
}) 