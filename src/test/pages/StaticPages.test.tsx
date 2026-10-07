import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Documentation from '../../pages/Documentation'
import ErrorPage from '../../pages/ErrorPage'

describe('Documentation Page', () => {
  it('affiche le titre', () => {
    render(<Documentation />)
    expect(screen.getByRole('heading', { level: 1, name: 'Documentation' })).toBeInTheDocument()
  })
})

describe('Error Page', () => {
  it('affiche le titre 404', () => {
    render(<ErrorPage />)
    expect(screen.getByRole('heading', { level: 1, name: 'Page non trouvée' })).toBeInTheDocument()
  })
})
