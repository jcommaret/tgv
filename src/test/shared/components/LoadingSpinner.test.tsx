/**
 * Tests for the LoadingSpinner component
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LoadingSpinner } from '@shared/components/LoadingSpinner'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <div data-testid="spinner" {...props}>
        {children}
      </div>
    ),
  },
}))

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
  })

  it('has correct aria-label', () => {
    render(<LoadingSpinner label="Chargement personnalisé..." />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Chargement personnalisé...')
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />)
    let spinner = screen.getByTestId('spinner')
    expect(spinner.className).toContain('w-4 h-4')

    rerender(<LoadingSpinner size="lg" />)
    spinner = screen.getByTestId('spinner')
    expect(spinner.className).toContain('w-12 h-12')

    rerender(<LoadingSpinner size="xl" />)
    spinner = screen.getByTestId('spinner')
    expect(spinner.className).toContain('w-16 h-16')
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<LoadingSpinner variant="primary" />)
    let spinner = screen.getByTestId('spinner')
    expect(spinner.className).toContain('border-primary')

    rerender(<LoadingSpinner variant="secondary" />)
    spinner = screen.getByTestId('spinner')
    expect(spinner.className).toContain('border-secondary')

    rerender(<LoadingSpinner variant="light" />)
    spinner = screen.getByTestId('spinner')
    expect(spinner.className).toContain('border-white')

    rerender(<LoadingSpinner variant="dark" />)
    spinner = screen.getByTestId('spinner')
    expect(spinner.className).toContain('border-gray-800')
  })

  it('applies custom className', () => {
    render(<LoadingSpinner className="my-custom-class" />)
    const container = screen.getByRole('status')
    expect(container.className).toContain('my-custom-class')
  })

  it('has sr-only text for screen readers', () => {
    render(<LoadingSpinner label="Test label" />)
    expect(screen.getByText('Test label')).toHaveClass('sr-only')
  })
})
