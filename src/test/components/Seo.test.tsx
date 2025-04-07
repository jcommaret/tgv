import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import SEO from '../../components/Seo'

describe('SEO Component', () => {
  const renderSEO = (pageKey: 'home' | 'about' | 'error') => {
    return render(
      <HelmetProvider>
        <SEO pageKey={pageKey} />
      </HelmetProvider>
    )
  }

  it('renders default SEO meta tags', () => {
    renderSEO('home')
     })
}) 