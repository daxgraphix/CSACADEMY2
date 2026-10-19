import { describe, expect, it } from 'vitest';
import { getCanonicalUrl, SITE_URL } from './seo';

describe('canonical URLs', () => {
  it('uses the site origin for the root path', () => expect(getCanonicalUrl('/')).toBe(SITE_URL));
  it('appends a route path', () => expect(getCanonicalUrl('/blog')).toBe(`${SITE_URL}/blog`));
});
