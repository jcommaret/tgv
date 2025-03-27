/// <reference types="vitest" />
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Nav from '@infrastructure/adapters/primary/components/Nav'

describe('Nav Component', () => {
  const renderNav = () => {
    return render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    )
  }

  it('renders navigation links', () => {
    renderNav()
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('renders the logo', () => {
    renderNav()
    const logo = screen.getByRole('img', { name: /logo/i })
    expect(logo).toBeInTheDocument()
  })

  it('has correct navigation structure', () => {
    renderNav()
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('navigation')
    
    const list = screen.getByRole('list')
    expect(list).toHaveClass('navigation__links')
  })
}) 