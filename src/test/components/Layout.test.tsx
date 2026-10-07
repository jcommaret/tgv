import { render, screen, waitFor } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Layout from '../../components/Layout'

vi.mock('framer-motion', () => import('../mocks/framer-motion'))

vi.mock('@assets/images', () => ({
  default: { logo: 'logo.png', bannerBlack: 'banner-black.png' },
}))

const renderAt = (path: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<p>home content</p>} />
            <Route path="documentation" element={<p>doc content</p>} />
            <Route path="*" element={<p>not found</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  )

describe('Layout', () => {
  it('rend la navigation, le contenu et le footer', () => {
    renderAt('/')
    expect(screen.getByRole('navigation', { name: 'Navigation principale' })).toBeInTheDocument()
    expect(screen.getByText('home content')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('utilise le titre de la page courante', async () => {
    renderAt('/documentation')
    await waitFor(() => expect(document.title).toBe('Documentation | TGV'))
  })

  it('ne plante pas sur une route inconnue et affiche le SEO 404', async () => {
    renderAt('/route/inexistante')
    expect(screen.getByText('not found')).toBeInTheDocument()
    await waitFor(() => expect(document.title).toBe('Page non trouvée | TGV'))
  })

  it('le lien d’évitement donne le focus au contenu sans changer de route', () => {
    renderAt('/')
    fireEvent.click(screen.getByText('Aller au contenu principal'))
    expect(document.activeElement).toBe(document.getElementById('main-content'))
    expect(screen.getByText('home content')).toBeInTheDocument()
  })
})
