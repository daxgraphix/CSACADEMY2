/**
 * Structured data helpers.
 *
 * Emits schema.org JSON-LD so search engines can surface pricing and FAQ
 * rich results. The payload is built as a plain object and rendered once
 * per page so it can never drift out of sync with the visible copy.
 */

export interface FaqSchemaItem {
  question: string;
  answer: string;
}

export interface OrganizationSchema {
  name: string;
  url: string;
  email: string;
  telephone: string;
  foundingDate?: string;
  alternateName?: string;
  logo?: string;
  areaServed?: string[];
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
}

export const buildFaqSchema = (items: FaqSchemaItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
});

export const buildOrganizationSchema = (org: OrganizationSchema) => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  // A stable @id lets search engines merge this entity with the identical
  // static block in index.html instead of seeing two separate organizations.
  '@id': `${org.url}/#organization`,
  name: org.name,
  url: org.url,
  email: org.email,
  telephone: org.telephone,
  ...(org.foundingDate ? { foundingDate: org.foundingDate } : {}),
  ...(org.alternateName ? { alternateName: org.alternateName } : {}),
  ...(org.logo ? { logo: org.logo } : {}),
  ...(org.areaServed?.length ? { areaServed: org.areaServed } : {}),
  ...(org.address ? { address: { '@type': 'PostalAddress', ...org.address } } : {}),
  ...(org.sameAs?.length ? { sameAs: org.sameAs } : {})
});