import { siteConfig } from './site-config'

export function generateWebsiteStructuredData(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url,
    inLanguage: ['it', 'en'],
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/developer-portrait.jpg`,
    sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.instagram],
    jobTitle: siteConfig.role,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Spoleto',
      addressRegion: 'Umbria',
      addressCountry: 'IT',
    },
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.employer,
    },
  }
}
