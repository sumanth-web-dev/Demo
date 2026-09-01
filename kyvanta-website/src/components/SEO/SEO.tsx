import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://kyvantainnovation.com'
const SITE_NAME = 'Kyvanta Innovation'
const DEFAULT_IMAGE = '/KyvantaLogo.png'

interface SEOProps {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
}

export function SEO({
  title,
  description,
  path = '/',
  image,
  type = 'website',
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | AI, Software & Intelligent Technology`
  const metaDescription = description || 'Kyvanta Innovation builds intelligent software, AI systems, automation solutions, and scalable digital technology for modern businesses.'
  const canonical = `${SITE_URL}${path}`
  const ogImage = `${SITE_URL}${image || DEFAULT_IMAGE}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kyvanta Innovation Pvt. Ltd.',
    url: SITE_URL,
    logo: `${SITE_URL}/KyvantaLogo.png`,
    description: 'We design and build intelligent technology that helps businesses solve complex problems, automate operations, and create better digital experiences.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9480700048',
      contactType: 'customer service',
      email: 'kyvantainnovations@gmail.com',
    },
    sameAs: [],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

export function WebPageSchema({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    publisher: {
      '@type': 'Organization',
      name: 'Kyvanta Innovation Pvt. Ltd.',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/KyvantaLogo.png`,
      },
    },
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
