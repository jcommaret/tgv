import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Footer from '../../components/Footer'

// Mock content.json
vi.mock('@data/content.json', () => ({
  default: {
    components: {
      footer: {
        text: 'Footer Text'
      }
    }
  }
}))

describe('Footer Component', () => {
  it('rend le footer avec le bon rôle', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeTruthy()
  })
}) 