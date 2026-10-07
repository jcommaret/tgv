import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PageLoader } from '@shared/components/PageLoader'

vi.mock('framer-motion', () => import('../../mocks/framer-motion'))

describe('PageLoader', () => {
  it('affiche le message par défaut en plein écran', () => {
    const { container } = render(<PageLoader />)
    expect(screen.getAllByRole('status', { name: 'Chargement...' })[0]).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('fixed')
  })

  it('accepte un message et un mode inline', () => {
    const { container } = render(<PageLoader message="Patientez" fullPage={false} />)
    expect(screen.getAllByText('Patientez').length).toBeGreaterThan(0)
    expect(container.firstChild).not.toHaveClass('fixed')
  })
})
