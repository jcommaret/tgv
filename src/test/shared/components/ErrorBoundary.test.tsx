import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ErrorBoundary } from '@shared/components/ErrorBoundary'

vi.mock('framer-motion', () => import('../../mocks/framer-motion'))

let shouldThrow = true

function Bomb() {
  if (shouldThrow) throw new Error('Boom')
  return <p>OK</p>
}

// jsdom reports errors thrown during render; silence them to keep test output clean
const swallowError = (event: ErrorEvent) => event.preventDefault()

describe('ErrorBoundary', () => {
  beforeEach(() => {
    shouldThrow = true
    vi.spyOn(console, 'error').mockImplementation(() => {})
    window.addEventListener('error', swallowError)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    window.removeEventListener('error', swallowError)
  })

  it('rend les enfants quand il n’y a pas d’erreur', () => {
    shouldThrow = false
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    )
    expect(screen.getByText('OK')).toBeInTheDocument()
  })

  it('affiche le fallback par défaut (avec lien accueil) et appelle onError', () => {
    const onError = vi.fn()
    render(
      <MemoryRouter>
        <ErrorBoundary onError={onError}>
          <Bomb />
        </ErrorBoundary>
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /une erreur est survenue/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /retour à l'accueil/i })).toHaveAttribute('href', '/')
    expect(onError).toHaveBeenCalledWith(expect.any(Error), expect.anything())
  })

  it('affiche un fallback personnalisé', () => {
    render(
      <ErrorBoundary fallback={<p>custom fallback</p>}>
        <Bomb />
      </ErrorBoundary>
    )
    expect(screen.getByText('custom fallback')).toBeInTheDocument()
  })

  it('se réinitialise avec le bouton Réessayer', () => {
    const onReset = vi.fn()
    render(
      <MemoryRouter>
        <ErrorBoundary onReset={onReset}>
          <Bomb />
        </ErrorBoundary>
      </MemoryRouter>
    )
    shouldThrow = false
    fireEvent.click(screen.getByRole('button', { name: 'Réessayer' }))
    expect(onReset).toHaveBeenCalled()
    expect(screen.getByText('OK')).toBeInTheDocument()
  })
})
