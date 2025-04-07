import { Helmet } from 'react-helmet-async'
import content from '@data/content.json'

interface SEOProps {
  pageKey: keyof typeof content.pages
}

interface PageSEO {
  description?: string
  robots?: string
}

const SEO = ({ pageKey }: SEOProps) => {
  const page = content.pages[pageKey]
  const title = `${page.title} | ${content.site.name}`

  return (
    <Helmet>
      {/* Default SEO */}
      <html lang={content.seo.default.html.lang} />
      <meta charSet={content.seo.default.meta.charset} />
      <meta name="viewport" content={content.seo.default.meta.viewport} />
      <meta name="theme-color" content={content.site.themeColor} />
      <meta property="og:site_name" content={content.site.name} />
      <meta property="og:type" content={content.seo.default.meta.type} />
      <meta name="twitter:card" content={content.seo.default.meta.twitterCard} />
      <link rel="icon" href="/favicon.ico" />

      {/* Page specific SEO */}
      <title>{title}</title>
      {(page.seo as PageSEO).description && (
        <>
          <meta name="description" content={(page.seo as PageSEO).description} />
          <meta property="og:description" content={(page.seo as PageSEO).description} />
        </>
      )}
      <meta property="og:title" content={title} />
      {(page.seo as PageSEO).robots && <meta name="robots" content={(page.seo as PageSEO).robots} />}
    </Helmet>
  )
}

export default SEO 