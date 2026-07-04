import type { BlogPost } from './blog-data'
import { siteConfig } from './site-config'

export function generateBlogPostStructuredData(post: BlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${url}/og-images/${post.slug}.png`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: siteConfig.github,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    timeRequired: post.readTime,
  }
}

export function generateWebsiteStructuredData(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.shortName,
    description: siteConfig.description,
    url: url,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.github,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    // TODO: Sostituire con URL della foto professionale reale di Gabriele Bonucci
    image: `${siteConfig.url}/developer-portrait.png`,
    sameAs: [siteConfig.github, siteConfig.linkedin],
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
      name: siteConfig.shortName,
    },
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
