/**
 * Canonical site URL: the production domain.
 * Every canonical/og:url should be built from this constant so a domain
 * change is a one-line edit.
 */
export const SITE_URL = 'https://academy.cyberswahili.co.tz';

/**
 * Build an absolute canonical URL from a pathname.
 * - Root pathname "/" returns SITE_URL (no trailing slash).
 * - Any other path returns SITE_URL + pathname.
 */
export const getCanonicalUrl = (pathname: string): string => {
  if (!pathname || pathname === '/') return SITE_URL;
  return `${SITE_URL}${pathname}`;
};
