import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Nav from '../../components/Nav'

describe('Nav Component', () => {
  const renderNav = () => {
    return render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    )
  }

  it('renders the logo', () => {
    renderNav()
    const logo = screen.getByRole('img', { name: /logo/i })
    expect(logo).toBeVisible()
  })

  it('has correct navigation structure', () => {
    renderNav()
    const nav = screen.getByRole('navigation')
    expect(nav).toBeVisible()
    
    const list = screen.getByRole('list')
    expect(list).toBeVisible()
  })

  it('links have correct paths', () => {
    renderNav()
    const homeLink = screen.getByText('Accueil')
    const aboutLink = screen.getByText('À propos')

    expect(homeLink.closest('a')).toHaveAttribute('href', '/')
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about')
  })

  it('has correct styling classes', () => {
    renderNav()
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('bg-white', 'shadow-md')
  })
}) 